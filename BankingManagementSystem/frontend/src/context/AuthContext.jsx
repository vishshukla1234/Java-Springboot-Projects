import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, decodeToken, getToken, setToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())

  const claims = useMemo(() => (token ? decodeToken(token) : null), [token])

  const user = useMemo(() => {
    if (!token || !claims) return null
    const isExpired = claims.exp && Date.now() >= claims.exp * 1000
    if (isExpired) return null
    return { email: claims.sub, role: claims.role }
  }, [token, claims])

  useEffect(() => {
    if (user === null && token) {
      // token was present but invalid/expired -- clear it
      setToken(null)
      setTokenState(null)
    }
  }, [user, token])

  async function login(email, password) {
    const res = await api.login({ email, password })
    setToken(res.token)
    setTokenState(res.token)
    const decoded = decodeToken(res.token)
    return { email: decoded?.sub, role: decoded?.role }
  }

  async function register(name, email, password) {
    await api.register({ name, email, password })
  }

  function logout() {
    setToken(null)
    setTokenState(null)
  }

  const value = { user, login, register, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

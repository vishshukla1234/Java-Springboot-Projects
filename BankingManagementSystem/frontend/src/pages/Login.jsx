import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../api/client'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const registered = location.state?.registered

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { role } = await login(email, password)
      navigate(role === 'ADMIN' ? '/admin/users' : '/accounts', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-side-mark">Ledger</div>
        <p className="auth-side-quote">
          Every deposit, withdrawal, and transfer, recorded in one place &mdash; nothing hidden,
          nothing assumed.
        </p>
        <p className="auth-side-foot">Banking Management System</p>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <p className="auth-form-sub">Enter your details to reach your accounts.</p>

          {registered && (
            <div className="banner banner-success">Account created. Sign in to continue.</div>
          )}
          {error && <div className="banner banner-error">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="auth-switch">
            New here? <Link to="/register">Open an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

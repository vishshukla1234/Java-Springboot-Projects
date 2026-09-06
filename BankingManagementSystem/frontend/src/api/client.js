const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const TOKEN_KEY = 'ledger.token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(json)))
  } catch {
    return null
  }
}

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '')

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && data.message) ||
      (typeof data === 'string' && data) ||
      `Request failed (${res.status})`
    throw new ApiError(message, res.status)
  }

  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, auth: false }),

  // Users (admin only)
  getAllUsers: () => request('/users'),
  deleteUser: (id) => request(`/user/${id}`, { method: 'DELETE' }),

  // Accounts
  createAccount: (payload) => request('/accounts', { method: 'POST', body: payload }),
  getAccount: (id) => request(`/accounts/${id}`),
  getMyAccounts: () => request('/accounts/my'),
  getAllAccounts: () => request('/accounts'),

  // Transactions
  getAllTransactions: () => request('/transactions'),
  getTransactionById: (id) => request(`/transactions/${id}`),
  getTransactionsForAccount: (accountId) => request(`/transactions/account/${accountId}`),
  deposit: (payload) => request('/transactions/deposit', { method: 'POST', body: payload }),
  withdraw: (payload) => request('/transactions/withdraw', { method: 'POST', body: payload }),
  transfer: (payload) => request('/transactions/transfer', { method: 'POST', body: payload })
}

export { ApiError }

import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import { RequireAuth, RequireRole } from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerAccounts from './pages/CustomerAccounts'
import AccountDetail from './pages/AccountDetail'
import AdminUsers from './pages/AdminUsers'
import AdminAccounts from './pages/AdminAccounts'
import AdminTransactions from './pages/AdminTransactions'

function IndexRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'ADMIN' ? '/admin/users' : '/accounts'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/accounts" element={<CustomerAccounts />} />
        <Route path="/accounts/:id" element={<AccountDetail />} />

        <Route
          path="/admin/users"
          element={
            <RequireRole role="ADMIN">
              <AdminUsers />
            </RequireRole>
          }
        />
        <Route
          path="/admin/accounts"
          element={
            <RequireRole role="ADMIN">
              <AdminAccounts />
            </RequireRole>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <RequireRole role="ADMIN">
              <AdminTransactions />
            </RequireRole>
          }
        />
      </Route>

      <Route path="/" element={<IndexRedirect />} />
      <Route path="*" element={<IndexRedirect />} />
    </Routes>
  )
}

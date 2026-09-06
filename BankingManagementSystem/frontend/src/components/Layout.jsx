import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const customerLinks = [{ to: '/accounts', label: 'Accounts' }]

const adminLinks = [
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/accounts', label: 'Accounts' },
  { to: '/admin/transactions', label: 'Transactions' }
]

export default function Layout() {
  const { user, logout } = useAuth()
  const links = user?.role === 'ADMIN' ? adminLinks : customerLinks

  return (
    <div className="shell">
      <aside className="rail">
        <div>
          <div className="rail-mark">Ledger</div>
          <div className="rail-mark-sub">Banking, kept in order</div>
        </div>
        <nav className="rail-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `rail-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="rail-footer">
          <div className="rail-user">
            {user?.email}
            <div className="rail-user-role">{user?.role}</div>
          </div>
          <button className="btn btn-ghost btn-block" onClick={logout} style={{ borderColor: 'rgba(241,243,238,0.3)', color: '#f1f3ee' }}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

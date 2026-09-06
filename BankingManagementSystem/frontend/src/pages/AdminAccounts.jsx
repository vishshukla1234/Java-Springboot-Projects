import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Money from '../components/Money'
import Badge from '../components/Badge'

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getAllAccounts()
      .then(setAccounts)
      .catch(() => setError('Could not load accounts.'))
  }, [])

  const total = accounts?.reduce((sum, a) => sum + a.balance, 0) ?? 0

  return (
    <div>
      <div className="page-head">
        <h1>Accounts</h1>
        <p>Every account open at the bank, across all customers.</p>
      </div>

      {accounts && accounts.length > 0 && (
        <div className="stat-row">
          <div className="stat">
            <div className="stat-label">Total on deposit</div>
            <div className="stat-value">
              <Money amount={total} />
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">Open accounts</div>
            <div className="stat-value">{accounts.length}</div>
          </div>
        </div>
      )}

      <div className="panel">
        <div className="panel-head">
          <h2>All accounts</h2>
        </div>
        <div className="panel-body">
          {error && <div className="empty-state">{error}</div>}
          {!error && accounts === null && <div className="empty-state">Loading accounts…</div>}
          {!error && accounts && accounts.length === 0 && <div className="empty-state">No accounts yet.</div>}
          {!error &&
            accounts &&
            accounts.map((account) => (
              <Link key={account.id} to={`/accounts/${account.id}`} className="ledger-row">
                <div className="ledger-main">
                  <span className="ledger-title">
                    {account.userName} &middot; {account.accountType === 'SAVINGS' ? 'Savings' : 'Current'}
                  </span>
                  <span className="ledger-sub account-number">
                    #{account.accountNumber} &middot; <Badge>{account.status}</Badge>
                  </span>
                </div>
                <span className="ledger-amount">
                  <Money amount={account.balance} />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

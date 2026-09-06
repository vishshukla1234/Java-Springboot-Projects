import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Money from '../components/Money'
import Badge from '../components/Badge'
import { NewAccountModal } from '../components/ActionModals'

export default function CustomerAccounts() {
  const [accounts, setAccounts] = useState(null)
  const [error, setError] = useState('')
  const [showNewAccount, setShowNewAccount] = useState(false)

  async function load() {
    setError('')
    try {
      const data = await api.getMyAccounts()
      setAccounts(data)
    } catch (err) {
      setError('Could not load your accounts.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const total = accounts?.reduce((sum, a) => sum + a.balance, 0) ?? 0

  return (
    <div>
      <div className="page-head">
        <h1>Your accounts</h1>
        <p>Balances update the moment a deposit, withdrawal, or transfer clears.</p>
      </div>

      {accounts && accounts.length > 0 && (
        <div className="stat-row">
          <div className="stat">
            <div className="stat-label">Total across accounts</div>
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
          <h2>Accounts</h2>
          <button className="btn btn-brass" onClick={() => setShowNewAccount(true)}>
            Open account
          </button>
        </div>
        <div className="panel-body">
          {error && (
            <div className="empty-state">{error}</div>
          )}
          {!error && accounts === null && <div className="empty-state">Loading your accounts…</div>}
          {!error && accounts && accounts.length === 0 && (
            <div className="empty-state">
              You don&rsquo;t have any accounts yet. Open one to start banking.
            </div>
          )}
          {!error &&
            accounts &&
            accounts.map((account) => (
              <Link key={account.id} to={`/accounts/${account.id}`} className="ledger-row">
                <div className="ledger-main">
                  <span className="ledger-title">
                    {account.accountType === 'SAVINGS' ? 'Savings account' : 'Current account'}
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

      {showNewAccount && (
        <NewAccountModal
          onClose={() => setShowNewAccount(false)}
          onCreated={() => {
            setShowNewAccount(false)
            load()
          }}
        />
      )}
    </div>
  )
}

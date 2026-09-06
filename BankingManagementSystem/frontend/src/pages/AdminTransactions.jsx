import { useEffect, useState } from 'react'
import { api } from '../api/client'
import Money from '../components/Money'
import Badge from '../components/Badge'

const TYPE_LABEL = {
  DEPOSIT: 'Deposit',
  WITHDRAWAL: 'Withdrawal',
  TRANSFER: 'Transfer'
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState('')
  const [filterId, setFilterId] = useState('')

  function load(accountId) {
    setError('')
    setTransactions(null)
    const request = accountId ? api.getTransactionsForAccount(accountId) : api.getAllTransactions()
    request
      .then((data) => setTransactions(data.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
      .catch(() => setError('Could not load transactions.'))
  }

  useEffect(() => {
    load()
  }, [])

  function handleFilterSubmit(e) {
    e.preventDefault()
    load(filterId ? Number(filterId) : undefined)
  }

  return (
    <div>
      <div className="page-head">
        <h1>Transactions</h1>
        <p>Every deposit, withdrawal, and transfer processed by the bank.</p>
      </div>

      <form onSubmit={handleFilterSubmit} style={{ display: 'flex', gap: 10, marginBottom: 20, maxWidth: 360 }}>
        <input
          type="number"
          placeholder="Filter by account ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          style={{
            flex: 1,
            padding: '0.65em 0.8em',
            border: '1px solid var(--line)',
            borderRadius: 3,
            background: 'var(--paper-raised)'
          }}
        />
        <button type="submit" className="btn btn-ghost">
          Filter
        </button>
        {filterId && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setFilterId('')
              load()
            }}
          >
            Clear
          </button>
        )}
      </form>

      <div className="panel">
        <div className="panel-head">
          <h2>{filterId ? `Account #${filterId}` : 'All transactions'}</h2>
          {transactions && <span className="ledger-sub">{transactions.length} total</span>}
        </div>
        <div className="panel-body">
          {error && <div className="empty-state">{error}</div>}
          {!error && transactions === null && <div className="empty-state">Loading transactions…</div>}
          {!error && transactions && transactions.length === 0 && (
            <div className="empty-state">No transactions found.</div>
          )}
          {!error &&
            transactions &&
            transactions.map((tx) => (
              <div key={tx.id} className="ledger-row">
                <div className="ledger-main">
                  <span className="ledger-title">
                    {TYPE_LABEL[tx.type]} &middot; account #{tx.accountId}
                    {tx.relatedAccountId ? ` → #${tx.relatedAccountId}` : ''}
                  </span>
                  <span className="ledger-sub">
                    {new Date(tx.timestamp).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}{' '}
                    &middot; <Badge>{tx.status}</Badge>
                  </span>
                </div>
                <Money amount={tx.amount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

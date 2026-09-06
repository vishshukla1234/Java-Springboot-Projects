import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import Money from '../components/Money'
import Badge from '../components/Badge'
import { DepositModal, WithdrawModal, TransferModal } from '../components/ActionModals'

const TYPE_LABEL = {
  DEPOSIT: 'Deposit',
  WITHDRAWAL: 'Withdrawal',
  TRANSFER: 'Transfer'
}

function signedAmount(tx) {
  if (tx.status === 'FAILED') return 0
  if (tx.type === 'DEPOSIT') return tx.amount
  return -tx.amount
}

export default function AccountDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState('')
  const [activeModal, setActiveModal] = useState(null)

  async function load() {
    setError('')
    try {
      const [accountData, txData] = await Promise.all([
        api.getAccount(id),
        api.getTransactionsForAccount(id)
      ])
      setAccount(accountData)
      setTransactions(txData.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
    } catch (err) {
      setError(err.status === 403 || err.status === 404 ? err.message : 'Could not load this account.')
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function closeModalAndReload() {
    setActiveModal(null)
    load()
  }

  if (error) {
    return (
      <div>
        <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
          &larr; Back
        </button>
        <div className="panel">
          <div className="empty-state">{error}</div>
        </div>
      </div>
    )
  }

  if (!account) {
    return <div className="loading-text">Loading account…</div>
  }

  return (
    <div>
      <Link to="/accounts" className="link-brass" style={{ display: 'inline-block', marginBottom: 20, fontSize: 13.5 }}>
        &larr; All accounts
      </Link>

      <div className="page-head">
        <h1>
          {account.accountType === 'SAVINGS' ? 'Savings account' : 'Current account'}{' '}
          <span className="account-number" style={{ fontSize: 16, color: 'var(--muted)' }}>
            #{account.accountNumber}
          </span>
        </h1>
        <p>
          Owned by {account.userName} &middot; opened{' '}
          {new Date(account.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-label">Current balance</div>
          <div className="stat-value">
            <Money amount={account.balance} />
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Status</div>
          <div className="stat-value" style={{ fontSize: 16, fontFamily: 'var(--font-body)' }}>
            <Badge>{account.status}</Badge>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <button className="btn btn-primary" onClick={() => setActiveModal('deposit')}>
          Deposit
        </button>
        <button className="btn btn-ghost" onClick={() => setActiveModal('withdraw')}>
          Withdraw
        </button>
        <button className="btn btn-ghost" onClick={() => setActiveModal('transfer')}>
          Transfer
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Transaction history</h2>
        </div>
        <div className="panel-body">
          {transactions === null && <div className="empty-state">Loading transactions…</div>}
          {transactions && transactions.length === 0 && (
            <div className="empty-state">No transactions on this account yet.</div>
          )}
          {transactions &&
            transactions.map((tx) => (
              <div key={tx.id} className="ledger-row">
                <div className="ledger-main">
                  <span className="ledger-title">
                    {TYPE_LABEL[tx.type]}
                    {tx.type === 'TRANSFER' && tx.relatedAccountId ? ` to account #${tx.relatedAccountId}` : ''}
                  </span>
                  <span className="ledger-sub">
                    {new Date(tx.timestamp).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}{' '}
                    &middot; <Badge>{tx.status}</Badge>
                  </span>
                </div>
                <Money amount={signedAmount(tx) || tx.amount} signed={tx.status !== 'FAILED'} />
              </div>
            ))}
        </div>
      </div>

      {activeModal === 'deposit' && (
        <DepositModal accountId={account.id} onClose={() => setActiveModal(null)} onDone={closeModalAndReload} />
      )}
      {activeModal === 'withdraw' && (
        <WithdrawModal accountId={account.id} onClose={() => setActiveModal(null)} onDone={closeModalAndReload} />
      )}
      {activeModal === 'transfer' && (
        <TransferModal accountId={account.id} onClose={() => setActiveModal(null)} onDone={closeModalAndReload} />
      )}
    </div>
  )
}

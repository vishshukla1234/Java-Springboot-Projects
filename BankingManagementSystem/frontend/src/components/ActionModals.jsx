import { useState } from 'react'
import Modal from './Modal'
import { api, ApiError } from '../api/client'

function useSubmit(action, onDone) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(payload) {
    setError('')
    setLoading(true)
    try {
      const result = await action(payload)
      onDone(result)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return { submit, error, loading }
}

export function NewAccountModal({ onClose, onCreated }) {
  const [accountType, setAccountType] = useState('SAVINGS')
  const { submit, error, loading } = useSubmit(api.createAccount, (account) => onCreated(account))

  return (
    <Modal title="Open a new account" subtitle="Choose the type of account you'd like to open." onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit({ accountType })
        }}
      >
        {error && <div className="banner banner-error">{error}</div>}
        <div className="field">
          <label htmlFor="accountType">Account type</label>
          <select id="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-brass" disabled={loading}>
            {loading ? 'Opening…' : 'Open account'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export function DepositModal({ accountId, onClose, onDone }) {
  const [amount, setAmount] = useState('')
  const { submit, error, loading } = useSubmit(api.deposit, onDone)

  return (
    <Modal title="Deposit funds" subtitle={`Into account ending in ${String(accountId)}`} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit({ accountId, amount: Number(amount) })
        }}
      >
        {error && <div className="banner banner-error">{error}</div>}
        <div className="field">
          <label htmlFor="depositAmount">Amount</label>
          <input
            id="depositAmount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-brass" disabled={loading}>
            {loading ? 'Depositing…' : 'Deposit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export function WithdrawModal({ accountId, onClose, onDone }) {
  const [amount, setAmount] = useState('')
  const { submit, error, loading } = useSubmit(api.withdraw, onDone)

  return (
    <Modal title="Withdraw funds" subtitle={`From account ending in ${String(accountId)}`} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit({ accountId, amount: Number(amount) })
        }}
      >
        {error && <div className="banner banner-error">{error}</div>}
        <div className="field">
          <label htmlFor="withdrawAmount">Amount</label>
          <input
            id="withdrawAmount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-brass" disabled={loading}>
            {loading ? 'Withdrawing…' : 'Withdraw'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export function TransferModal({ accountId, onClose, onDone }) {
  const [receiverAccountId, setReceiverAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const { submit, error, loading } = useSubmit(api.transfer, onDone)

  return (
    <Modal title="Transfer funds" subtitle={`From account ending in ${String(accountId)}`} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit({
            senderAccountId: accountId,
            receiverAccountId: Number(receiverAccountId),
            amount: Number(amount)
          })
        }}
      >
        {error && <div className="banner banner-error">{error}</div>}
        <div className="field">
          <label htmlFor="receiverId">Recipient account ID</label>
          <input
            id="receiverId"
            type="number"
            min="1"
            step="1"
            value={receiverAccountId}
            onChange={(e) => setReceiverAccountId(e.target.value)}
            required
            autoFocus
          />
          <span className="field-hint">The internal account ID, not the account number.</span>
        </div>
        <div className="field">
          <label htmlFor="transferAmount">Amount</label>
          <input
            id="transferAmount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-brass" disabled={loading}>
            {loading ? 'Transferring…' : 'Transfer'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

import { useEffect, useState } from 'react'
import { api, ApiError } from '../api/client'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import { useAuth } from '../context/AuthContext'

export default function AdminUsers() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  async function load() {
    setError('')
    try {
      setUsers(await api.getAllUsers())
    } catch (err) {
      setError('Could not load users.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function confirmDelete() {
    setDeleteError('')
    setDeleting(true)
    try {
      await api.deleteUser(pendingDelete.id)
      setPendingDelete(null)
      load()
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'Could not delete this user.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="page-head">
        <h1>Users</h1>
        <p>Everyone registered with the bank, customers and administrators alike.</p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>All users</h2>
          {users && <span className="ledger-sub">{users.length} total</span>}
        </div>
        <div className="panel-body">
          {error && <div className="empty-state">{error}</div>}
          {!error && users === null && <div className="empty-state">Loading users…</div>}
          {!error && users && users.length === 0 && <div className="empty-state">No users found.</div>}
          {!error &&
            users &&
            users.map((u) => (
              <div key={u.id} className="ledger-row">
                <div className="ledger-main">
                  <span className="ledger-title">{u.name}</span>
                  <span className="ledger-sub">
                    {u.email} &middot; <Badge>{u.role}</Badge>
                  </span>
                </div>
                <button
                  className="btn btn-danger"
                  disabled={u.email === currentUser?.email}
                  title={u.email === currentUser?.email ? "You can't remove your own account" : undefined}
                  onClick={() => setPendingDelete(u)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>

      {pendingDelete && (
        <Modal
          title="Remove this user?"
          subtitle={`${pendingDelete.name} (${pendingDelete.email}) will lose access immediately. This can't be undone.`}
          onClose={() => setPendingDelete(null)}
        >
          {deleteError && <div className="banner banner-error">{deleteError}</div>}
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Removing…' : 'Remove user'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

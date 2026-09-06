const STATUS_MAP = {
  SUCCESS: 'badge-success',
  FAILED: 'badge-danger',
  PENDING: 'badge-neutral',
  ACTIVE: 'badge-success'
}

export default function Badge({ children }) {
  const cls = STATUS_MAP[children] || 'badge-neutral'
  return <span className={`badge ${cls}`}>{children}</span>
}

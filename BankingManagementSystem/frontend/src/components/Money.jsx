const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export function formatMoney(amount) {
  return formatter.format(amount ?? 0)
}

export default function Money({ amount, signed = false, className = '' }) {
  const isNegative = signed && amount < 0
  const isPositive = signed && amount > 0
  const cls = [
    'mono',
    className,
    isPositive ? 'amount-positive' : '',
    isNegative ? 'amount-negative' : ''
  ]
    .filter(Boolean)
    .join(' ')

  const display = signed && amount > 0 ? `+${formatMoney(amount)}` : formatMoney(amount)

  return <span className={cls}>{display}</span>
}

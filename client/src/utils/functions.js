export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const costPerUse = (price, uses) => (price / uses).toFixed(2)

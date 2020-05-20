const isEmpty = (obj: any) => {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  for (let key in obj) if (obj.hasOwnProperty(key)) return false

  return true
}

export default isEmpty

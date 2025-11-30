export const TrimObject = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {}

  for (const key in obj) {
    const val = obj[key]

    if (typeof val === 'string') {
      newObj[key] = val.trim()
    } else {
      newObj[key] = val
    }
  }

  return newObj
}

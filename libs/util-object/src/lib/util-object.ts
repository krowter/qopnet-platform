// function to pick keys from an object

export const pickKeys = <T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  keys: U[]
): Pick<T, U> => {
  return keys.reduce((result, key) => {
    result[key] = obj[key]

    return result
  }, {} as T)
}

export const safePromise = async <T>(promise: Promise<T>) => {
  try {
    return await promise
  } catch {
    return null
  }
}

import get from 'axios'

export function isDevMode() {
  return process.env.NODE_ENV === 'development'
}

export const hasWindow = typeof window !== 'undefined'
export const isBrowser = typeof GLOBAL === 'undefined'

export async function fetch(url) {
  const { data } = await get(url)
  return data
}

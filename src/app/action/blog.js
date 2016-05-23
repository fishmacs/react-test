import { fetch } from 'app/utils'

export const API_FETCH_ARTICLES = 'api/fetch_articles'

export function apiFetch() {
  return {
    type: API_FETCH_ARTICLES,
    payload: {
      promise: fetch('/api/articles')
    },
  }
}

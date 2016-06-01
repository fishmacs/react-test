import axios from 'axios'

import {fetch, del} from 'app/utils'

export const API_FETCH_USERLIST = 'api/fetch_userlist'
export const API_DELETE_USER = 'api/delete_user'
export const API_FETCH_USERPROFILE = 'api/fetch_userprofile'
export const API_FETCH_WIDGETLIST = 'api/fetch_widgetlist'
export const API_DELETE_WIDGET = 'api/delete_widget'

export const LOAD_SEARCH_LAYOUT = 'load_search_layout'

function makeAction(type, promise, opt={}) {
  return {
    type,
    payload: {data: opt, promise}
  }
}

export function fetchUserList(query='') {
  const q = query ? '?q=' + query : ''
  return makeAction(API_FETCH_USERLIST, fetch('/api/user' + q))
}

export function deleteUser(userId) {
  return makeAction(
    API_DELETE_USER,
    del('/api/user/' + userId),
    {id: userId}
  )
}

async function fetchProfile(userId) {
  const response = await fetch('/api/user/' + userId)
  const user = response.data
  let profile = {
    name: user.name,
    twitter: user.twitter,
    worksOn: user.worksOn
  }
  const results = await Promise.all([
    axios.get(`https://api.github.com/users/${user.github}`),
    axios.get(`https://api.github.com/users/${user.github}/repos`)
  ])
  const githubProfile = results[0].data
  const githubRepo = results[1].data

  profile.imageUrl = githubProfile.avatar_url
  profile.repos = githubRepo

  return {result: 'ok', data: profile}
}

export function getUserProfile(userId) {
  return makeAction(API_FETCH_USERPROFILE, fetchProfile(userId))
}

export function fetchWidgetList(query='') {
  const q = query ? '?q=' + query : ''
  return makeAction(API_FETCH_WIDGETLIST, fetch('/api/widget' + q))
}

export function deleteWidget(widgetId) {
  return makeAction(
    API_DELETE_WIDGET,
    del('/api/widget/' + widgetId),
    {id: widgetId}
  )
}

export function loadSearchLayout(searchType, title) {
  return {
    type: LOAD_SEARCH_LAYOUT,
    searchType,
    title
  }
}

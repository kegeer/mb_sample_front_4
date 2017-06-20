import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/api/v1/agencies',
    method: 'get',
    params: query
  })
}

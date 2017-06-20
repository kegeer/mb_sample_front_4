import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/client_table/list',
    method: 'get',
    params: query
  })
}

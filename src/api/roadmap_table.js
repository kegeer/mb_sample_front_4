import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/roadmap_table/list',
    method: 'get',
    params: query
  })
}

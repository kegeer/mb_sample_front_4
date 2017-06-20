import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/problem_table/list',
    method: 'get',
    params: query
  })
}

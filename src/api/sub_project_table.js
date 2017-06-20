import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/sub_project_table/list',
    method: 'get',
    params: query
  })
}

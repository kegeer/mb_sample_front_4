import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/contracts',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/contracts',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/contracts/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/contracts/${id}`,
    method: 'delete'
  })
}

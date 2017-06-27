import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/roles',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/roles/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

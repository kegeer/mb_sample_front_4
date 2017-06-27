import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/users',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/users/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function fetchUserRoles (id) {
  return fetch({
    url: `/users/${id}/roles`,
    method: 'get'
  })
}

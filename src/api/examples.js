import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/examples',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/examples',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/examples/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/examples/${id}`,
    method: 'delete'
  })
}

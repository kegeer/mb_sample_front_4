import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/sequence_sizes',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/sequence_sizes',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/sequence_sizes/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/sequence_sizes/${id}`,
    method: 'delete'
  })
}

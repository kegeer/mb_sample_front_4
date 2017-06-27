import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/sequence_types',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/sequence_types',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/sequence_types/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/sequence_types/${id}`,
    method: 'delete'
  })
}

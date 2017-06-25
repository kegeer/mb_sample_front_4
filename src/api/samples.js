import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/samples',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/samples',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/samples/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/samples/${id}`,
    method: 'delete'
  })
}

export function fetchSampleResults (id) {
  return fetch({
    url: `/samples/${id}/results`,
    method: 'get'
  })
}

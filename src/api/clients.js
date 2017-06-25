import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/clients',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/clients',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/clients/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/clients/${id}`,
    method: 'delete'
  })
}

export function fetchBatchSamples (id) {
  return fetch({
    url: `/clients/${id}/samples`,
    method: 'get'
  })
}

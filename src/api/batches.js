import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/batches',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/batches',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/batches/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/batches/${id}`,
    method: 'delete'
  })
}

export function fetchBatchSamples (id) {
  return fetch({
    url: `/batches/${id}/samples`,
    method: 'get'
  })
}

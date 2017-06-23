import fetch from '@/utils/fetch'

export function fetchList (query = undefined) {
  return fetch({
    url: '/agencies',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/agencies',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/agencies/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/agencies/${id}`,
    method: 'delete'
  })
}

export function fetchAgencyBatches (id) {
  return fetch({
    url: `/agencies/${id}/batches`,
    method: 'get'
  })
}

import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/contacts',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/contacts',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/contacts/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/contacts/${id}`,
    method: 'delete'
  })
}

export function fetchAgencyContacts (id) {
  return fetch({
    url: `/agencies/${id}/contacts`,
    method: 'get'
  })
}

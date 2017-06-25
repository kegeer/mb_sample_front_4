import fetch from '@/utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/projects',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return fetch({
    url: '/projects',
    method: 'post',
    data: data
  })
}

export function updateItem (id, data) {
  return fetch({
    url: `/projects/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItem (id) {
  return fetch({
    url: `/projects/${id}`,
    method: 'delete'
  })
}

export function fetchProjectSubprojects (id) {
  return fetch({
    url: `/projects/${id}/subprojects`,
    method: 'get'
  })
}

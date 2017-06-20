import fetch from '@/utils/fetch'

export function getList () {
  return fetch({
    url: '/sample/list',
    method: 'get'
  })
}

export function getSample () {
  return fetch({
    url: '/sample/detail',
    method: 'get'
  })
}

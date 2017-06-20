import Mock from 'mockjs'
import { param2Obj } from '@/utils'
const List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    batch_id: '@integer(1, 100)',
    client_id: '@integer(1, 100)',
    project_id: '@integer(1, 100)',
    pmid: '@integer(1000, 3000)',
    ori_num: '@integer(5000, 6000)',
    'type|1': '@integer(1, 3)',
    status: '@integer(1, 3)',
    sequence_method: '@integer(1, 3)',
    primer: '@integer(1, 100)',
    sequencer: '@integer(1, 2)',
    library: '@integer(1, 5)'
  }))
}

export default {
  getList: config => {
    const {
      pmid,
      type,
      status,
      sequenceMethod,
      sort,
      page,
      limit
    } = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (type && item.type !== type) return false
      if (status && item.status !== +status) return false
      if (sequenceMethod && item.sequence_method !== +sequenceMethod) return false
      if (pmid && item.pmid.toString().indexOf(pmid.toString()) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}

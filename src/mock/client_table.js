import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@id',
        name: '@cname',
        'gender|1': '@integer(1,3)',
        age: '@integer(18, 50)',
        height: '@float(150, 200, 1, 2)',
        weight: '@float(40, 100, 1, 2)',
        extra: '@title(3, 5)',
        samples: '@url()'
    }))
}

export default {
    getList: (config) => {
        const {
            name,
            page,
            limit,
            sort
        } = param2Obj(config.url)

        let mapList = List.filter(item => {
            if (name && item.name.indexOf(name) < 0) return false
            return true
        })

        if (sort === '-id') {
            mapList = mapList.reverse()
        }

        const pageList = mapList.filter((item, index) => index < limit * page && index > limit * (page - 1))

        return {
            total: mapList.length,
            items: pageList
        }
    }
}

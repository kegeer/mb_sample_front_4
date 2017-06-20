import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@id',
        name: '@city'
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

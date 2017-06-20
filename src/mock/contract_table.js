import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@id',
        name: '@city',
        sign_date: +Mock.Random.date('T'),
        start_date: +Mock.Random.date('T'),
        end_date: +Mock.Random.date('T'),
        area: '@city',
        'agency_id|1': '@integer(1, 20)',
        'contact_id|1': '@integer(1, 20)',
        // 以下都是提供选择框供用户选择
        'product_type|1': '@integer(1, 5)',
        'sequence_area|1': '@integer(1, 5)',
        'sequence_type|1': '@integer(1, 5)',
        'sequence_data|1': '@integer(1, 5)'
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

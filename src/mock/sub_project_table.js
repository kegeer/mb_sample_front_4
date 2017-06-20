import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@id',
        name: '@city',
        'project_id|1': '@integer(1,100)',
        // TODO 确定想类型是生产还是研发
        type: '@integer(1, 2)',
        'status|1': '@integer(1,3)',
        'level|1': '@integer(1,3)',
        'privilege|1': '@integer(1,3)',
        description: '@csentence(1,3)',
        r_purpose: '@csentence(1, 3)',
        r_manager: '@cname',
        r_members: '@url()',
        r_start_date: +Mock.Random.date('T'),
        r_end_date: +Mock.Random.date('T'),
        'p_manager|1': '@integer(1,3)',
        'info_manager|1': '@integer(1,3)',
        manage: '@csentence(1,3)',
        problems: '@csentence(1,3)',
        //  TODO 样品信息都可以通过表与表之间的关联获取到,这样的话在model层进行获取就行了
        'total_samples|1': '@integer(100, 300)',
        sample_source: '@city()',
        'samples_type|1': '@integer(1, 5)',
        sample_code: '@id',
        'completed_samples|1': '@integer(100, 300)',
        'in_progress_sample|1': '@integer(100, 300)'
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

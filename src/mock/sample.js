import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@id',
        title: '@ctitle(10, 20)',
        created_time: '@datetime'
    }))
}

export default {
    getList: () => List,
    getSample: () => ({
        id: 12,
        title: { key: 'link' },
        created_time: new Date()
    })
}
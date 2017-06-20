import Mock from 'mockjs'
import loginAPI from './login'
import sampleAPI from './sample'
import articleTableAPI from './article_table'
import sampleTableApi from './sample_table'
import agencyTableApi from './agency_table'
import batchTableApi from './batch_table'
import clientTableApi from './client_table'
import projectTableApi from './project_table'
import sub_projectTableApi from './sub_project_table'
import problemTableApi from './problem_table'
import roadmapTableApi from './roadmap_table'
import contractTableApi from './contract_table'

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// 样品接口
Mock.mock(/\/sample\/list/, 'get', sampleAPI.getList)
Mock.mock(/\/sample\/detail/, 'get', sampleAPI.getSample)

// table example
Mock.mock(/\/article_table\/list/, 'get', articleTableAPI.getList)
Mock.mock(/\/article_table\/p/, 'get', articleTableAPI.getPv)

// sample table list
Mock.mock(/\/sample_table\/list/, 'get', sampleTableApi.getList)

// agency table list
Mock.mock(/\/agency_table\/list/, 'get', agencyTableApi.getList)
Mock.mock(/\/batch_table\/list/, 'get', batchTableApi.getList)
Mock.mock(/\/client_table\/list/, 'get', clientTableApi.getList)

// 项目相关
Mock.mock(/\/project_table\/list/, 'get', projectTableApi.getList)
Mock.mock(/\/sub_project_table\/list/, 'get', sub_projectTableApi.getList)
Mock.mock(/\/problem__table\/list/, 'get', problemTableApi.getList)
Mock.mock(/\/roadmap_table\/list/, 'get', roadmapTableApi.getList)
Mock.mock(/\/contract_table\/list/, 'get', contractTableApi.getList)

export default Mock

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../views/layout/Layout'
// 用户登录界面
import Login from '../views/login'
const AuthRedirect = r => require([], () => r(require('../views/login/authredirect')), 'login')

// 错误页面
const Err404 = r => require([], () => r(require('../views/error/404')), 'error')
const Err401 = r => require([], () => r(require('../views/error/401')), 'error')

// 管理界面
const Dashboard = r => require.ensure([], () => r(require('../views/dashboardctl/Dashboard')), 'dashboardctl')

// 样品管理
const Sample = r => require.ensure([], () => r(require('../views/samplectl/Sample')), 'samplectl')
const Batch = r => require.ensure([], () => r(require('../views/samplectl/Batch')), 'samplectl')
const Agency = r => require.ensure([], () => r(require('../views/samplectl/Agency')), 'samplectl')
const Client = r => require.ensure([], () => r(require('../views/samplectl/Client')), 'samplectl')

// 项目管理
const Project = r => require.ensure([], () => r(require('../views/projectctl/Project')), 'projectctl')
const Contract = r => require.ensure([], () => r(require('../views/projectctl/Contract')), 'projectctl')

// 实验管理
const Experiment = r => require.ensure([], () => r(require('../views/expctl/Experiment')), 'expctl')
const ExperimentData = r => require.ensure([], () => r(require('../views/expctl/ExperimentData')), 'expctl')

// 数据分析
const Job = r => require.ensure([], () => r(require('../views/datactl/Job')), 'datactl')
const Manage = r => require.ensure([], () => r(require('../views/datactl/Manage')), 'datactl')

// 報告管理
const Info = r => require.ensure([], () => r(require('../views/reportctl/Info')), 'reportctl')
const Template = r => require.ensure([], () => r(require('../views/reportctl/Template')), 'reportctl')
const Designer = r => require.ensure([], () => r(require('../views/reportctl/Designer')), 'reportctl')
const Report = r => require.ensure([], () => r(require('../views/reportctl/Report')), 'reportctl')

export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/authRedirect',
    component: AuthRedirect,
    hidden: true
  },
  {
    path: '/404',
    component: Err404,
    hidden: true
  },
  {
    path: '/401',
    component: Err401,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      }
    ]
  }
]

export default new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/samplectl',
    component: Layout,
    redirect: '/samplectl/samples',
    name: '样品管理',
    icon: 'barcode',
    children: [
      // 关于合作方所有的操作均在单页面完成
      {
        path: 'agencies',
        component: Agency,
        name: '合作方'
      },
      // 关于批次方所有的操作均在单页面完成
      {
        path: 'batches',
        component: Batch,
        name: '到样批次'
      },
      // 看情况增加对样品管理的页面数量
      {
        path: 'samples',
        component: Sample,
        name: '样品库'
      },
      // 关于批次方所有的操作均在单页面完成
      {
        path: 'clients',
        component: Client,
        name: '客户'
      }
    ]
  },
  {
    path: '/projectctl',
    component: Layout,
    redirect: '/projectctl/projects',
    name: '项目管理',
    icon: 'folder',
    children: [
      {
        path: 'projects',
        component: Project,
        name: '项目库'
      },
      {
        path: 'contracts',
        component: Contract,
        name: '项目合同'
      }
    ]
  },
  {
    path: '/expctl',
    component: Layout,
    redirect: '/expctl/experiments',
    name: '实验管理',
    icon: 'braille',
    children: [
      {
        path: 'experiments',
        component: Experiment,
        name: '实验队列'
      },
      // 数据录入需要思考,采取什么样的形式进行录入
      // 管理员可以动态的修改需要录入数据的格式
      {
        path: 'data',
        component: ExperimentData,
        name: '数据录入'
      }
    ]
  },
  {
    path: '/datactl',
    component: Layout,
    redirect: '/datactl/manage',
    name: '数据分析',
    icon: 'bar-chart',
    children: [
      {
        path: 'jobs',
        component: Job,
        name: '任务调度'
      },
      {
        path: 'manage',
        component: Manage,
        name: '数据整理'
      }
    ]
  },
  {
    path: '/reportctl',
    component: Layout,
    redirect: '/reportctl/reports',
    name: '报告管理',
    icon: 'file',
    children: [
      {
        path: 'infos',
        component: Info,
        name: '数据指标'
      },
      {
        path: 'templates',
        component: Template,
        name: '报告模板'
      },
      {
        path: 'designer',
        component: Designer,
        name: '模板设计'
      },
      {
        path: 'reports',
        component: Report,
        name: '报告生成'
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

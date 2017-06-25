import { fetchList as fetchAgenciesList } from '@/api/agencies'
import { fetchList as fetchContactsList } from '@/api/contacts'
import { fetchList as fetchProjectsList } from '@/api/projects'
import { fetchList as fetchRoadmapsList } from '@/api/roadmaps'
import { fetchList as fetchPositionsList } from '@/api/positions'
import { fetchList as fetchBatchesList } from '@/api/batches'
import { fetchList as fetchClientsList } from '@/api/clients'

const resources = {
  state: {
    agenciesList: [],
    contactsList: [],
    projectsList: [],
    roadmapsList: [],
    positionsList: [],
    batchesList: [],
    clientsList: []
  },
  mutations: {
    SET_AGENCIES (state, data) {
      state.agenciesList = data
    },
    SET_CONTACTS (state, data) {
      state.contactsList = data
    },
    SET_PROJECTS (state, data) {
      state.projectsList = data
    },
    SET_ROADMAPS (state, data) {
      state.roadmapsList = data
    },
    SET_POSITIONS (state, data) {
      state.positionsList = data
    },
    SET_BATCHE (state, data) {
      state.batchesList = data
    },
    SET_CLIENTS (state, data) {
      state.clientsList = data
    }
  },
  actions: {
    getAgenciesList ({ commit }) {
      // return new Promise((resolve, reject) => {
      //   fetchAgenciesList().then(res => {
      //     const data = res.data.data
      //     commit('SET_AGENCIES', data)
      //     resolve(res)
      //   }).catch(err => {
      //     reject(err)
      //   })
      // })
      fetchAgenciesList().then(res => {
        const data = res.data.data
        commit('SET_AGENCIES', data)
      })
    },
    getContactsList ({ commit }) {
      fetchContactsList().then(res => {
        const data = res.data.data
        commit('SET_CONTACTS', data)
      })
    },
    getProjectsList ({ commit }) {
      fetchProjectsList().then(res => {
        const data = res.data.data
        commit('SET_PROJECTS', data)
      })
    },
    getRoadmapsList ({ commit }) {
      fetchRoadmapsList().then(res => {
        const data = res.data.data
        commit('SET_ROADMAPS', data)
      })
    },
    getPositionsList ({ commit }) {
      fetchPositionsList().then(res => {
        const data = res.data.data
        commit('SET_POSITIONS', data)
      })
    },
    getBatchesList ({ commit }) {
      fetchBatchesList().then(res => {
        const data = res.data.data
        commit('SET_BATCHES', data)
      })
    },
    getClientsList ({ commit }) {
      fetchClientsList().then(res => {
        const data = res.data.data
        commit('SET_CLIENTS', data)
      })
    }
  }
}

export default resources

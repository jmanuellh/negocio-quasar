import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
  baseURL: process.env.BASE_URL || 'https://192.168.50.3:5002/api' || 'https://localhost:5001/api'
})

// const api = axios.create({
//   baseURL: process.env.BASE_URL || 'https://192.168.50.3:5002/api' || 'https://localhost:5001/api'
// })
// Vue.prototype.$api = api

// export { axios, api }

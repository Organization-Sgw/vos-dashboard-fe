import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://103.166.30.38:4002/v1',
})

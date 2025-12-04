import axios from 'axios'
export const axiosInstance = axios.create({
  //baseURL: 'http://localhost:4002/v1',
  //baseURL: 'http://103.166.30.38:4002/v1',
  baseURL: 'https://api-vos.redision.com/v1',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' && error.config.responseType === 'blob') {
      return error.response?.data?.text().then((text: string) => {
        console.error('Blob error:', text)
        throw new Error(text || 'Network error during file download')
      })
    }
    return Promise.reject(error)
  }
)

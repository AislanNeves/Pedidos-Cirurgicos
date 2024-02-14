import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:3443'

const api = axios.create({
  baseURL: 'http://localhost:3443',
})

export const reqAPI = async (method: string, url: string, data: any) => {
  const axiosRequest: AxiosRequestConfig = {
    method,
    url: BASE_URL + url,
    data,
  }

  try {
    const res = await axios(axiosRequest)
    if (res) return res
    else return null
  } catch (err) {
    throw new Error(err)
  }
}

export default api

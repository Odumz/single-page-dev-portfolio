import axios, { AxiosRequestConfig } from 'axios'
// import codeMessage from './codeMessage'

// axios.defaults.withCredentials = true;

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.timeout = 25000

axios.defaults.headers.common = {
  'Access-Control-Allow-Origin': '*'
}

const axiosInstance = axios.create({
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }
  // (error) => {
  //   if (error?.message?.includes?.('timeout')) {
  //     console.error('request timedout')
  //   } else {
  //     console.error(
  //       codeMessage?.[error?.response?.status as keyof typeof codeMessage], error.message
  //     )
  //     if (error?.response?.status === 403) console.error('403')
  //     return error
  //   }
  //   Promise.reject(error)
  // }
)

const requestObj = {
  get: <ResponseType = unknown>(
    url: string,
    options?: AxiosRequestConfig<unknown>
  ): Promise<ResponseType> => {
    return axiosInstance.get(url, options)
  },
  delete: <ResponseType = unknown>(
    url: string,
    options?: AxiosRequestConfig<unknown>
  ): Promise<ResponseType> => {
    return axiosInstance.delete(url, options)
  },
  post: <ResponseType = unknown>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<unknown>
  ): Promise<ResponseType> => {
    return axiosInstance.post(url, data, options)
  },
  put: <ResponseType = unknown>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<unknown>
  ): Promise<ResponseType> => {
    return axiosInstance.put(url, data, options)
  },
  patch: <ResponseType = unknown>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<unknown>
  ): Promise<ResponseType> => {
    return axiosInstance.patch(url, data, options)
  }
}

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown> & {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  }
): Promise<ResponseType> => {
  const method = options?.method ?? 'GET'

  if (method === 'GET') {
    return requestObj.get<ResponseType>(url, options)
  }
  if (method === 'DELETE') {
    return requestObj.delete<ResponseType>(url, options)
  }
  if (method === 'POST') {
    return requestObj.post<ResponseType>(url, options?.data, options)
  }
  if (method === 'PUT') {
    return requestObj.put<ResponseType>(url, options?.data, options)
  }
  if (method === 'PATCH') {
    return requestObj.patch<ResponseType>(url, options?.data, options)
  }

  return requestObj.get<ResponseType>(url, options)
}

export { axiosInstance, request }

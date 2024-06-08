import { request } from './axios'

// api helper to fetch data from the backend
export const getData = async (url: string) => {
  try {
    console.log('url here', url)
    const response: any = await request(`${url}`)
    console.log('response', response.data)
    return response.data
  } catch (err) {
    console.log('error', err)
    return err
  }
}

// api helper to edit data with put
export const putData = async (url: any, data: any = null) => {
  try {
    const options: {} = {
      method: 'PUT',
      'Content-Type': 'application/json;charset=UTF-8',
      data
    }
    const response: any = await request(url, options)
    console.log('method', options)
    console.log('response', response.data)
    return response.data
  } catch (err: any) {
    console.log('err', err.response)
    // console.log("method", options)
    return err?.response
  }
}

// api helper to edit data with put
export const deleteData = async (url: any, data: any) => {
  try {
    const options: {} = {
      method: 'DELETE',
      'Content-Type': 'application/json;charset=UTF-8',
      data
    }
    const response: any = await request(url, options)
    console.log('method', options)
    console.log('response', response.data)
    return response.data
  } catch (err: any) {
    console.log('err', err.response)
    // console.log("method", options)
    return err?.response
  }
}

// api helper to add json data to the backend
export const postData = async (url: any, data: any, token?: string) => {
  try {
    const options: {} = {
      method: 'POST',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
      data
    }
    const response: any = await request(url, options)
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    console.log('response in here is, ', response)
    const status: number = response.status
    const res: {} = response.data
    return {
      status,
      res
    }
  } catch (err: any) {
    console.log('err in here', err, typeof err)
    console.log('err in here', err.response, typeof err)
    console.log('err in here', err.response?.data?.message, typeof err)
    console.log('err in here', err.response?.status, typeof err)
    console.log('err in here', err.message, typeof err)
    const status: number = err.response?.status
    const message: number = err.response?.data?.message ?? err?.message
    return {
      status,
      message
    }
  }
}

// api helper to add multipart-formdata to the backend
export const postDataFile = async (url: any, data: any, token?: string) => {
  try {
    const options: {} = {
      method: 'POST',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data;',
      data
    }
    console.log('adding file data with options', options)
    console.log('adding the following file data', data.get('file'))
    const response: any = await request(url, options)
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    console.log('response in here is, ', response)
    const status: number = response.status
    const res: {} = response.data
    return {
      status,
      res
    }
  } catch (err: any) {
    console.log('err in here', err, typeof err)
    console.log('err in here', err.response, typeof err)
    console.log('err in here', err.response?.data?.message, typeof err)
    console.log('err in here', err.status, typeof err)
    console.log('err in here', err.message, typeof err)
    const status: number = err?.status
    const message: number = err?.message
    return {
      status,
      message
    }
  }
}

// api helper to add empty data to the backend
export const postDataEmpty = async (url: string, token?: string) => {
  try {
    const options: {} = {
      method: 'POST',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const response: any = await request(url, options)
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    console.log('response in here is, ', response)
    const status: number = response.status
    const res: {} = response.data
    return {
      status,
      res
    }
  } catch (err: any) {
    console.log('err in here', err, typeof err)
    console.log('err in here', err.response, typeof err)
    console.log('err in here', err.response?.data?.message, typeof err)
    console.log('err in here', err.response?.status, typeof err)
    console.log('err in here', err.message, typeof err)
    const status: number = err.response?.status
    const message: number = err.response?.data?.message
    return {
      status,
      message
    }
  }
}
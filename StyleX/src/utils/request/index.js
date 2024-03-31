import instance from './instance'

export const get = (url, params) => instance(url, { method: 'get', params })

export const post = (url, data) => instance(url, { method: 'post', data })

export const put = (url, data) => instance(url, { method: 'put', data })

export const del = (url, data) => instance(url, { method: 'delete', data })

export const download = (url, data) => instance(url, { method: 'post', data, responseType: 'blob' })

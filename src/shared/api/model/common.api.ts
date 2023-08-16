import axios from 'axios'

export const baseURL = 'https://inctagram.work/api/v1/'
export const instance = axios.create({
  baseURL: baseURL,
})

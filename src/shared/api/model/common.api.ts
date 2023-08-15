import axios from 'axios'

export const baseURL = 'https://blazingbonfires.click/api/v1/'
export const instance = axios.create({
  baseURL: baseURL,
})

import axios from 'axios'
const baseUrl = '/api/expenses'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getByID = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}?=ID=${id}`, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getByID, create, update, remove, setToken }

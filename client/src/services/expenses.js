import axios from 'axios'
const baseUrl = '/api/expenses'

let token = null
console.log('expense service token', token)
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  console.log('expense service token inside getall', token)

  const config = {
    headers: { Authorization: token }
  }
  console.log('get all config', config)
  const response = await axios.get(baseUrl, config)
  console.log('getall response', response)
  return response.data
}

const getByID = async id => {
  console.log('expense service token inside getallid', token)

  const config = {
    headers: { Authorization: token }
  }
  console.log('get all id config', config)

  const response = await axios.get(`${baseUrl}?=ID=${id}`, config)
  console.log('getbyid repsonse', response.data)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
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

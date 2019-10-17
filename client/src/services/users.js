import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const request = await axios.post(baseUrl, newObject)
  return request.data
}

export default { getAll, create }

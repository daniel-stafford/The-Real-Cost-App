import React from 'react'
import { Loader } from 'semantic-ui-react'
import { capitalize } from '../utils/functions'

const UserStatus = ({ loggedinUser }) => {
  const displayUser = capitalize(loggedinUser.username)
  if (!loggedinUser) return <Loader />
  return <>{displayUser} is currently logged in</>
}

export default UserStatus

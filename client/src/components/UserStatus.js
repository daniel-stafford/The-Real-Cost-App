import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CURRENT_USER } from '../graphQL/queries'

const UserStatus = ({ handleCurrentUser }) => {
  const { loading, error, data } = useQuery(CURRENT_USER)
  if (loading) return <div>Loading...</div>
  if (error) return console.log('something went wrong with user status')
  if (!loading) {
    console.log('user status data', data)
    handleCurrentUser(data)
    return (
      <div>
        <p>{data.me.username} is currently logged in</p>
      </div>
    )
  }
}

export default UserStatus

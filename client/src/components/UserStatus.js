import React from 'react'

const UserStatus = currentUser => {
  console.log('userstatus current user', currentUser)
  if (currentUser.loading) return <div>Loading...</div>
  if (!currentUser.data) return null
  // todo: figure out why I can't get past this line and load the current user data, as I get currentUser.data.me to show up via console.log
  return (
    <div>
      <p>{currentUser.data.me} is currently logged in</p>
    </div>
  )
}

export default UserStatus

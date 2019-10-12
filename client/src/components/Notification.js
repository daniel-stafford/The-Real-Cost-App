import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  console.log('notification prop', notification)
  if (notification.category === 'hide') {
    return null
  }
  if (notification.category === 'error')
    return <Message error>{notification.content}</Message>

  if (notification.category === 'success')
    return <Message success>{notification.content}</Message>
}
export default Notification

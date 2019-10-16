import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (notification.category === 'hide') {
    return null
  }
  if (notification.category === 'error')
    return <Message negative>{notification.content}</Message>

  if (notification.category === 'success')
    return <Message positive>{notification.content}</Message>
}
export default Notification

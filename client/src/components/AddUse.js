import React from 'react'
import { Button } from 'semantic-ui-react'

const AddUse = ({ id, handleNotification }) => {
  const handleClick = async (id, handleNotification) => {
    return (
      <Button
        basic
        color="blue"
        onClick={() => handleClick(id, handleNotification)}
      >
        Add use
      </Button>
    )
  }
}

export default AddUse

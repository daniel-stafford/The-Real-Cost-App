import React from 'react'
import { Button } from 'semantic-ui-react'
import expenseService from '../services/expenses'

const AddUse = ({ id, handleNotification }) => {
  const handleClick = async (id, handleNotification, uses) => {
    const newUse = { uses: uses + 1 }
    expenseService.update(newUse)
  }
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

export default AddUse

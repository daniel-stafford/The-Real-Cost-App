import React from 'react'
import { Button } from 'semantic-ui-react'
import expenseService from '../services/expenses'
const AddUse = ({ id, handleNotification }) => {
  const handleClick = async (id, handleNotification, uses) => {
    console.log('you clicked add use', id)
    const newUse = new Date()
    console.log(typeof newUse)
    const existingUses = await expenseService.getByID(id)
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

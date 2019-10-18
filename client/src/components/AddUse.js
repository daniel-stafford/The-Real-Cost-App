import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import expenseService from '../services/expenses'

const AddUse = props => {
  return (
    <Button basic color="blue" onClick={() => props.handleNewUse()}>
      Add use
    </Button>
  )
}

export default AddUse

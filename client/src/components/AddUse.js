import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import expenseService from '../services/expenses'

const AddUse = props => {
  const [count, setCount] = useState(props.uses)
  console.log('add use count', count)
  console.log('add use props', props)
  const handleClick = async () => {
    const newUse = { uses: count + 1 }
    await expenseService.update(props.id, newUse)
    setCount(count + 1)
    props.handleNewUse(count)
  }
  return (
    <Button basic color="blue" onClick={() => handleClick()}>
      Add use
    </Button>
  )
}

export default AddUse

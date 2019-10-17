import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
// import { Confirmation } from '../components'

const DeleteExpense = props => {
  const handleDelete = async id => {
    console.log('handle delete firing', id)
  }
  return (
    <div>
      <Button basic color="red" onClick={() => handleDelete(props.id)}>
        Delete
      </Button>
    </div>
  )
}

export default withRouter(DeleteExpense)

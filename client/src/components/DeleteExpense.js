import React from 'react'
import { Button, Loader } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import expenseService from '../services/expenses'

const DeleteExpense = props => {
  const handleDelete = async id => {
    console.log('handle delete firing', id)
    if (window.confirm(`Are you sure you want to delete ${props.title}`)) {
      try {
        expenseService.remove(props.id)
        props.handleNotification('success', `OK, I'll delete that.`, 2)
        setTimeout(() => {
          props.history.push('/expenses')
        }, 2000)
      } catch (error) {
        props.handleNotification(
          'error',
          `Something went wrong with deleting that. Let's go back to the expenses page`,
          2000
        )
        setTimeout(() => {
          props.history.push('/expenses')
        }, 2000)
      }
    }
  }
  if (!props.id) return <Loader active />
  return (
    <div>
      <Button basic color="red" onClick={() => handleDelete(props.id)}>
        Delete
      </Button>
    </div>
  )
}

export default withRouter(DeleteExpense)

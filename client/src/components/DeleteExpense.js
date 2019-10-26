import React from 'react'
import { Loader } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import expenseService from '../services/expenses'
import { Confirmation } from './index'

const DeleteExpense = props => {
  const handleDelete = async isConfirmed => {
    if (isConfirmed) {
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
      <Confirmation handleDelete={handleDelete} title={props.title} />
    </div>
  )
}

export default withRouter(DeleteExpense)

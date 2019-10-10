import React from 'react'
import { DELETE_EXPENSE } from '../graphQL/mutations'
import { ALL_EXPENSES } from '../graphQL/queries'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'semantic-ui-react'

const DeleteExpense = props => {
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const handleDelete = async id => {
    console.log('handle delete firing', id)
    try {
      await deleteExpense({
        variables: { id }
      })
    } catch (error) {
      console.log('something went wrong with deleting expense', error)
    }
  }
  return (
    <Button basic color='red' onClick={() => handleDelete(props.id)}>
      Delete
    </Button>
  )
}

export default DeleteExpense

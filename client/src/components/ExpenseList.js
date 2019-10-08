import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_EXPENSES } from '../graphQL/queries'
import { ADD_USE, DELETE_EXPENSE } from '../graphQL/mutations'

import { Button, Loader, Card } from 'semantic-ui-react'

const ExpenseList = () => {
  const expenses = useQuery(ALL_EXPENSES)
  const [addUse] = useMutation(ADD_USE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const handleClick = async id => {
    try {
      await addUse({
        variables: { id }
      })
    } catch (error) {
      console.log('something went wrong with add use', error)
    }
  }
  const costPerUse = (price, uses) => {
    return price / uses
  }

  const handleDelete = async id => {
    try {
      await deleteExpense({
        variables: { id }
      })
    } catch (error) {
      console.log('something went wrong with deleting expense', error)
    }
  }
  if (expenses.loading)
    return (
      <div>
        <Loader active />
      </div>
    )
  if (!expenses.data) return <div>No data available</div>
  return (
    <Card.Group>
      {expenses.data.expenses.map(e => {
        console.log('expenses', e)
        return (
          <Card key={e.title}>
            <Card.Content>
              <Card.Header>{e.title}</Card.Header>

              <li> Price: {e.price}</li>
              <li>
                Uses: {e.uses}{' '}
                <Button basic color='blue' onClick={() => handleClick(e.id)}>
                  Add use
                </Button>
              </li>
              {e.uses > 0 && (
                <li>Cost Per Use: {costPerUse(e.price, e.uses)}</li>
              )}
              <li>Created: {moment(e.createdAt).calendar()}</li>
              <li>Last Updated: {moment(e.updatedAt).calendar()}</li>
              <Button basic color='red' onClick={() => handleDelete(e.id)}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default ExpenseList

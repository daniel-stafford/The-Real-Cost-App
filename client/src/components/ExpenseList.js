import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_EXPENSES } from '../graphQL/queries'
import { ADD_USE } from '../graphQL/mutations'
import { Link } from 'react-router-dom'

import { Button, Loader, Card } from 'semantic-ui-react'

const ExpenseList = () => {
  const { loading, error, data } = useQuery(ALL_EXPENSES)
  const [addUse] = useMutation(ADD_USE, {
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

  if (loading)
    return (
      <div>
        <Loader active />
      </div>
    )
  if (error) return `Error! ${error.message}`
  return (
    <Card.Group>
      {data.expenses.map(e => {
        console.log('expenses', e)
        return (
          <Card key={e.title}>
            <Card.Content>
              <Card.Header>
                <Link to={`/expenses/${e.id}`}>{e.title}</Link>
              </Card.Header>

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
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default ExpenseList

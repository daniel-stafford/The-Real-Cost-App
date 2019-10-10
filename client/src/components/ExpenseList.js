import React from 'react'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_EXPENSES } from '../graphQL/queries'
import { Link } from 'react-router-dom'

import { Button, Loader, Card } from 'semantic-ui-react'

const ExpenseList = () => {
  const { loading, error, data } = useQuery(ALL_EXPENSES)

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
  if (data.expenses.length === 0)
    return (
      <div>
        <p> You haven't added any expenses yet </p>
        <p>
          Go ahead and <Link to='/create_expense'>create one!</Link>
        </p>
      </div>
    )
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
              <li>Uses: {e.uses} </li>
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

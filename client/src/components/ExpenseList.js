import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_EXPENSES } from '../graphQL/queries'
import { Link } from 'react-router-dom'
import { Loader, Card } from 'semantic-ui-react'
import { costPerUse } from '../utils/functions'

const ExpenseList = props => {
  const { loading, error, data } = useQuery(ALL_EXPENSES)
  console.log('expense list props', props)
  if (loading)
    return (
      <div>
        <Loader active />
      </div>
    )
  if (error) return `Error! ${error.message}`
  const userExpenses = data.expenses.filter(
    e => e.creator.id === props.loggedInUser.me.id
  )
  if (userExpenses.length === 0)
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
      {userExpenses.map(e => {
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
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default ExpenseList

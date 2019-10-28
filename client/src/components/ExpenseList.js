import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Card } from 'semantic-ui-react'
import { Filter } from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'

const ExpenseList = props => {
  const [expenses, setExpenses] = useState(null)
  const [filter, setFilter] = useState('')
  const handleFilter = userInput => {
    setFilter(userInput)
  }

  let filteredExpenses = expenses

  if (filter) {
    filteredExpenses = expenses.filter(e =>
      e.title.toLowerCase().includes(filter)
    )
  }

  /*eslint-disable */
  useEffect(() => {
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll().then(response => {
      setExpenses(response.expenses)
    })
  }, [])
  /*eslint-enable */

  if (!expenses) return <Loader active />
  if (expenses.length === 0)
    return (
      <div>
        <p> You haven't added any expenses yet </p>
        <p>
          Go ahead and <Link to="/create_expense">create one!</Link>
        </p>
      </div>
    )
  return (
    <>
      <Filter handleFilter={handleFilter} />
      <Card.Group>
        {filteredExpenses.map(e => {
          console.log('expenses', e)
          return (
            <Card key={e.title}>
              <Card.Content>
                <Card.Header>
                  <Link to={`/expenses/${e.id}`}>{e.title}</Link>
                </Card.Header>

                <li> Price: {e.price}</li>
                <li>Uses: {e.uses.length} </li>
                {e.uses > 0 && (
                  <li>Cost Per Use: {costPerUse(e.price, e.uses)}</li>
                )}
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </>
  )
}

export default ExpenseList

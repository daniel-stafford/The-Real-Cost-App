import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Card, Grid, Header, Container, List } from 'semantic-ui-react'
import { Filter } from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'

const ExpenseList = props => {
  const colorList = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black'
  ]
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
      <>
        <Grid centered columns={10}>
          <Grid.Row>
            <Container text>
              <Grid.Column width={5}>
                <Header as='h1'>My Expenses</Header>
              </Grid.Column>
            </Container>
          </Grid.Row>
        </Grid>

        <div>
          <p> You haven't added any expenses yet </p>
          <p>
            Go ahead and <Link to='/create_expense'>create one!</Link>
          </p>
        </div>
      </>
    )

  return (
    <>
      <Grid centered columns={10}>
        <Grid.Row>
          <Container text>
            <Grid.Column width={5}>
              <Header as='h1'>My Expenses</Header>
            </Grid.Column>
          </Container>
          <Grid.Column width={5} floated='left'>
            <Filter handleFilter={handleFilter} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Card.Group>
        {filteredExpenses.map(e => {
          return (
            <Card
              raised
              key={e.title}
              color={colorList[expenses.length]}
              href={`/expenses/${e.id}`}
            >
              <Card.Content>
                <Card.Header>{e.title}</Card.Header>
                <List>
                  {e.uses.length > 0 && (
                    <li>Cost Per Use: €{costPerUse(e.price, e.uses.length)}</li>
                  )}
                </List>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </>
  )
}

export default ExpenseList

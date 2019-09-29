import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'

const ALL_EXPENSES = gql`
  {
    expenses {
      title
    }
  }
`

const App = () => {
  const expenses = useQuery(ALL_EXPENSES)
  console.log('expenses', expenses)
  return (
    <div>
      {!expenses.loading &&
        expenses.data.expenses.map(e => {
          return <li key={e.title}>{e.title}</li>
        })}
      <CreateForm />
    </div>
  )
}

export default App

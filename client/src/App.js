import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'

const ALL_BOOKS = gql`
  {
    books {
      title
    }
  }
`

const App = () => {
  const books = useQuery(ALL_BOOKS)
  console.log('books', books)
  return (
    <div>
      {!books.loading &&
        books.data.books.map(b => {
          return <li key={b.title}>{b.title}</li>
        })}
      <CreateForm />
    </div>
  )
}

export default App

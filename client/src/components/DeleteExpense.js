// import React from 'react'
// import { DELETE_EXPENSE } from '../graphQL/mutations'
// import { ALL_EXPENSES } from '../graphQL/queries'
// import { useMutation } from '@apollo/react-hooks'
// import { Button } from 'semantic-ui-react'
// import { withRouter } from 'react-router'
// // import { Confirmation } from '../components'

// const DeleteExpense = props => {
//   const [deleteExpense] = useMutation(DELETE_EXPENSE, {
//     refetchQueries: [{ query: ALL_EXPENSES }]
//   })
//   const handleDelete = async id => {
//     console.log('handle delete firing', id)
//     if (window.confirm('are you sure???')) {
//       try {
//         await deleteExpense({
//           variables: { id }
//         })
//         props.history.push('/expenses')
//       } catch (error) {
//         console.log('something went wrong with deleting expense', error)
//       }
//     }
//   }
//   return (
//     <div>
//       <Button basic color='red' onClick={() => handleDelete(props.id)}>
//         Delete
//       </Button>
//       {/* <Confirmation /> */}
//     </div>
//   )
// }

// export default withRouter(DeleteExpense)
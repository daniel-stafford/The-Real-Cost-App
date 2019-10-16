// import React, { useState } from 'react'
// import { useQuery } from '@apollo/react-hooks'
// import { ALL_EXPENSES } from '../graphQL/queries'
// import { Link } from 'react-router-dom'
// import { Loader, Card } from 'semantic-ui-react'
// import { costPerUse } from '../utils/functions'
// import { Filter } from '../components'

// const ExpenseList = props => {
//   const { loading, error, data } = useQuery(ALL_EXPENSES)
//   const [filter, setFilter] = useState('')

//   const handleFilter = userInput => {
//     setFilter(userInput)
//   }
//   console.log('expenselist filter', filter)
//   if (loading)
//     return (
//       <div>
//         <Loader active />
//       </div>
//     )
//   if (error) return `Error! ${error.message}`
//   const allExpenses = data.expenses

//   const userExpenses = allExpenses.filter(
//     e => e.creator.id === props.loggedInUser.me.id
//   )

//   let filteredExpenses = userExpenses

//   if (filter) {
//     filteredExpenses = userExpenses.filter(e =>
//       e.title.toLowerCase().includes(filter)
//     )
//   }
//   if (!userExpenses)
//     return (
//       <div>
//         <p> You haven't added any expenses yet </p>
//         <p>
//           Go ahead and <Link to='/create_expense'>create one!</Link>
//         </p>
//       </div>
//     )
//   return (
//     <>
//       <Filter handleFilter={handleFilter} />
//       <Card.Group>
//         {filteredExpenses.map(e => {
//           console.log('expenses', e)
//           return (
//             <Card key={e.title}>
//               <Card.Content>
//                 <Card.Header>
//                   <Link to={`/expenses/${e.id}`}>{e.title}</Link>
//                 </Card.Header>

//                 <li> Price: {e.price}</li>
//                 <li>Uses: {e.uses} </li>
//                 {e.uses > 0 && (
//                   <li>Cost Per Use: {costPerUse(e.price, e.uses)}</li>
//                 )}
//               </Card.Content>
//             </Card>
//           )
//         })}
//       </Card.Group>
//     </>
//   )
// }

// export default ExpenseList

// import React from 'react'
// import { useMutation } from '@apollo/react-hooks'
// import { ALL_EXPENSES } from '../graphQL/queries'
// import { ADD_USE } from '../graphQL/mutations'
// import { Button } from 'semantic-ui-react'

// const AddUse = ({ id, handleNotification }) => {
//   const [addUse] = useMutation(ADD_USE, {
//     refetchQueries: [{ query: ALL_EXPENSES }]
//   })
//   const handleClick = async (id, handleNotification) => {
//     try {
//       await addUse({
//         variables: { id }
//       })
//       handleNotification('success', 'Great! New use added!', 2)
//     } catch (error) {
//       handleNotification('error', error)
//       console.log('something went wrong with add use', error)
//     }
//   }
//   return (
//     <Button
//       basic
//       color='blue'
//       onClick={() => handleClick(id, handleNotification)}
//     >
//       Add use
//     </Button>
//   )
// }

// export default AddUse

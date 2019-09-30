import React from 'react'

const ExpenseList = ({ expenses, addUse, deleteExpense }) => {
  const handleClick = async id => {
    console.log(id)
    try {
      await addUse({
        variables: { id }
      })
    } catch (error) {
      console.log('something went wrong with add use', error)
    }
  }
  const costPerUse = (price, uses) => {
    console.log(price)
    console.log(uses)
    return price / uses
  }

  const handleDelete = async id => {
    console.log('delete id', id)
    try {
      await deleteExpense({
        variables: { id }
      })
    } catch (error) {
      console.log('something went wrong with deleting expense', error)
    }
  }

  return (
    <ul>
      {!expenses.loading &&
        expenses.data.expenses.map(e => {
          console.log('e', e)
          return (
            <li key={e.title}>
              {e.title}
              <ul>
                <li> Price: {e.price}</li>
                <li>
                  Uses: {e.uses}{' '}
                  <button onClick={() => handleClick(e.id)}>Add use</button>
                </li>
                {e.uses > 0 && (
                  <li>Cost Per Use: {costPerUse(e.price, e.uses)}</li>
                )}
                <button onClick={() => handleDelete(e.id)}>Delete</button>
              </ul>
            </li>
          )
        })}
    </ul>
  )
}

export default ExpenseList

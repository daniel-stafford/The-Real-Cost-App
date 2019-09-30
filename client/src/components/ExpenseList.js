import React from 'react'

const ExpenseList = ({ expenses, addUse }) => {
  const handleClick = async id => {
    console.log(id)
    await addUse({
      variables: { id }
    })
  }
  const costPerUse = (price, uses) => {
    console.log(price)
    console.log(uses)
  }

  return (
    <div>
      {!expenses.loading &&
        expenses.data.expenses.map(e => {
          console.log('e', e)
          return (
            <li key={e.title}>
              {e.title}
              <ul>
                <li> Price: {e.price}</li>
                <li>Id: {e.id}</li>

                <li>
                  Uses: {e.uses}{' '}
                  <button onClick={() => handleClick(e.id)}>Add use</button>
                </li>
                <li>Cost Per Use: {costPerUse(e.price, e.uses)}</li>
              </ul>
            </li>
          )
        })}
    </div>
  )
}

export default ExpenseList

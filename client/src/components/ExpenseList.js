import React from 'react'

const ExpenseList = ({ expenses }) => {
  const handleClick = id => {
    console.log(id)
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
                <li>Cost: {e.cost}</li>
                <li>
                  Uses: {e.uses}{' '}
                  <button onClick={() => handleClick(e.id)}>Add use</button>
                </li>
              </ul>
            </li>
          )
        })}
    </div>
  )
}

export default ExpenseList

import React, { useState } from 'react'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import useField from '../hooks/useField'

const CreateForm = ({ addExpense }) => {
  const title = useField('text')
  const [date, setDate] = useState(null)
  const price = useField('number')
  const notes = useField('text')

  // const handleDateChange = date => setDate(date)

  const handleSubmit = async e => {
    e.preventDefault()
    if (date) {
      setDate(date.toString())
    }
    await addExpense({
      variables: {
        title: title.value,
        // purchaseDate: date,
        notes: notes.value,
        price: parseInt(price.value, 10)
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input {...title} />
        </div>
        {/* <div>
          <label>Purchase Date: </label>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            popperPlacement='bottom'
            popperModifiers={{
              flip: {
                behavior: ['bottom']
              }
            }}
          >
            <input type='time' name='time' />
          </DatePicker>
        </div> */}
        <div>
          <label>Price: </label>
          <input {...price} />
        </div>
        <div>
          <label>Notes: </label>
          <input {...notes} />
        </div>
        <button type='submit'>Create New!</button>
      </form>
    </div>
  )
}

export default CreateForm

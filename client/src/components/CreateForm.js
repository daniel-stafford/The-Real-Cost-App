import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useField from '../hooks/useField'

const CreateForm = ({ addExpense }) => {
  const title = useField('text')
  const [date, setDate] = useState(new Date())
  const cost = useField('number')
  const notes = useField('text')

  // const handleDateChange = date => setDate(date)

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('title', title.value)
    console.log('date', date)
    console.log('notes', notes.value)
    console.log('cost', cost.value)

    await addExpense({
      variables: {
        title: title.value,
        date: date.toString(),
        notes: notes.value,
        cost: parseInt(cost.value, 10)
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
        <div>
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
        </div>
        <div>
          <label>Cost: </label>
          <input {...cost} />
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

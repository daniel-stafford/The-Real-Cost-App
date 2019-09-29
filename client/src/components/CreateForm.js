import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useField from '../hooks/useField'

const CreateForm = () => {
  const title = useField('text')
  const [date, setDate] = useState(new Date())
  const cost = useField('number')
  const notes = useField('text')

  // const handleDateChange = date => setDate(date)

  const handleSubmit = e => {
    e.preventDefault()
    console.log('title', title.value)
    console.log('date', date)
    console.log('notes', notes.value)
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

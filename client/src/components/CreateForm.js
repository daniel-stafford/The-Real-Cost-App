import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useField from '../hooks/useField'

const CreateForm = () => {
  const title = useField('text')
  const [date, setDate] = useState(new Date())
  const cost = useField('number')
  const notes = useField('text')

  console.log('hook title', title)
  console.log('hook date', date)
  const handleChange = date => setDate(date)
  return (
    <div>
      <form>
        <div>
          <label>Title: </label>
          <input {...title} />
        </div>
        <div>
          <label>Purchase Date: </label>
          <DatePicker
            selected={date}
            onChange={handleChange}
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

        <input type='submit' value='Submit' />
      </form>
      {title.value} {date.toString()} {cost.value} {notes.value}
    </div>
  )
}

export default CreateForm

import React from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const ExpenseCalendar = props => {
  console.log('epxense calendar props', props)
  const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`

  let myArray = { highlighted: [] }
  const myModifiers = props.uses.map(date => myArray.highlighted.push(date))
  console.log('myArray', myArray)

  const modifiers = {
    highlighted: [new Date(2018, 8, 19), new Date(2018, 8, 20)]
  }
  console.log('modifiers', typeof modifiers.highlighted[1])
  return (
    <div>
      <style>{birthdayStyle}</style>
      <DayPicker modifiers={myArray} />
    </div>
  )
}

export default ExpenseCalendar

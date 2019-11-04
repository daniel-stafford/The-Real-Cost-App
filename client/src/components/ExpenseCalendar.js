import React from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const ExpenseCalendar = ({ uses }) => {
  const getModifiers = () => {
    const modObject = { highlighted: [] }
    uses.map(date => modObject.highlighted.push(new Date(date)))
    return modObject
  }
  const highlightStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`

  return (
    <div>
      <style>{highlightStyle}</style>
      <DayPicker modifiers={getModifiers()} />
    </div>
  )
}

export default ExpenseCalendar

import React from 'react'
import { Form } from 'semantic-ui-react'
const Filter = ({ handleFilter }) => {
  const handleChange = e => {
    console.log('handle Change is firing')
    console.log(e.target.value)
    handleFilter(e.target.value.toLowerCase())
  }

  return (
    <Form onChange={handleChange}>
      <div className='ui icon input'>
        <input type='text' placeholder='Search...' />
        <i aria-hidden='true' className='search icon'></i>
      </div>
    </Form>
  )
}

export default Filter

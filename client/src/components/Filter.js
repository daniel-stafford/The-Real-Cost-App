import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
const Filter = ({ handleFilter }) => {
  const handleChange = e => {
    console.log('handle Change is firing')
    console.log(e.target.value)
    handleFilter(e.target.value.toLowerCase())
  }
  return (
    <Form onChange={handleChange}>
      <div className="ui icon input">
        <input type="text" placeholder="Search..." />
        <i aria-hidden="true" className="search icon"></i>
      </div>
    </Form>
  )
}

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired
}

export default Filter

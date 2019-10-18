import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader, Card } from 'semantic-ui-react'
import { Filter } from '../components'
import expenseService from '../services/expenses'

const ExpenseList = props => {
  useEffect(() => {
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll().then(response => {
      console.log(response)
    })
  }, [])

  return (
    <div>
      <p>Expense List!</p>
    </div>
  )
}

export default ExpenseList

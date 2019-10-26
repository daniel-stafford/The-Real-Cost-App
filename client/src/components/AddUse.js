import React from 'react'
import { Button } from 'semantic-ui-react'

const AddUse = props => {
  return (
    <Button basic color="blue" onClick={() => props.handleNewUse()}>
      Add use
    </Button>
  )
}

export default AddUse

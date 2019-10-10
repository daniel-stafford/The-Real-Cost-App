import React from 'react'
import { VictoryBar } from 'victory'

const CostChart = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ]

  return (
    <VictoryBar
      data={data}
      // data accessor for x values
      x='quarter'
      // data accessor for y values
      y='earnings'
    />
  )
}

export default CostChart

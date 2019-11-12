import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

const CostChart = props => {
  const price = props.expense.price
  const currentUses = props.expense.uses.length

  const data = [
    { use: 1, cost: price / currentUses },
    { use: 2, cost: price / (currentUses + 1) },
    { use: 3, cost: price / (currentUses + 5) },
    { use: 4, cost: price / (currentUses + 10) }
  ]

  return (
    <VictoryChart
      style={{ height: 'fit-content' }}
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={40}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={['My cost per use', '+1 use', '+5 uses', '+10 uses']}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x => `${x}€`}
      />
      <VictoryBar data={data} x="use" y="cost" />
    </VictoryChart>
  )
}

export default CostChart

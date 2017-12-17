import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import PositionsMarketsList from 'modules/portfolio/components/positions-markets-list/positions-markets-list'
import { TYPE_CHALLENGE } from 'modules/market/constants/link-types'

export default class Positions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    openPositionMarkets: PropTypes.array.isRequired,
    reportingMarkets: PropTypes.array.isRequired,
    closedMarkets: PropTypes.array.isRequired,
    closePositionStatus: PropTypes.object.isRequired,
    scalarShareDenomination: PropTypes.object.isRequired,
    orderCancellation: PropTypes.object.isRequired,
    registerBlockNumber: PropTypes.number,
    loadAccountTrades: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadAccountTrades()
  }

  render() {
    const p = this.props

    return (
      <section>
        <Helmet>
          <title>Positions</title>
        </Helmet>
        <PositionsMarketsList
          title="Positions"
          markets={p.openPositionMarkets}
          closePositionStatus={p.closePositionStatus}
          scalarShareDenomination={p.scalarShareDenomination}
          orderCancellation={p.orderCancellation}
          location={p.location}
          history={p.history}
        />
        <PositionsMarketsList
          title="Reporting"
          markets={p.reportingMarkets}
          closePositionStatus={p.closePositionStatus}
          scalarShareDenomination={p.scalarShareDenomination}
          orderCancellation={p.orderCancellation}
          location={p.location}
          history={p.history}
          linkType={TYPE_CHALLENGE}
          positionsDefault={false}
        />
        <PositionsMarketsList
          title="Closed"
          markets={p.closedMarkets}
          closePositionStatus={p.closePositionStatus}
          scalarShareDenomination={p.scalarShareDenomination}
          orderCancellation={p.orderCancellation}
          location={p.location}
          history={p.history}
          positionsDefault={false}
        />
      </section>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import Car from './car'

const propTypes = {
  carsLoading: PropTypes.bool.isRequired,
  cars: PropTypes.array.isRequired,
  fetchCars: PropTypes.func.isRequired,
}

class CarList extends Component {
  render() {
    const { cars } = this.props
    console.log(cars)

    return (

      <Grid style={{ margin: '1rem 1.5rem' }} doubling columns={6}>
        {cars.map(car =>
          <Grid.Column>
              <Car id = {car.id}
                   picture = {car.img}
                   name = {car.name}
                   make = {car.make}
                   model = {car.model}
                   year = {car.year}
                   aval = {car.aval}
              />
          </Grid.Column>
        )}
      </Grid>
    )
  }
}

CarList.propTypes = propTypes

export default CarList

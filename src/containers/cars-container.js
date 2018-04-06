import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { carsIsLoading, carsFetchSuccess, avalFetchSuccess, avalIsLoading } from '../actions'
import CarList from '../components/car-list'

const fakeCars = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar0",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "acar",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar2",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar3",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar4",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 6,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar5",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 7,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar6",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 8,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar7",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 9,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar8",
    make: "make",
    model: "model",
    year: "2018"
  },
  {
    id: 10,
    img: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=action-asphalt-auto-210019.jpg&fm=jpg',
    name: "nicecar9",
    make: "make",
    model: "model",
    year: "2018"
  },
]
const avalOptions = ['In Dealership', 'Out of Stock', 'Unavailable']
const avalPriority = {'In Dealership': 1, 'Out of Stock': 2, 'Unavailable': 3}
class CarsContainer extends Component {
  componentDidMount() {
    this.getCars()
  }

  getCars(){
    const { carsIsLoading, carsFetchSuccess } = this.props
    axios.get('/cars')
      .then((response) => {
        /*
        * real API call is happening here
        */
        let carDict = {}
        response.data.forEach((car) => {
          carDict[car.id] = car
        })
        carsFetchSuccess(carDict)
        response.data.forEach((car) => {
          this.getAval(car.id)
        })
        carsIsLoading(false)
      })
      .catch((error) => {
        /*
        * fake data here, comment out when API is real
        */
        let carDict = {}
        fakeCars.forEach((car) => {
          carDict[car.id] = car
        })
        carsFetchSuccess(carDict)
        fakeCars.forEach((car) => {
          this.getAval(car.id)
        })


        carsIsLoading(false)
        console.log(error)
        // throw error
      })
  }
  getAval(id) {

    const { avalIsLoading, avalFetchSuccess } = this.props
    axios.get(`/availability?id=${id}`)
      .then((response) => {
        /*
        * real API call is happening here
        */
        avalFetchSuccess(id, response.data.available)
        avalIsLoading(false)
      })
      .catch((error) => {
        /*
        * fake data here
        */
        const fakeAval = avalOptions[id % 3]
        console.log("apapspdapdpasdpapdasd")
        avalFetchSuccess(id, fakeAval)

        avalIsLoading(false)
        console.log(error)
        // throw error
      })
  }
  render() {
    console.log('render');
    const { cars, carsLoading } = this.props
    const sortedCars = Object.values(cars).sort((a,b) => {
      if(a.name < b.name || (a.name === b.name && avalPriority[a.aval] < avalPriority[b.aval])){
        console.log(a, b);
        return -1
      } else {
        return 1
      }
    })
    return (
      <CarList
        carsLoading={carsLoading}
        cars={sortedCars}
      />
    )
  }
}

const mapStateToProps = state => ({
  carsLoading: state.carsLoading,
  cars: state.cars
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { carsIsLoading, carsFetchSuccess, avalFetchSuccess, avalIsLoading },
  dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarsContainer)

import { combineReducers } from 'redux'
import { CARS_LOADING, CARS_FETCH, AVAL_FETCH } from '../actions/action-type.js'

function carsLoading(state = false, action) {
  switch (action.type) {
    case CARS_LOADING:
      return action.payload
    default:
      return state
  }
}

function cars(state = {}, action) {
  switch (action.type) {
    case CARS_FETCH:
      return action.payload
    case AVAL_FETCH:
      return {...state, [action.id]: {...state[action.id], aval: action.payload }}
    default:
      return state
  }
}

export default combineReducers({
  carsLoading,
  cars,
})

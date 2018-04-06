import { AVAL_FETCH, AVAL_LOADING, CARS_LOADING, CARS_FETCH } from './action-type.js'

export function carsIsLoading(payload) {
  return {
    type: CARS_LOADING,
    payload
  }
}

export function carsFetchSuccess(payload) {
  return {
    type: CARS_FETCH,
    payload
  }
}

export function avalIsLoading(payload) {
  return {
    type: AVAL_LOADING,
    payload
  }
}

export function avalFetchSuccess(id, payload) {
  return {
    type: AVAL_FETCH,
    payload,
    id
  }
}

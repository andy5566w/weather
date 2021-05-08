import actionTypes from '../action-types'

const initial = {
  temperatures: [],
  isSuccess: false,
}

const TemperatureReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEMPERATURE:
      return {
        ...state,
        temperatures: action.payload,
        isSuccess: true,
      }
    case actionTypes.TEMPERATURE_IS_NOT_FOUND:
      return {
        ...state,
        temperatures: action.payload,
        isSuccess: false,
      }
    default:
      return state
  }
}
export default TemperatureReducer

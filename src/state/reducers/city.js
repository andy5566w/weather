import actionTypes from '../action-types'
const initial = {
  city: { data: {}, isLoading: false, isSuccess: false },
}

const CityReducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.ADD_CITY_DETAIL:
      return {
        ...state,
        data: action.payload[0],
        isLoading: false,
        isSuccess: true,
      }
    case actionTypes.CITY_IS_EMPTY:
      return { ...state, data: {}, isLoading: false, isSuccess: false }
    default:
      return state
  }
}
export default CityReducer

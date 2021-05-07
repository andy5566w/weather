import actionTypes from '../action-types'
import api from '../../api'

export const queryCity = (query) => async (dispatch) => {
  const { data } = await api.get('/api/location/search', { params: { query } })
  if (data && data.length)
    dispatch({ type: actionTypes.ADD_CITY_DETAIL, payload: data })
  else {
    dispatch({ type: actionTypes.CITY_IS_EMPTY })
    dispatch({
      type: actionTypes.TEMPERATURE_IS_NOT_FOUND,
      payload: [],
    })
  }
}

export const queryTemperatureByCity = (woeid) => async (dispatch) => {
  const {
    data: { consolidated_weather },
  } = await api.get(`/api/location/${woeid}`)
  if (consolidated_weather && consolidated_weather.length)
    dispatch({
      type: actionTypes.ADD_TEMPERATURE,
      payload: consolidated_weather,
    })
  else
    dispatch({
      type: actionTypes.TEMPERATURE_IS_NOT_FOUND,
      payload: [],
    })
}

import { combineReducers } from 'redux'
import CityReducer from './city'
import TemperatureReducer from './temperature'
const reducer = combineReducers({
  city: CityReducer,
  temperature: TemperatureReducer,
})
export default reducer

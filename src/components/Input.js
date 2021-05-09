import { useEffect } from 'react'
import { queryCity, queryTemperatureByCity } from '../state/actions-creator'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../state/action-types'

const Input = ({ query, setQuery }) => {
  const dispatch = useDispatch()
  const city = useSelector(({ city }) => city)
  useEffect(() => {
    let timer
    try {
      timer = setTimeout(async () => {
        await dispatch(queryCity(query))
      }, 1000)
    } catch (e) {
      console.log(e)
    }
    return () => clearTimeout(timer)
  }, [dispatch, query])

  useEffect(() => {
    async function fetchTemperature() {
      const { data } = city
      if (data && data.woeid) {
        await dispatch(queryTemperatureByCity(data.woeid))
      }
    }
    fetchTemperature()
  }, [dispatch, city])

  const handleChange = (e) => {
    setQuery(e.target.value)
    dispatch({ type: actionTypes.USER_IS_TYPING })
  }
  return (
    <input
      type="text"
      value={query}
      className="weather__query"
      onChange={handleChange}
    />
  )
}

export default Input

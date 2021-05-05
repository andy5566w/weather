import { useEffect, useState } from 'react'
import { queryCity, queryTemperatureByCity } from '../state/actions-creator'
import { useDispatch, useSelector } from 'react-redux'

const Input = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('london')
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
    // TODO 不知道會不會有race condition
    async function fetchTemperature() {
      const { data } = city
      if (data && data.woeid) {
        await dispatch(queryTemperatureByCity(data.woeid))
      }
    }
    fetchTemperature()
  }, [dispatch, city])

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  )
}

export default Input

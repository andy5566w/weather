import { useSelector } from 'react-redux'

const MaxTemperatureBar = () => {
  const temperatures = useSelector(
    ({ temperature }) => temperature.temperatures
  )
  console.log('temperatures', temperatures)
  return (
    <section>
      <ul>
        {temperatures.map(({ max_temp, min_temp, id }) => {
          return (
            <li key={id}>
              max_temp: {max_temp} min_temp: {min_temp} id: {id}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
export default MaxTemperatureBar

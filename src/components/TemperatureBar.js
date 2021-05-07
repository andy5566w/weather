import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import Canvas from '../utility'

const TemperatureBar = () => {
  const canvas = useRef()
  let temperatures = useSelector(
    ({ temperature: { temperatures } }) => temperatures
  )

  const city = useSelector(({ city }) => city)

  if (temperatures.length) {
    temperatures = temperatures.map(
      ({ min_temp, max_temp, applicable_date }) => ({
        max_temp,
        min_temp,
        applicable_date,
      })
    )
  }
  useEffect(() => {
    new Canvas({
      canvasDOM: canvas.current,
      tempArr: temperatures,
      cityDetail: city.data || {},
    })
  }, [city.data, temperatures])

  return (
    <section className="chart">
      <canvas ref={canvas} />
    </section>
  )
}
export default TemperatureBar

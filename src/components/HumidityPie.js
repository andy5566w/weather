// import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import PieChart from '../utility/PieChart'

const HumidityPie = () => {
  const canvas = useRef()
  // const humilities = useSelector(
  //   ({ temperature }) => temperature.temperatures
  // ).map(({ humidity, applicable_date }) => ({
  //   humidity,
  //   applicable_date,
  // }))
  const humilities = [
    { applicable_date: '2021-05-08', humidity: 85 },
    { applicable_date: '2021-05-09', humidity: 57 },
    { applicable_date: '2021-05-10', humidity: 55 },
    { applicable_date: '2021-05-11', humidity: 50 },
    { applicable_date: '2021-05-12', humidity: 54 },
  ]

  useEffect(() => {
    new PieChart({ canvas: canvas.current, humilities })
  }, [humilities])

  return (
    <section className="chart">
      <canvas ref={canvas} />
    </section>
  )
}

export default HumidityPie

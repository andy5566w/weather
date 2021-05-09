import { useRef, useEffect } from 'react'
import PieChart from '../utility/PieChart'

const HumidityPie = ({ applicable_date, humidity }) => {
  const canvas = useRef()

  useEffect(() => {
    new PieChart({
      canvas: canvas.current,
      applicable_date,
      humidity,
    })
  }, [humidity, applicable_date])

  return <canvas ref={canvas} />
}

export default HumidityPie

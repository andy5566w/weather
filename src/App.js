import Input from './components/Input'
import TemperatureBar from './components/TemperatureBar'
import HumidityPie from './components/HumidityPie'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import loadingIcon from './img/loading.svg'

function App() {
  const [query, setQuery] = useState('london')
  const [loading, setLoading] = useState(false)
  const humilities = useSelector(
    ({ temperature }) => temperature.temperatures
  ).map(({ humidity, applicable_date }) => ({
    humidity,
    applicable_date,
  }))

  const city = useSelector(({ city }) => city)
  useEffect(() => {
    const { isLoading } = city
    setLoading(isLoading)
  }, [city])

  const pieCharts = humilities.map(({ humidity, applicable_date }, index) => (
    <HumidityPie
      key={applicable_date}
      humidity={humidity}
      applicable_date={applicable_date}
    />
  ))

  const chartDOM = (
    <>
      <section className="chart">
        <TemperatureBar />
      </section>
      <section className="chart">{pieCharts}</section>
    </>
  )

  const loadingDOM = (
    <div className="loading">
      <img src={loadingIcon} alt={loadingIcon} />
    </div>
  )

  return (
    <section className="weather">
      <Input query={query} setQuery={(value) => setQuery(value)} />
      {!loading ? chartDOM : loadingDOM}
    </section>
  )
}

export default App

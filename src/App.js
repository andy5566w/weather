import Input from './components/Input'
import TemperatureBar from './components/TemperatureBar'
import HumidityPie from './components/HumidityPie'
function App() {
  return (
    <section className="weather">
      <Input />
      <TemperatureBar />
      <HumidityPie />
    </section>
  )
}

export default App

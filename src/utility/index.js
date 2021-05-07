class Canvas {
  constructor({ canvasDOM, tempArr, cityDetail }) {
    this.canvas = canvasDOM
    this.ctx = this.canvas.getContext('2d')
    this.maxTemp = []
    this.minTemp = []
    this.apllicationData = []
    tempArr.forEach(({ max_temp, min_temp, applicable_date }) => {
      this.maxTemp.push(max_temp)
      this.minTemp.push(min_temp)
      this.apllicationData.push(applicable_date)
    })
    this.cityDetail = cityDetail

    this.configure()

    this.drawBoundAndLine()

    if (tempArr.length) this.drawBar()
    else this.drawWarning()

    this.drawTitle()
  }

  drawWarning() {
    this.ctx.save()
    this.ctx.translate(this.canvasWidth / 2 - 200, this.canvasHeight / 2 - 10)
    this.ctx.fillStyle = this.color.warning
    this.ctx.font = '36px Arial'
    this.ctx.fillText('查無此資料，請重新查詢', 0, 0)
    this.ctx.restore()
  }

  drawTitle() {
    const lineHeight = 25
    this.ctx.save()
    this.ctx.translate(this.canvasWidth - 300, 0)
    this.ctx.fillStyle = this.color.maxTempWarm
    this.ctx.fillRect(0, 0, 300, 100)
    this.ctx.fillStyle = 'white'
    const { title = '查無此城市', latt_long = '查無此經緯度' } = this.cityDetail
    const texts = [
      '城市最高溫與最低溫圖表',
      `城市名稱: ${title}`,
      `經緯度: ${latt_long}`,
    ]
    for (let i = 1; i < 4; i++) {
      this.fillText({
        text: texts[i - 1],
        x: 10,
        y: lineHeight * i,
      })
    }

    this.ctx.restore()
  }

  drawBar() {
    this.ctx.save()
    this.ctx.translate(0, this.ZeroDegreeHeigh)
    for (let i = 0; i < 5; i++) {
      const maxTemp = this.maxTemp[i]
      const minTemp = this.minTemp[i]
      const x = (this.gap + this.blockWidth) * i + this.left
      this.ctx.save()

      this.ctx.translate(x, 0)
      this.drawSingleBar({ temp: maxTemp, type: 'max' })

      this.ctx.fillText(this.apllicationData[i], 5, maxTemp < 0 ? -40 : 20)

      this.ctx.translate(this.blockWidth + 10, 0)
      this.drawSingleBar({ temp: minTemp, type: 'min' })

      this.ctx.restore()
    }
    this.ctx.restore()
  }

  drawSingleBar({ temp, type = 'max' }) {
    const barHeight = -temp * this.yAxiosRadio
    const isMinus = temp < 0

    if (isMinus) this.ctx.fillStyle = this.color[`${type}TempCool`]
    else this.ctx.fillStyle = this.color[`${type}TempWarm`]

    this.ctx.fillRect(0, 0, this.blockWidth, barHeight)
    this.fillText({
      text: `${this.roundDecimal(temp, 2)}°C`,
      x: 0,
      y: barHeight - 10,
      isMinus,
    })
  }

  drawBoundAndLine() {
    this.ctx.fillStyle = this.color.bgColor
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(0, this.ZeroDegreeHeigh)
    for (let i = -5; i < 9; i++) {
      const y = -i * this.temperatureDistance
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvasWidth, y)
      this.ctx.fillStyle = this.color.lineColor
      this.ctx.fillText(i * 5 + '°C', 0, y - 10)
    }
    this.ctx.strokeStyle = 'rgba(0,0,0,.1)'
    this.ctx.stroke()
    this.ctx.restore()
  }

  fillText({ text, x, y, isMinus = false }) {
    this.ctx.font = '14px Arial'
    this.ctx.fillText(text, x, isMinus ? -20 : y)
  }

  roundDecimal(val, precision) {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    )
  }

  configure() {
    this.canvasWidth = 1000
    this.canvasHeight = 700
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight

    this.blockWidth = 50
    this.temperatureDistance = 50
    this.yAxiosRadio = this.temperatureDistance / 5
    this.righ = 150
    this.left = 150
    this.gap = 100

    this.color = {
      bgColor: '#ecf0f1',
      lineColor: '#34495e',
      maxTempCool: '#1565C0',
      minTempCool: '#64B5F6',
      maxTempWarm: '#EF6C00',
      minTempWarm: '#FFB74D',
      warning: '#e74c3c',
    }

    this.ZeroDegreeHeigh = this.canvasHeight - this.temperatureDistance * 5
  }
}

export default Canvas

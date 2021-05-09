class PieChart {
  constructor({ canvas, humility, applicable_date }) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.humility = humility
    this.apllicationData = applicable_date
    this.configure()

    this.drawBoundAndLine()

    this.drawBgCircle({
      startAngle: 0,
      endAngle: Math.PI * 2,
      color: this.color.bgCircle,
    })

    this.drawCircle({
      startAngle: 0,
      endAngle: this.oneAngle * this.humilityPercentage,
      color: this.color.humilityCircle,
    })

    this.drawDetail()
  }

  drawDetail() {
    this.ctx.save()
    this.ctx.fillStyle = this.color.bgCircle
    this.ctx.fillRect(0, 0, 130, 50)
    this.ctx.font = '14px Arial'
    this.ctx.fillStyle = this.color.bgColor
    this.ctx.fillText(`日期：${this.apllicationData}`, 10, 20)
    this.ctx.fillText(`濕度：${this.humility} %`, 10, 40)

    this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
    this.ctx.fillStyle = this.color.textColor
    this.ctx.font = '36px Arial'
    this.ctx.fillText(`${this.humility} %`, -30, 30)
    this.ctx.restore()
  }

  drawCircle({ startAngle, endAngle, color }) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
    this.ctx.rotate(-Math.PI / 2)
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(this.radius, 0)
    this.ctx.arc(0, 0, this.radius, startAngle, endAngle)
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.restore()
  }

  drawBgCircle({ startAngle, endAngle, color }) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
    this.ctx.arc(0, 0, this.radius, startAngle, endAngle)
    this.ctx.fillStyle = color
    this.ctx.fill()
    this.ctx.restore()
  }

  drawBoundAndLine() {
    this.ctx.fillStyle = this.color.bgColor
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  checkPosition() {
    this.ctx.beginPath()
    this.ctx.fillStyle = 'red'
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  configure() {
    this.canvasWidth = 400
    this.canvasHeight = 400
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight

    this.radius = this.canvasWidth / 2 - 50
    this.oneAngle = Math.PI / 180
    this.color = {
      bgColor: '#ecf0f1',
      humilityCircle: '#1ab7ea',
      bgCircle: '#34465d',
      textColor: '#ffffff',
    }
    this.humilityPercentage = this.humility * (360 / 100)
  }
}

export default PieChart

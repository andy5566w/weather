class PieChart {
  constructor({ canvas, humilities = [] }) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.humilities = humilities
    this.configure()

    this.drawBoundAndLine()

    this.drawBgCircle({
      startAngle: 0,
      endAngle: Math.PI * 2,
      color: this.color.bgCircle,
    })

    this.drawCircle({
      startAngle: 0,
      endAngle: this.oneAngle * 190,
      color: this.color.humilityCircle,
    })
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
    this.ctx.fill()
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
    this.canvasWidth = 300
    this.canvasHeight = 300
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight

    this.radius = this.canvasWidth / 2 - 50
    this.oneAngle = Math.PI / 180
    this.color = {
      bgColor: '#ecf0f1',
      humilityCircle: '#1ab7ea',
      bgCircle: '#34465d',
    }
  }
}

export default PieChart

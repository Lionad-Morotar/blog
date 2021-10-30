class Point {
  constructor(x, y, width, color) {
    this.ctx = null
    this.x = x
    this.y = y
    this.width = width
    this.color = color
    this.lines = []
  }
  set(point) {
    if (point.hasOwnProperty('x')) this.x = point.x
    if (point.hasOwnProperty('y')) this.y = point.y
    if (point.hasOwnProperty('width')) this.width = point.width
    if (point.hasOwnProperty('color')) this.color = point.color
    return this
  }
  init(ctx) {
    this.ctx = ctx
    return this
  }
  copy() {
    return new Point(
      this.x,
      this.y,
      this.width,
      this.color
    )
  }
  draw() {
    this.ctx.stroke(this.color)
    this.ctx.strokeWeight(this.width)
    this.ctx.point(this.x, this.y)
    this.lines.map(line => {
      const [x, y, width, color] = line
      this.ctx.stroke(color)
      this.ctx.strokeWeight(width)
      this.ctx.line(this.x, this.y, x, y)
    })
  }
  distance(point) {
    const { x, y } = point
    const dx = this.x - x
    const dy = this.y - y
    return this.ctx.sqrt(dx ** 2 + dy ** 2)
  }
  lineTo(point, width = this.width, color = this.color) {
    const { x, y } = point
    this.lines.push([x, y, width, color])
    return this
  }
  rotate(point, rad) {
    if (!rad) {
      rad = point
      point = { x: 0, y: 0 }
    }
    const ctx = this.ctx
    /* 坐标旋转公式 */
    const dx = this.x - point.x
    const dy = this.y - point.y
    const targetX = point.x + ctx.cos(rad)*dx - ctx.sin(rad)*dy
    const targetY = point.y + ctx.sin(rad)*dx + ctx.cos(rad)*dy
    return this.set({
      x: targetX,
      y: targetY
    })
  }
}

export default {
  Point
}
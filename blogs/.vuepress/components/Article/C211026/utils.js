class Point {
  constructor (x, y, width, color) {
    this.ctx = null
    this.x = x
    this.y = y
    this.width = width
    this.color = color
    this.lines = []
  }
  set (point) {
    if (point.hasOwnProperty('x')) this.x = point.x
    if (point.hasOwnProperty('y')) this.y = point.y
    if (point.hasOwnProperty('width')) this.width = point.width
    if (point.hasOwnProperty('color')) this.color = point.color
    return this
  }
  init (ctx) {
    this.ctx = ctx
    return this
  }
  copy () {
    return new Point(
      this.x,
      this.y,
      this.width,
      this.color
    )
  }
  draw () {
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
  distance (point) {
    const { x, y } = point
    const dx = this.x - x
    const dy = this.y - y
    return this.ctx.sqrt(dx ** 2 + dy ** 2)
  }
  lineTo (point, width = this.width, color = this.color) {
    const { x, y } = point
    this.lines.push([x, y, width, color])
    return this
  }
  rotate (point, rad) {
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

class Vector {
  constructor ({ x = 0, y = 0 } = { x: 0, y: 0 }) {
    this.ctx = Math
    this.x = x
    this.y = y
  }
  init (ctx) {
    this.ctx = ctx
    return this
  }
  copy () {
    return new Vector(this)
  }
  normalize () {
    const m = this.mag()
    if (m !== 0 && m !== 1) {
      return this.div(m)
    } else {
      return this.copy()
    }
  }
  mag (m) {
    return typeof m !== 'undefined'
      ? this.normalize().mult(m)
      : this.ctx.sqrt(this.x ** 2 + this.y ** 2)
  }
  heading () {
    return this.ctx.atan2(this.y, this.x)
  }
  add ({ x, y }) {
    return new Vector({ x: this.x + x, y: this.y + y })
  }
  sub ({ x, y }) {
    return new Vector({ x: this.x - x, y: this.y - y })
  }
  // 数乘
  mult (n) {
    return new Vector({ x: this.x * n, y: this.y * n })
  }
  // 数除
  div (n) {
    return new Vector({ x: this.x / n, y: this.y / n })
  }
  // 点乘
  dot ({ x, y }) {
    return this.x * x + this.y * y
  }
  // 叉乘
  cross ({ x, y }) {
    return this.x * y - this.y * x
  }
  limit (limit) {
    return this.mag(this.ctx.min(this.mag(), limit))
  }
  rotate (rad) {
    const v = new Vector()
    v.x = this.ctx.cos(rad) * this.x - this.ctx.sin(rad) * this.y
    v.y = this.ctx.sin(rad) * this.x + this.ctx.cos(rad) * this.y
    return v
  }
  // 顺时针垂直
  perpendicular () {
    return new Vector({ x: -this.y, y: this.x })
  }
  distance ({ x, y }) {
    const dx = this.x - x
    const dy = this.y - y
    return this.ctx.sqrt(dx ** 2 + dy ** 2)
  }
  angleBetween ({ x, y }) {
    const a = this.copy().normalize()
    const b = new Vector({ x, y }).normalize()
    return this.ctx.acos(a.dot(b))
  }
}

class Particle {
  constructor ({ x, y }) {
    this.ctx = null
    this.position = new Vector({ x, y })
    this.velocity = new Vector()
    this.acceleration = new Vector()
    this.mass = 1
    this.maxSpeed = 1
  }
  init (ctx) {
    this.ctx = ctx
  }
  apply (force) {
    this.acceleration = this.acceleration.add(force.div(this.mass))
  }
  update () {
    this.velocity = this.velocity.add(this.acceleration)
    this.velocity = this.velocity.limit(this.maxSpeed)
    this.position = this.position.add(this.velocity)
    this.acceleration = this.acceleration.mult(0)
  }
  draw () {
    this.ctx.stroke(0)
    this.ctx.strokeWeight(1)
    this.ctx.point(this.position.x, this.position.y)
  }
}

class Attractor {
  constructor ({ x, y, magnitude = 1 }) {
    this.instance = new Particle({ x, y })
    this.magnitude = magnitude
  }
  get position () {
    return this.instance.position
  }
  setMagnitude (m) {
    this.magnitude = m
  }
  force (position) {
    return this.position
      .sub(position)
      .normalize()
      .mult(this.magnitude)
  }
}

export default {
  Point,
  Vector,
  Particle,
  Attractor
}
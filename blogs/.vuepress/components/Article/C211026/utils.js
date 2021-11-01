class Point {
  constructor ({ x, y, width = 1, color = 0 }) {
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
    return new Point(this).init(this.ctx)
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
  /**
   * 距 point 的插值，插值为 t
   */
  lerp (point, t) {
    return new Point({
      x: this.x + (point.x - this.x) * t,
      y: this.y + (point.y - this.y) * t,
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

class Line {
  constructor({ start, end, width = 1, color = 0 }) {
    this.ctx = null
    this.start = start instanceof Point
      ? start
      : new Point(start)
    this.end = end instanceof Point
      ? end
      : new Point(end)
    this.width = width
    this.color = color
  }
  get length () {
    return this.start.distance(this.end)
  }
  init (ctx) {
    this.ctx = ctx
    this.start.init(ctx)
    this.end.init(ctx)
    return this
  }
  rotate (center, rad) {
    this.start.rotate(center, rad)
    this.end.rotate(center, rad)
  }
  lerp (t) {
    return this.start.lerp(this.end, t).init(this.ctx)
  }
  // 与另一线段的交点（忽略端点相交的情况）
  intersect (line) {
    /* 线段交点公式 */
    const a = new Vector({
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y,
    })
    const b = new Vector({
      x: line.end.x - line.start.x,
      y: line.end.y - line.start.y,
    })
    const c = new Vector({
      x: line.start.x - this.start.x,
      y: line.start.y - this.start.y,
    })
    const v1 = a.perpendicular()
    const v2 = b.perpendicular()
    const t = c.dot(v2) / a.dot(v2)
    const u = -c.dot(v1) / b.dot(v1)
    if (t > 0 && t < 1 && u > 0 && u < 1) {
      const v = new Vector({
        x: this.start.x,
        y: this.start.y,
      }).add(a.mult(t))
      return new Point({
        x: v.x,
        y: v.y
      }).init(this.ctx)
    }
    return null
  }
  // 点在线段上的垂足
  perpendicular (point) {
    const a = new Vector({
      x: point.x - this.start.x,
      y: point.y - this.start.y,
    })
    const b = new Vector({
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y,
    })
    const t = a.dot(b) / b.dot(b)
    if (t > 0 && t < 1) {
      const v = new Vector({
        x: this.start.x,
        y: this.start.y
      }).add(b.mult(t))
      return new Point({
        x: v.x,
        y: v.y
      }).init(this.ctxt)
    }
    return null
  }
  draw () {
    this.ctx.stroke(this.color)
    this.ctx.strokeWeight(this.width)
    this.ctx.line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}

export default {
  Point,
  Vector,
  Particle,
  Attractor,
  Line
}
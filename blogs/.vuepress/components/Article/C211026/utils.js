class Point {
  constructor ({ x, y, width = 1, color = 0, ctx }) {
    this.x = x
    this.y = y
    this.width = width
    this.color = color
    this.lines = []
    if (ctx) this.init(ctx)
    else this.ctx = null
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
  get vertexes () {
    return [this]
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
    return this
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
  constructor({ start, end, width = 1, color = 0, ctx }) {
    this.start = start instanceof Point
      ? start
      : new Point(start)
    this.end = end instanceof Point
      ? end
      : new Point(end)
    this.width = width
    this.color = color
    if (ctx) this.init(ctx)
    else this.ctx = null
  }
  get length () {
    return this.start.distance(this.end)
  }
  get vertexes() {
    return [start, end]
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

class Circle {
  constructor({ x, y, center, radius = 1, color = 0, fill = true } = { x: 0, y: 0 }) {
    this.ctx = null
    this.center = center
      ? center instanceof Point
      ? center
      : new Point(center)
      : new Point({ x, y })
    this.radius = radius
    this.color = color
    this.fill = fill
  }
  init(ctx) {
    this.ctx = ctx
    this.center.init(ctx)
    return this
  }
  set (circle) {
    Object.entries(circle).map(([k, v]) => {
      const checked =
        circle.hasOwnProperty(k) &&
        this.hasOwnProperty(k)
      if (checked) {
        this[k] = v
      }
    })
    return this
  }
  get area() {
    return this.radius * this.radius * Math.PI
  }
  cross(circle) {
    const distance = this.center.distance(circle.center)
    return (this.radius + circle.radius) >= distance
  }
  include(circle) {
    const distance = this.center.distance(circle.center)
    return (this.radius - circle.radius) > distance
  }
  intersect(circle) {
    if (this.cross(circle)) {
      const d = this.center.distance(circle.center)
      const k = (this.radius ** 2 + d ** 2 - circle.radius ** 2) / (2 * this.radius * d)
      const angle = this.ctx.acos(k)
      const v1 = new Vector({
        x: circle.center.x - this.center.x,
        y: circle.center.y - this.center.y,
      }).mag(this.radius).rotate(angle).add({ x: this.center.x, y: this.center.y })
      const v2 = new Vector({
        x: circle.center.x - this.center.x,
        y: circle.center.y - this.center.y,
      }).mag(this.radius).rotate(-angle).add({ x: this.center.x, y: this.center.y })
      const p1 = new Point(v1).init(this.ctx)
      const p2 = new Point(v2).init(this.ctx)
      return [p1, p2]
    } else {
      return []
    }
  }
  draw() {
    if (this.fill) {
      this.ctx.noStroke()
      this.ctx.fill(this.color)
    } else {
      this.ctx.stroke(this.color)
      this.ctx.strokeWeight(1)
      this.ctx.noFill()
    }
    this.ctx.ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2)
  }
}

class Triangle {
  constructor({ apexes, color = 0, fill = true, ctx } = { apexes: [] }) {
    this.apexes = apexes.map(apex => {
      if (apex instanceof Point) return apex
      else return new Point(apex)
    })
    this.color = color
    this.fill = fill
    if (ctx) this.init(ctx)
    else this.ctx = null
  }
  init(ctx) {
    this.ctx = ctx
    this.apexes.map(point => point.init(ctx))
    return this
  }
  set(triangle) {
    Object.entries(triangle).map(([k, v]) => {
      const checked =
        triangle.hasOwnProperty(k) &&
        this.hasOwnProperty(k)
      if (checked) {
        this[k] = v
      }
    })
    return this
  }
  get vertexes() {
    return [...this.apexes]
  }
  get lines() {
    const l1 = new Line({ start: this.apexes[0], end: this.apexes[1] })
    const l2 = new Line({ start: this.apexes[1], end: this.apexes[2] })
    const l3 = new Line({ start: this.apexes[2], end: this.apexes[0] })
    l1.init(this.ctx)
    l2.init(this.ctx)
    l3.init(this.ctx)
    return [l1, l2, l3]
  }
  get area() {
    /* 海伦公式求三角形面积 */
    const lens = this.lines.map(l => l.length)
    const p = lens.reduce((h, c) => h + c, 0) / 2
    const area = this.ctx.sqrt(p * (p - lens[0]) * (p - lens[1]) * (p - lens[2]))
    return area
  }
  // 外接圆的中心
  get circumcenter() {
    const [p1, p2, p3] = this.apexes
    const a = new Vector({ x: p2.x - p1.x, y: p2.y - p1.y })
    const b = new Vector({ x: p3.x - p2.x, y: p3.y - p2.y })
    const c = new Vector({ x: p1.x - p3.x, y: p1.y - p3.y })
    const n = a.perpendicular()
    const d = n.mult(b.dot(c) / n.dot(c))
    const p = a.add(d).mult(.5).add(new Vector({ x: p1.x, y: p1.y }))
    return new Point(p).init(this.ctx)
  }
  get circumcircle() {
    const center = this.circumcenter
    const radius = center.distance(this.apexes[0])
    return new Circle({ center, radius }).init(this.ctx)
  }
  lerp(t) {
    const apexes = this.lines.map(line => line.lerp(t))
    return new Triangle({
      ...this,
      apexes,
    })
  }
  draw() {
    if (this.fill) {
      this.ctx.noStroke()
      this.ctx.fill(this.color)
    } else {
      this.ctx.stroke(this.color)
      this.ctx.strokeWeight(1)
      this.ctx.noFill()
    }
    const apexes = this.apexes
    this.ctx.triangle(
      apexes[0].x,
      apexes[0].y,
      apexes[1].x,
      apexes[1].y,
      apexes[2].x,
      apexes[2].y
    )
    return this
  }
}

class Rectangle {
  // Corners，矩形中两个相对的角点，传入的顺序无所谓
  constructor({ corners, color = 0, fill = true, ctx } = { corners: [] }) {
    this.corners = [
      new Point({
        x: Math.min(corners[0].x, corners[1].x),
        y: Math.min(corners[0].y, corners[1].y)
      }),
      new Point({
        x: Math.max(corners[0].x, corners[1].x),
        y: Math.max(corners[0].y, corners[1].y)
      })
    ]
    this.color = color
    this.fill = fill
    if (ctx) this.init(ctx)
    else this.ctx = null
  }
  init(ctx) {
    this.ctx = ctx
    this.corners.map(point => point.init(ctx))
    return this
  }
  set(triangle) {
    Object.entries(triangle).map(([k, v]) => {
      const checked =
        triangle.hasOwnProperty(k) &&
        this.hasOwnProperty(k)
      if (checked) {
        this[k] = v
      }
    })
    return this
  }
  get area () {
    const ctx = this.ctx
    const [p1, p2] = this.corners
    return ctx.abs(p1.x - p2.x) * ctx.abs(p1.y - p2.y)
  }
  get vertexes () {
    const ctx = this.ctx
    const [c1, c2] = this.corners
    return [
      c1.copy(),
      new Point({ x: c2.x, y: c1.y }).init(ctx),
      c2.copy(),
      new Point({ x: c1.x, y: c2.y }).init(ctx),
    ]
  }
  get edges () {
    const ctx = this.ctx
    const [p1, p3, p2, p4] = this.vertexes
    return [
      new Line({ start: p1, end: p3 }).init(ctx),
      new Line({ start: p3, end: p2 }).init(ctx),
      new Line({ start: p2, end: p4 }).init(ctx),
      new Line({ start: p4, end: p1 }).init(ctx),
    ]
  }
  contains (shape) {
    return shape.vertexes.filter(point => {
      const { x, y } = point
      const [p1, p2] = this.corners
      return p1.x < x &&
        p1.y < y &&
        x < p2.x &&
        y < p2.y
    }).length
  }
  containVetexes (shape) {
    return shape.vertexes.filter(point => {
      const { x, y } = point
      const [p1, p2] = this.corners
      return p1.x < x &&
        p1.y < y &&
        x < p2.x &&
        y < p2.y
    })
  }
  intersect (rect) {
    return this.edges.reduce((h, edge) => {
      const points = rect.edges.map(e => e.intersect(edge)).filter(x => x)
      h = h.concat(points)
      return h
    }, [])
  }
  intersectRect (rect) {
    const ctx = this.ctx
    let points = this.intersect(rect)
    points = points.concat(this.containVetexes(rect))
    if (points.length === 0) {
      return null
    } else {
      return new Rectangle({
        ...this,
        corners: [
          {
            x: ctx.min(...points.map(p => p.x)),
            y: ctx.min(...points.map(p => p.y)),
          },
          {
            x: ctx.max(...points.map(p => p.x)),
            y: ctx.max(...points.map(p => p.y)),
          },
        ]
      })
    }
  }
  draw() {
    this.ctx.rectMode(this.ctx.CORNERS)
    if (this.fill) {
      this.ctx.noStroke()
      this.ctx.fill(this.color)
    } else {
      this.ctx.stroke(this.color)
      this.ctx.strokeWeight(1)
      this.ctx.noFill()
    }
    const [p1, p2] = this.corners
    this.ctx.rect(
      p1.x,
      p1.y,
      p2.x,
      p2.y,
    )
    return this
  }
}

export default {
  GOLDEN_RATIO: (Math.sqrt(5) - 1) / 2,
  Point,
  Vector,
  Particle,
  Attractor,
  Line,
  Circle,
  Triangle,
  Rectangle,
}
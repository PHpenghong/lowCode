export class Circle {
  public x: any

  public y: any

  public r: any

  public _mx: any

  public _my: any

  // 创建对象
  // 以一个圆为对象
  // 设置随机的 x，y坐标，r半径，_mx，_my移动的距离
  // this.r是创建圆的半径，参数越大半径越大
  // this._mx,this._my是移动的距离，参数越大移动
  constructor(x: any, y: any) {
    this.x = x
    this.y = y
    this.r = Math.random() * 10
    this._mx = Math.random()
    this._my = Math.random()
  }

  // canvas 画圆和画直线
  // 画圆就是正常的用canvas画一个圆
  // 画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
  drawCircle(ctx: any) {
    ctx.beginPath()
    // arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
    ctx.fill()
  }

  drawLine(ctx: any, _circle: any) {
    const dx = this.x - _circle.x
    const dy = this.y - _circle.y
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      // 开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
      ctx.moveTo(this.x, this.y) // 起始点
      ctx.lineTo(_circle.x, _circle.y) // 终点
      ctx.closePath()
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
      ctx.stroke()
    }
  }

  // 圆圈移动
  // 圆圈移动的距离必须在屏幕范围内
  move(w: any, h: any) {
    this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx
    this._my = this.y < h && this.y > 0 ? this._my : -this._my
    this.x += this._mx / 2
    this.y += this._my / 2
  }
}

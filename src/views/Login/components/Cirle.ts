import { Circle } from './grain'

declare const window: Window & {
  mozRequestAnimationFrame: any
  webkitRequestAnimationFrame: any
  msRequestAnimationFrame: any
}

// 鼠标点画圆闪烁变动
class CurrentCircle extends Circle {
  drawCircle(ctx: any) {
    ctx.beginPath()
    // 注释内容为鼠标焦点的地方圆圈半径变化
    // this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
    this.r = 8
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    // ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
    ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
    ctx.fill()
  }
}

// 更新页面用requestAnimationFrame替代setTimeout
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

export const start = (str: string) => {
  const canvas: any = document.getElementById(`${str}`)
  const ctx: any = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  const w: any = canvas.width
  const h: any = canvas.height
  const circles: any = []
  const current_circle: any = new CurrentCircle(0, 0)

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < circles.length; i++) {
      circles[i].move(w, h)
      circles[i].drawCircle(ctx)
      for (let j = i + 1; j < circles.length; j++) {
        circles[i].drawLine(ctx, circles[j])
      }
    }
    if (current_circle.x) {
      current_circle.drawCircle(ctx)
      for (let k = 1; k < circles.length; k++) {
        current_circle.drawLine(ctx, circles[k])
      }
    }
    requestAnimationFrame(draw)
  }

  const init = () => {
    for (let i = 0; i < 60; i++) {
      circles.push(new Circle(Math.random() * w, Math.random() * h))
    }
    draw()
  }
  // window.addEventListener('load', init, true)
  window.onmousemove = (e: any) => {
    e = e || window.event
    current_circle.x = e.clientX
    current_circle.y = e.clientY
  }
  window.onmouseout = () => {
    current_circle.x = null
    current_circle.y = null
  }

  init()
}

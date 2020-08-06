console.log('Happy birthday!')
const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

// Positive y is down
// Negative y is up
let fWidth = canvas.width
let fHeight = canvas.height
let hWidth = fWidth / 2
const hHeight = fHeight / 2
const grav = -0.2
const drag = 0.95
const particleDrag = 0.99

var fireworkArray = []
var particleArray = []
var i = 0
var oldDate = new Date()
var fireworkInterval = 1000 * randomNum(0, 1)
var fireworkRange = {
  min: 17,
  max: 30
}

// var audio = new Audio('soundEffects/explosion-light.mp3')
// audio.play()

function tick () {
  c.fillStyle = 'rgb(30,30,30)'
  c.fillRect(0, 0, fWidth, fHeight)

  // c.fillStyle = 'rgb(230,230,230)'
  // c.fillText('Happy Birthday', hWidth,100,hWidth)

  c.strokeStyle = 'white'
  for (i = 0; i < fireworkArray.length; i++) {
    const firework = fireworkArray[i]
    firework.update()
    firework.draw()
  }
  for (i = 0; i < particleArray.length; i++) {
    const particle = particleArray[i]
    particle.update()
    particle.draw()
  }

  if (new Date() - oldDate > fireworkInterval) {
    if (fireworkInterval < Math.random() * 1000) {
      fireworkInterval = randomNum(0, fireworkInterval)
      if (fireworkInterval < 1) {
        fireworkInterval = randomNum(0, 1) * 1000
      }
    } else {
      fireworkInterval = randomNum(0, 1) * 1000
    }
    fireworkArray.push(new Firework(randomNum(hWidth - hWidth / 2, hWidth + hWidth / 2), fHeight, 0, -window.innerHeight / randomNum(fireworkRange.min, fireworkRange.max)))
    oldDate = new Date()
  }

  requestAnimationFrame(tick)
}

function Firework (x, y, xVel, yVel) {
  this.x = x
  this.y = y
  this.xVel = xVel
  this.yVel = yVel
  this.r = 5
  this.explosionSpeed = -randomNum(0, 20)
}

Firework.prototype.update = function () {
  this.xVel = this.xVel * drag
  this.yVel = this.yVel * drag - grav
  this.x += this.xVel
  this.y += this.yVel

  if (this.yVel > this.explosionSpeed) {
    this.delete()
  }
}

Firework.prototype.draw = function () {
  c.beginPath()
  c.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0)
  c.stroke()
}
Firework.prototype.delete = function () {
  for (let i = 0; i < 10; i++) {
    let mag = randomNum(5, 8)
    let dir = randomNum(0, 1) * Math.PI * 2

    // const upDir = dir - Math.PI
    // if (upDir > 0) {
    //   let angleKinda
    //   if (upDir < Math.PI / 2) {
    //     angleKinda = upDir
    //   } else {
    //     angleKinda = Math.PI / 2 - (upDir - Math.PI / 2)
    //   }
    //   mag *= 2 * angleKinda
    //   if (Math.random() > 0.1	) {
    //     particleArray.push(new Particles(this.x, this.y, mag * Math.cos(dir), mag * Math.sin(dir)))
    //     // console.log('asdjsd')
    //   }
    // }

    particleArray.push(new Particles(this.x, this.y, mag * Math.cos(dir), mag * Math.sin(dir), this.yVel))
  }
  fireworkArray.splice(i, 1)
  i--
}

function Particles (x, y, xVel, yVel, extraYVel) {
  this.x = x
  this.y = y
  this.xVel = xVel
  this.yVel = yVel + extraYVel
  this.r = 3
}

Particles.prototype.update = function () {
  this.xVel = this.xVel * drag
  this.yVel = this.yVel * drag - grav * 0.5
  this.x += this.xVel
  this.y += this.yVel

  if (this.y > fHeight) {
    this.delete()
  }
}

Particles.prototype.draw = function () {
  c.beginPath()
  c.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0)
  c.stroke()
}
Particles.prototype.delete = function () {
  particleArray.splice(i, 1)
  i--
}

function init () {
  // Create fireworks
  for (let i = 0; i < 30; i++) {
    // -window.innerHeight/12    13       17
    console.log(hWidth)
    fireworkArray[i] = new Firework(randomNum(hWidth - hWidth / 2, hWidth + hWidth / 2), fHeight, 0, -window.innerHeight / randomNum(fireworkRange.min, fireworkRange.max))
  }

  tick()
}

init()

function randomNum (min, max) {
  return min + Math.random() * (max - min)
}

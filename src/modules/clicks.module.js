import { Module } from '../core/module'

export class ClicksModule extends Module {
  static TYPE = 'ClickModule'
  static TEXT = 'Считать клики (за 3 секунды)'

  #clicks
  #timer
  #isRunning
  #timeInterval
  #cb

  constructor() {
    super(ClicksModule.TYPE, ClicksModule.TEXT)

    this.#clicks = 0
    this.#isRunning = false
    this.#timeInterval = 3
  }

  createListener() {
    const cb = () => {
      this.#clicks++
      this.updateClickCounter()
    }

    document.body.addEventListener('click', cb)

    return cb
  }

  createClickCounter() {
    const counterDiv = document.createElement('div')
    counterDiv.id = 'counter'
    counterDiv.style.color = 'blue'
    counterDiv.style.background = 'linear-gradient(90deg, #ff85e4 0%, #229efd 179.25%)'
    counterDiv.style.fontSize = '2rem'
    counterDiv.style.fontWeight = 'bold'
    counterDiv.style.width = '300px'
    counterDiv.style.margin = '5% auto 0'
    counterDiv.style.textAlign = 'center'
    counterDiv.textContent = `Сделано кликов: ${this.#clicks}`

    return counterDiv
  }

  getCounter() {
    return document.body.querySelector('#counter')
  }

  updateClickCounter() {
    const counter = this.getCounter()
    counter.textContent = `Сделано кликов: ${this.#clicks}`
  }

  finish() {
    clearInterval(this.#timer)
    this.#isRunning = false
    this.displayMessage()

    document.body.removeEventListener('click', this.#cb)

    const counter = this.getCounter()
    counter.remove()
  }

  displayMessage() {
    alert(`За 3 секунды было сделано ${this.#clicks} кликов`)
  }

  trigger() {
    this.#clicks = 0
    this.#isRunning = true

    if (this.#isRunning) {
      document.body.append(this.createClickCounter())
    }

    this.#cb = this.createListener()

    let currentTime = this.#timeInterval
    this.#timer = setInterval(() => {
      if (currentTime === 0) {
        this.finish()
      } else {
        currentTime--
      }
    }, 1000)
  }
}

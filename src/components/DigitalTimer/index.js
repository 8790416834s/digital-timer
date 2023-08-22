import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isPlay: false, count: 25, minutes: 25, seconds: 0}

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      this.setState(prevState => ({
        seconds: 59,
        minutes: prevState.minutes - 1,
      }))
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  isPlayButton = () => {
    const {isPlay, timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isPlay) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isPlay: !prevState.isPlay}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState(prevState => ({
      minutes: 25,
      seconds: 0,
      isPlay: !prevState.isPlay,
    }))
  }

  render() {
    const {count, isPlay} = this.state

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="timer-container">
            <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
            {isPlay ? (
              <p className="details">running</p>
            ) : (
              <p className="details">paused</p>
            )}
          </div>
          <div className="icons-container">
            {isPlay ? (
              <div className="column-container">
                <button
                  type="button"
                  className="play-icon-btn"
                  onClick={this.isPlayButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="play-icon"
                  />
                  <p className="bold">Pause</p>
                </button>
              </div>
            ) : (
              <div className="column-container">
                <button
                  type="button"
                  className="play-icon-btn"
                  onClick={this.isPlayButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="play-icon"
                  />
                  <p className="bold">Start</p>
                </button>
              </div>
            )}
            <div className="column-container">
              <button type="button" className="reset-icon-btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-icon"
                  onClick={this.onReset}
                />
                <p className="bold">Reset</p>
              </button>
            </div>
          </div>
          <div className="time-setter-container">
            <p>Set Timer limit</p>
            <div className="button-container">
              <button
                type="button"
                className="minus"
                onClick={this.onDecrement}
                disabled={isPlay}
              >
                -
              </button>
              <p className="number" disabled={isPlay}>
                {count}
              </p>
              <button
                type="button"
                className="plus"
                onClick={this.onIncrement}
                disabled={isPlay}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

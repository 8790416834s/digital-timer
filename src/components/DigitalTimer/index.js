import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isPlay: false, count: 25, minutes: 0, seconds: 0}

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
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
    this.setState({minutes: stringifiedMinutes, seconds: stringifiedSeconds})
  }

  onReset = () => {
    this.setState({count: 25})
  }

  render() {
    const {count, isPlay, minutes, seconds} = this.state

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="timer-container">
            <h1 className="timer">
              {minutes}:{seconds}
            </h1>
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
                    alt="play icon"
                    className="play-icon"
                  />
                </button>
                <p className="bold">Pause</p>
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
                </button>
                <p className="bold">Start</p>
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
              </button>
              <p className="bold">Reset</p>
            </div>
          </div>
          <div className="time-setter-container">
            <p>Set Timer limit</p>
            <div className="button-container">
              <button
                type="button"
                className="minus"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="number">{count}</p>
              <button type="button" className="plus" onClick={this.onIncrement}>
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

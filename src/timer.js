import React from 'react'
import PropTypes from 'prop-types'

const interval = 1000
export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    const currentTime = new Date().getTime()
    this.state = {
      now: this.props.limit,
      currentTime: currentTime,
      endTime: currentTime + this.props.limit * interval,
      isLive: true
    }
    this.timerId = 0
  }

  componentWillMount () {
    this.timerId = setInterval((e) => {
      this.tick()
    }, interval)
  }

  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  componentWillReceiveProps (nextProps) {
  }

  tick () {
    let now = this.state.now - 1
    const currentTime = new Date().getTime()
    this.setState({
      now: now,
      currentTime: currentTime
    })

    if (this.state.endTime - this.state.currentTime < interval) {
      this.setState({isLive: false})
      clearInterval(this.timerId)

      if (this.props.onChange) {
        this.props.onChange({isLive: this.state.isLive})
      }
    }
  }

  reset () {
    const currentTime = new Date().getTime()

    this.setState({
      now: this.props.limit,
      currentTime: currentTime,
      endTime: currentTime + this.props.limit * interval,
      isLive: true
    })

    this.timerId = setInterval((e) => {
      this.tick()
    }, interval)
  }

  getDisp () {
    const s = this.state
    const delta = s.endTime - s.currentTime
    const t = Math.floor(delta / 1000)
    const ss = t % 60
    const m = Math.floor(t / 60)
    const mm = m % 60
    const hh = Math.floor(mm / 60)
    const z = (num) => {
      const s = '00' + String(num)
      return s.substr(s.length - 2, 2)
    }
    return <span>
      {z(hh)}:{z(mm)}:{z(ss)}
    </span>
  }

  render () {
    return (
      <div>{this.getDisp()}</div>
    )
  }
}

Timer.propTypes = {
  limit: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

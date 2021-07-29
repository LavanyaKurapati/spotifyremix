import {Component} from 'react'
import moment from 'moment'
import './index.css'

class TrackDetails extends Component {
  getTimeInMinutes = duration => {
    const min = Math.floor(duration / 1000 / 60)
    const sec = Math.floor((duration / 1000) % 60)
    const minutes = min > 9 ? min : `0${min}`
    const seconds = sec > 9 ? sec : `0${sec}`
    const time = `${minutes}:${seconds}`
    return time
  }

  getAddedYear = added => {
    const addedYear = moment(new Date(added)).format('YYYY-MM-DD')
    return addedYear
  }

  render() {
    const {trackDetails} = this.props
    const {duration, added, track, artist, album} = trackDetails
    const time = this.getTimeInMinutes(duration)
    const addedYear = this.getAddedYear(added)
    return (
      <li className="album-track-container">
        <p className="text">{track}</p>
        <p className="text">{album}</p>
        <p className="text">{time}</p>
        <p className="text">{artist}</p>
        <p className="text">{addedYear}</p>
      </li>
    )
  }
}

export default TrackDetails

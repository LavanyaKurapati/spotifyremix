import {Component} from 'react'
import './index.css'

class AlbumCard extends Component {
  getTimeInMinutes = duration => {
    const min = Math.floor(duration / 1000 / 60)
    const sec = Math.floor((duration / 1000) % 60)
    const minutes = min > 9 ? min : `0${min}`
    const seconds = sec > 9 ? sec : `0${sec}`
    const time = `${minutes}:${seconds}`
    return time
  }

  render() {
    const {album} = this.props
    const {trackName, artist, duration} = album
    const time = this.getTimeInMinutes(duration)
    return (
      <li className="album-track-container">
        <p className="text">{trackName}</p>
        <p className="text">{time}</p>
        <p className="text">{artist}</p>
      </li>
    )
  }
}
export default AlbumCard

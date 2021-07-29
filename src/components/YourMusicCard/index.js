import {Component} from 'react'
import './index.css'

class YourMusicCard extends Component {
  getTimeInMinutes = duration => {
    const min = Math.floor(duration / 1000 / 60)
    const sec = Math.floor((duration / 1000) % 60)
    const minutes = min > 9 ? min : `0${min}`
    const seconds = sec > 9 ? sec : `0${sec}`
    const time = `${minutes}:${seconds}`
    return time
  }

  render() {
    const {specificMusic} = this.props
    const {track, album, artist, imageUrl, duration} = specificMusic
    const time = this.getTimeInMinutes(duration)

    return (
      <li className="music-item">
        <div className="image-item">
          <img src={imageUrl} alt={track} className="music-logo" />
          <div className="text-item">
            <h1 className="music-track-text">{track}</h1>
            <p className="music-artist-text">{`${artist} - ${album}`}</p>
          </div>
        </div>
        <p className="music-time-text">{time}</p>
      </li>
    )
  }
}
export default YourMusicCard

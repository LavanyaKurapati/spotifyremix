import {Component} from 'react'
import Header from '../Header'
import TrackDetails from '../TrackDetails'
import './index.css'

class SpecificPlaylist extends Component {
  state = {playListData: [], imagesData: []}

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  getSpecificPlaylist = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}`,
      options,
    )
    const data = await response.json()
    const imagesData = {
      id: data.id,
      imageUrl: data.images[0].url,
      name: data.name,
      description: data.description,
    }
    const fetchedData = data.tracks.items.map(eachItem => ({
      id: eachItem.track.id,
      track: eachItem.track.name,
      album: eachItem.track.album.name,
      duration: eachItem.track.duration_ms,
      artist: eachItem.track.artists[0].name,
      added: eachItem.added_at,
    }))

    this.setState({playListData: fetchedData, imagesData})
  }

  getBackHome = () => {
    const {history} = this.props
    history.push('/')
  }

  getImageContainer = () => {
    const {imagesData} = this.state
    const {name, imageUrl, description} = imagesData
    return (
      <div className="image-container">
        <img src={imageUrl} alt={name} className="image-pic" />
        <div className="text-container">
          <p className="message">Editor pick</p>
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  getBackContainer = () => (
    <div className="back-container">
      <button type="button" className="button" onClick={this.getBackHome}>
        <img
          src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1626107250/arrow_back_ybrvjf.png"
          alt="back"
          className="back-icon"
        />
      </button>
      <p className="back-text">Back</p>
    </div>
  )

  render() {
    const {playListData} = this.state
    return (
      <div className="header-container">
        <Header />
        <div className="playlist-container">
          {this.getBackContainer()}
          {this.getImageContainer()}
          <div className="track-container">
            <p className="text">Track</p>
            <p className="text">Album</p>
            <p className="text">Time</p>
            <p className="text">Artist</p>
            <p className="text">Added</p>
          </div>
          <hr className="hr-line" />
          <ul>
            {playListData.map(eachItem => (
              <TrackDetails key={eachItem.id} trackDetails={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SpecificPlaylist

import {Component} from 'react'
import Header from '../Header'
import AlbumCard from '../AlbumCard'
import './index.css'

class SpecificAlbum extends Component {
  state = {albumData: [], imageData: []}

  componentDidMount() {
    this.getSpecificAlbum()
  }

  getSpecificAlbum = async () => {
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
      `https://api.spotify.com/v1/albums/${id}`,
      options,
    )
    const data = await response.json()
    const imageData = {
      name: data.name,
      label: data.name,
      imageUrl: data.images[0].url,
    }
    const fetchedData = data.tracks.items.map(eachItem => ({
      id: eachItem.id,
      trackName: eachItem.name,
      artist: eachItem.artists[0].name,
      duration: eachItem.duration_ms,
    }))
    this.setState({albumData: fetchedData, imageData})
  }

  getBackHome = () => {
    const {history} = this.props
    history.push('/')
  }

  getImageContainer = () => {
    const {imageData} = this.state
    const {name, imageUrl, label} = imageData
    return (
      <div className="image-container">
        <img src={imageUrl} alt={name} className="image-pic" />
        <div className="text-container">
          <p className="message">New Releases</p>
          <h1 className="name">{name}</h1>
          <p className="description">{label}</p>
        </div>
      </div>
    )
  }

  render() {
    const {albumData} = this.state

    return (
      <div className="header-container">
        <Header />
        <div className="playlist-container">
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
          {this.getImageContainer()}
          <div className="track-container">
            <p className="text">Track</p>
            <p className="text">Time</p>
            <p className="text">Artist</p>
          </div>
          <hr className="hr-line" />
          <ul>
            {albumData.map(eachItem => (
              <AlbumCard album={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SpecificAlbum

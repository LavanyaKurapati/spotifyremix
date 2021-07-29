import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Playlists extends Component {
  state = {
    myPlaylists: [],
  }

  componentDidMount() {
    this.getPlaylists()
  }

  getPlaylists = async () => {
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const requiredResponse = await fetch(
      'https://api.spotify.com/v1/me',
      options,
    )
    const data = await requiredResponse.json()
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${data.display_name}/playlists?limit=50`,
      options,
    )
    const playlistData = await playlistResponse.json()
    const fetchedData = playlistData.items.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.images[0].url,
      name: eachItem.name,
      total: eachItem.tracks.total,
    }))
    console.log(playlistData)
    this.setState({myPlaylists: fetchedData})
  }

  render() {
    const {myPlaylists} = this.state
    return (
      <div className="header-container">
        <Header />
        <div className="my-playlist-container">
          <h1 className="playlist-heading"> My Playlists</h1>
          <ul className="playlist-list-container">
            {myPlaylists.map(eachItem => (
              <li className="playlist-list-item">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="playlist-pic"
                />
                <h1 className="playlist-name">{eachItem.name}</h1>
                <p className="track-total-text">{`${eachItem.total} tracks`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Playlists

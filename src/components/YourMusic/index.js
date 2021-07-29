import {Component} from 'react'
import Header from '../Header'
import YourMusicCard from '../YourMusicCard'
import './index.css'

class YourMusic extends Component {
  state = {yourMusicData: []}

  componentDidMount() {
    this.getYourMusic()
  }

  getYourMusic = async () => {
    const token = localStorage.getItem('pa_token', '')
    const musicUrl = 'https://api.spotify.com/v1/me/tracks'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const musicResponse = await fetch(musicUrl, options)
    const data = await musicResponse.json()
    const fetchedData = data.items.map(eachItem => ({
      id: eachItem.track.id,
      track: eachItem.track.name,
      duration: eachItem.track.duration_ms,
      artist: eachItem.track.artists[0].name,
      imageUrl: eachItem.track.album.images[0].url,
      album: eachItem.track.album.name,
    }))
    console.log(data)
    console.log(fetchedData)
    this.setState({yourMusicData: fetchedData})
  }

  render() {
    const {yourMusicData} = this.state
    return (
      <div className="header-container">
        <Header />
        <div className="your-music-container">
          <h1 className="your-music-heading">Your Music</h1>
          <ul className="music-container">
            {yourMusicData.map(eachMusic => (
              <YourMusicCard specificMusic={eachMusic} key={eachMusic.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default YourMusic

import {Component} from 'react'
import moment from 'moment'
import Header from '../Header'
import Card from '../Card'
import GenreCard from '../GenreCard'
import NewReleaseCard from '../NewReleaseCard'
import './index.css'

class Home extends Component {
  state = {editorData: [], genresData: [], newReleases: [], isLoading: true}

  componentDidMount() {
    this.getFeaturedPlaylists()
    this.getBrowseCategories()
    this.getNewReleases()
  }

  getFeaturedPlaylists = async () => {
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
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const apiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${data.country}&timestamp=${timestamp}`
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    const firstPartData = {
      message: fetchedData.message,
      cardData: fetchedData.playlists.items.map(item => ({
        name: item.name,
        id: item.id,
        imageUrl: item.images[0].url,
      })),
    }

    this.setState({editorData: firstPartData, isLoading: false})
  }

  getBrowseCategories = async () => {
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const categoriesUrl = 'https://api.spotify.com/v1/browse/categories'
    const categoriesResponse = await fetch(categoriesUrl, options)
    const categories = await categoriesResponse.json()
    const categoriesData = categories.categories.items.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.icons[0].url,
    }))
    this.setState({genresData: categoriesData})
  }

  getNewReleases = async () => {
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
    const newReleaseUrl = `https://api.spotify.com/v1/browse/new-releases?country=${data.country}`
    const response = await fetch(newReleaseUrl, options)
    const newReleaseResponse = await response.json()
    const newReleaseData = newReleaseResponse.albums.items.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.images[0].url,
    }))

    this.setState({newReleases: newReleaseData})
  }

  renderLoader = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625937521/music_nx2ja9.png"
        alt="music"
        className="load-logo"
      />
      <h1 className="load-text">Loading...</h1>
    </div>
  )

  renderHomeDetails = () => {
    const {editorData, genresData, newReleases} = this.state
    const {message, cardData} = editorData

    return (
      <div className="header-container">
        <Header />
        <div className="home-container">
          <h1 className="message-heading">{message}</h1>
          <ul className="cards-container">
            {cardData.map(eachItem => (
              <Card cardDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
          <h1 className="message-heading genre-heading">Genres & Moods</h1>
          <ul className="cards-container">
            {genresData.map(eachGenre => (
              <GenreCard genre={eachGenre} key={eachGenre.id} />
            ))}
          </ul>
          <h1 className="message-heading genre-heading">New Releases</h1>
          <ul className="cards-container">
            {newReleases.map(eachRelease => (
              <NewReleaseCard newRelease={eachRelease} key={eachRelease.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        {isLoading ? this.renderLoader() : this.renderHomeDetails()}
      </div>
    )
  }
}

export default Home

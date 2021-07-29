import {Component} from 'react'
import Header from '../Header'
import './index.css'

class SpecificCategory extends Component {
  state = {categoryData: []}

  componentDidMount() {
    this.getCategories()
  }

  getCategories = async () => {
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
    const requiredResponse = await fetch(
      'https://api.spotify.com/v1/me',
      options,
    )
    const requiredData = await requiredResponse.json()

    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${requiredData.country}`,
      options,
    )
    const data = await response.json()
    const fetchedData = data.playlists.items.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.images[0].url,
    }))
    console.log(fetchedData)
    this.setState({categoryData: fetchedData})
  }

  getBackHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {categoryData} = this.state
    console.log(categoryData)

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
          <ul className="category-list-container">
            {categoryData.map(eachCategory => (
              <li className="category-list-item">
                <img
                  src={eachCategory.imageUrl}
                  alt={eachCategory.name}
                  className="category-image"
                />
                <p className="category-text">{eachCategory.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SpecificCategory

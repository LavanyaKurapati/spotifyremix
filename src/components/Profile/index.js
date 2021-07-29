import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Profile extends Component {
  state = {userData: []}

  componentDidMount() {
    this.getUserInformation()
  }

  getUserInformation = async () => {
    const token = localStorage.getItem('pa_token', '')

    const apiUrl = 'https://api.spotify.com/v1/me'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      displayName: data.display_name,
      followers: data.followers.total,
    }
    this.setState({userData: updatedData})
  }

  clickLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  getProfileDetails = () => {
    const {userData} = this.state
    const {displayName, followers} = userData
    return (
      <div className="profile-container">
        <img
          src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625985144/person_tgyreh.png"
          alt="profile-icon"
          className="profile-image"
        />
        <h1 className="profile-name">{displayName}</h1>
        <div className="followers-section">
          <div className="sub-section">
            <p className="followers-numbers">{followers}</p>
            <p className="followers-text">FOLLOWERS</p>
          </div>
        </div>
        <button
          type="button"
          className="logout-button"
          onClick={this.clickLogout}
        >
          LOGOUT
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        {this.getProfileDetails()}
      </div>
    )
  }
}

export default Profile

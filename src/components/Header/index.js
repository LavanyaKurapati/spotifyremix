import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-container">
    <img
      src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625937521/music_nx2ja9.png"
      alt="music"
      className="header-logo"
    />
    <div className="nav-items">
      <Link to="/profile" className="link-item">
        <li className="list-item">
          <img
            src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625985144/person_tgyreh.png"
            alt="profile"
            className="nav-logo"
          />
          <p className="header-text">Profile</p>
        </li>
      </Link>
      <Link to="/" className="link-item">
        <li className="list-item">
          <img
            src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625985523/home_zs7ky6.png"
            alt="home"
            className="nav-logo"
          />
          <p className="header-text">Home</p>
        </li>
      </Link>
      <Link to="/your-music" className="link-item">
        <li className="list-item">
          <img
            src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625985385/Solid_hdz2vm.png"
            alt="music"
            className="nav-logo"
          />
          <p className="header-text">Your Music</p>
        </li>
      </Link>
      <Link to="/playlists" className="link-item">
        <li className="list-item">
          <img
            src="https://res.cloudinary.com/drvhu0pdj/image/upload/v1625984421/Vector_ekff3y.png"
            alt="playlist"
            className="nav-logo"
          />
          <p className="header-text">Playlists</p>
        </li>
      </Link>
    </div>
  </nav>
)
export default withRouter(Header)

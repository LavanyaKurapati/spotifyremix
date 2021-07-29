import {Link} from 'react-router-dom'
import './index.css'

const Card = props => {
  const {cardDetails} = props
  const {imageUrl, id, name} = cardDetails

  return (
    <Link to={`playlists/${id}`} className="link-item">
      <li className="card-list-container">
        <img src={imageUrl} alt={name} className="card-image" />
        <p className="card-text">{name}</p>
      </li>
    </Link>
  )
}
export default Card

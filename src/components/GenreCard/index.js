import {Link} from 'react-router-dom'
import './index.css'

const GenreCard = props => {
  const {genre} = props
  const {name, id, imageUrl} = genre
  return (
    <Link to={`/genre/${id}`} className="link-item">
      <li className="card-list-container">
        <img src={imageUrl} alt={name} className="card-image" />
        <p className="card-text">{name}</p>
      </li>
    </Link>
  )
}
export default GenreCard

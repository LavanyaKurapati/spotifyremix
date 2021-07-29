import {Link} from 'react-router-dom'
import './index.css'

const NewReleaseCard = props => {
  const {newRelease} = props
  const {imageUrl, id, name} = newRelease
  return (
    <Link to={`/album/${id}`} className="link-item">
      <li className="card-list-container">
        <img src={imageUrl} alt={name} className="card-image" />
      </li>
    </Link>
  )
}

export default NewReleaseCard

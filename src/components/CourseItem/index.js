import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseItemDetails} = props
  const {name, logoUrl, id} = courseItemDetails

  return (
    <Link to={`courses/${id}`} className="listItem">
      <li className="listItem">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem

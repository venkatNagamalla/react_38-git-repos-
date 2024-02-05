// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  console.log(repoDetails)
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repoDetails
  return (
    <li className="list-container">
      <img className="avatar-img" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <ul className="details-container">
        <li className="item">
          <img
            className="side-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="items-count">{starsCount} stars</p>
        </li>
        <li className="item">
          <img
            className="side-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
          />
          <p className="items-count">{forksCount} forks</p>
        </li>
        <li className="item">
          <img
            className="side-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
          />
          <p className="items-count">{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}

export default RepositoryItem

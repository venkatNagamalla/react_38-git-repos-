import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeRepos: [],
    activeLanguage: languageFiltersData[0].id,
  }

  getActiveFilter = lang => {
    this.setState({activeLanguage: lang}, this.getRepository)
  }

  componentDidMount = () => {
    this.getRepository()
  }

  getRepository = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        activeRepos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 502) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {activeRepos} = this.state
    return (
      <ul className="repos-container">
        {activeRepos.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <p className="err-msg">Something Went Wrong</p>
    </>
  )

  renderSwitchStatements = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepos()
      case apiStatusConstants.failure:
        return this.renderFailure()

      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state

    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languages-filter-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              getActiveFilter={this.getActiveFilter}
              langDetails={eachLang}
              key={eachLang.id}
              isActive={eachLang.id === activeLanguage}
            />
          ))}
        </ul>
        {this.renderSwitchStatements()}
      </div>
    )
  }
}

export default GithubPopularRepos

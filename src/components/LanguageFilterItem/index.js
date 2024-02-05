// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {langDetails, getActiveFilter, isActive} = props
  const {id, language} = langDetails

  const filterStatus = isActive ? 'filter-button active' : 'filter-button'

  const onClickFilter = () => {
    getActiveFilter(id)
  }

  return (
    <li>
      <button onClick={onClickFilter} type="button" className={filterStatus}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

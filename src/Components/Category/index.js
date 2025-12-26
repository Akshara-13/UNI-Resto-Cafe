import './index.css'

const Category = props => {
  const {details, category, onClickCategory} = props
  const onClickBtn = () => {
    onClickCategory(details.menuCategoryId)
  }
  let classnameOfBtn = ''
  if (details.menuCategory === category) {
    classnameOfBtn = 'selected-category-btn'
  } else {
    classnameOfBtn = 'category-btn'
  }
  return (
    <li className="category-list-element">
      <button type="button" onClick={onClickBtn} className={classnameOfBtn}>
        {details.menuCategory}
      </button>
    </li>
  )
}
export default Category

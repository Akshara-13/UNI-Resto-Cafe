import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Category from '../Category'

import Fooditem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
    selectedCategory: '',
  }

  componentDidMount() {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.getList()
  }

  getList = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const updattedData = {
      branchName: data[0].branch_name,
      nextUrl: data[0].nexturl,
      restaurantId: data[0].restaurant_id,
      restaurantName: data[0].restaurant_name,
      restaurantImage: data[0].restaurant_image,
      tableId: data[0].table_id,
      tableMenuList: data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        categoryDishes: each.category_dishes.map(eachDish => ({
          addonCat: eachDish.addonCat,
          dishName: eachDish.dish_name,
          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishImage: eachDish.dish_image,
          dishCalories: eachDish.dish_calories,
          dishAvailability: eachDish.dish_Availability,
          dishPrice: eachDish.dish_price,
          dishType: eachDish.dish_type,
          dishId: eachDish.dish_id,
          nextUrl: eachDish.nexturl,
          count: 0,
        })),
        menuCategoryId: each.menu_category_id,
        nexturl: each.nexturl,
      })),
      tableName: data[0].table_name,
    }
    if (response.ok === true) {
      this.setState({
        list: updattedData,
        apiStatus: apiStatusConstants.success,
        selectedCategory: updattedData.tableMenuList[0].menuCategory,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickFailureBtn = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress}, this.getList)
  }

  onFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
      />
      <h1 className="failure-heading"> Something went wrong try again</h1>
      <button className="failure-button" onClick={this.onClickFailureBtn}>
        Retry
      </button>
    </div>
  )

  onLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickCategory = id => {
    const {list} = this.state
    const data = list.tableMenuList.filter(each => each.menuCategoryId === id)
    this.setState({selectedCategory: data[0].menuCategory})
  }

  onClickIncrease = id => {
    const {list, selectedCategory} = this.state
    const data = {
      ...list,
      tableMenuList: list.tableMenuList.map(each => {
        if (each.menuCategory === selectedCategory) {
          return {
            ...each,
            categoryDishes: each.categoryDishes.map(eachDish => {
              if (eachDish.dishId === id) {
                return {
                  ...eachDish,
                  count: eachDish.count + 1,
                }
              }
              return eachDish
            }),
          }
        }
        return each
      }),
    }
    this.setState({list: data})
  }

  onClickDec = id => {
    const {list, selectedCategory} = this.state
    const filteredlist = list.tableMenuList.filter(
      each => each.menuCategory === selectedCategory,
    )
    const dataList = filteredlist[0].categoryDishes.filter(
      each => each.dishId === id,
    )
    if (dataList[0].count > 0) {
      const data = {
        ...list,
        tableMenuList: list.tableMenuList.map(each => {
          if (each.menuCategory === selectedCategory) {
            return {
              ...each,
              categoryDishes: each.categoryDishes.map(eachDish => {
                if (eachDish.dishId === id) {
                  return {
                    ...eachDish,
                    count: eachDish.count - 1,
                  }
                }
                return eachDish
              }),
            }
          }
          return each
        }),
      }
      this.setState({list: data})
    }
  }

  onSuccesView = () => {
    const {list, selectedCategory} = this.state
    const filteredData = list.tableMenuList.filter(
      each => each.menuCategory === selectedCategory,
    )
    return (
      <div className="home-container">
        <Header name={list.restaurantName} />
        <div className="success-container">
          <ul className="category-list-container">
            {list.tableMenuList.map(each => (
              <Category
                key={each.menuCategoryId}
                details={each}
                category={selectedCategory}
                onClickCategory={this.onClickCategory}
              />
            ))}
          </ul>
          <ul className="items-container">
            {filteredData[0].categoryDishes.map(each => (
              <Fooditem
                key={each.dishId}
                details={each}
                onClickIncrease={this.onClickIncrease}
                onClickDec={this.onClickDec}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  apiResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.onLoadingView()
      case apiStatusConstants.success:
        return this.onSuccesView()
      case apiStatusConstants.failure:
        return this.onFailureView()
      default:
        return null
    }
  }

  render() {
    const {list} = this.state
    return <>{this.apiResult()}</>
  }
}
export default Home

import {Component} from 'react'

import {Route, Switch, BrowserRouter} from 'react-router-dom'

import Home from './Components/Home'

import Context from './Components/Context'

import './App.css'

class App extends Component {
  state = {cartList: []}

  incBtn = details => {
    const {cartList} = this.state
    if (cartList.length === 0) {
      const data = {
        ...details,
        count: details.count + 1,
      }

      this.setState({cartList: [data]})
    } else {
      const filteredData = cartList.filter(
        each => each.dishId === details.dishId,
      )
      if (filteredData.length === 0) {
        const data = {
          ...details,
          count: details.count + 1,
        }

        this.setState(prevState => ({cartList: [...prevState.cartList, data]}))
      } else {
        const updatedData = cartList.map(each => {
          if (each.dishId === details.dishId) {
            return {
              ...each,
              count: details.count + 1,
            }
          }
          return each
        })
        this.setState({cartList: updatedData})
      }
    }
  }

  decBtn = details => {
    const {cartList} = this.state
    if (cartList.length > 0) {
      const filteredData = cartList.filter(
        each => each.dishId === details.dishId,
      )
      const updatedData = cartList.map(each => {
        if (each.dishId === details.dishId) {
          return {
            ...each,
            count: details.count > 0 ? details.count - 1 : 0,
          }
        }
        return each
      })
      this.setState({cartList: updatedData})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <Context.Provider
        value={{cartList, incBtn: this.incBtn, decBtn: this.decBtn}}
      >
        <BrowserRouter>
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    )
  }
}
export default App

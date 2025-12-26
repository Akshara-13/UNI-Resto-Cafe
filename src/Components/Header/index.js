import {FiShoppingCart} from 'react-icons/fi'

import {Link} from 'react-router-dom'

import Context from '../Context'

import './index.css'

const Header = props => {
  const {name} = props
  return (
    <Context.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="header-container">
            <Link to="/">
              <h1 className="header-heading">{name}</h1>
            </Link>
            <div className="header-order-container">
              <p className="header-paragraph">My Orders</p>
              <div className="cart-container">
                <FiShoppingCart
                  style={{
                    color: 'black',
                    height: '3.5vh',
                    fontSize: '35px',
                    marginRight: '0.5vw',
                  }}
                />
                <div className="count-paragraph">
                  <p>{cartList.reduce((acc, each) => acc + each.count, 0)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}
export default Header

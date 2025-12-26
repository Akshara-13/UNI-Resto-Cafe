import {Component} from 'react'

import Context from '../Context'

import './index.css'

const FoodItem = props => {
  const {details, onClickIncrease, onClickDec} = props
  return (
    <Context.Consumer>
      {value => {
        const {incBtn, decBtn} = value
        const onClickInc = () => {
          incBtn(details)
          onClickIncrease(details.dishId)
        }
        const onClickSub = () => {
          decBtn(details)
          onClickDec(details.dishId)
        }
        return (
          <li className="food-item-list">
            <div className="food-item-details">
              <div>
                <h1 className="food-item-heading">{details.dishName}</h1>
                <p
                  className="food-item-details-paragraph"
                  style={{color: '#645D5D', fontWeight: 'bold'}}
                >
                  {details.dishCurrency} {details.dishPrice}
                </p>
                <p className="food-item-details-paragraph">
                  {details.dishDescription}
                </p>
                {details.dishAvailability === false ? (
                  <p className="food-item-details-paragraph">Not available</p>
                ) : (
                  <div className="buttons-container">
                    <button type="button" className="btn" onClick={onClickSub}>
                      -
                    </button>
                    <p
                      className="food-item-details-paragraph"
                      style={{color: '#E8E8E8'}}
                    >
                      {details.count}
                    </p>
                    <button type="button" className="btn" onClick={onClickInc}>
                      +
                    </button>
                  </div>
                )}
                {details.addonCat.length > 0 && (
                  <p
                    className="food-item-details-paragraph"
                    style={{color: '#5A55D3'}}
                  >
                    Customizations available
                  </p>
                )}
              </div>
            </div>
            <p
              className="food-item-details-paragraph"
              style={{color: '#f09c1f'}}
            >
              {details.dishCalories} calories
            </p>
            <img
              src={details.dishImage}
              className="food-item-image"
              alt={details.dishName}
            />
          </li>
        )
      }}
    </Context.Consumer>
  )
}

export default FoodItem

import React, { Component } from 'react'
import SmallCartItem from './smallCartItem'
import PriceTag from './priceTag'
import CartContext from '../context/cartContext'
import styles from './styles/navbarIcons.scss'

class NavbarIcons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencies: this.props.currencies
        }
    }

    render() {
        console.log(this.context.items)
        return (
            <div className='navbarIcons'>
                <div className='currencySelector'>
                    <button className='currencySelectorButton'>
                        <div>
                            {this.context.currency}
                            <img src='/dropdown-x512.svg' alt='dropdown' height='10px' />
                        </div>
                    </button>
                    <div className='currencySelectorContent'>
                        {
                            this.state.currencies.map(currency =>
                                <React.Fragment key={currency.symbol}>
                                    <input
                                        type='radio'
                                        name='currency'
                                        id={currency.symbol}
                                        onChange={() => this.context.setCurrency(currency.symbol)}
                                        checked={currency.symbol === this.context.currency}
                                    />
                                    <label htmlFor={currency.symbol}>
                                        {currency.symbol} {currency.label}
                                    </label>
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
                <div className='navbarCart'>
                    <input
                        type='checkbox' 
                        id='cart' 
                        onClick={this.context.toggleDimm} 
                    />
                    <label htmlFor='cart'>
                        <img
                            src='/shopping-cart-x512.svg'
                            alt='shopping cart'
                        />
                        <div>
                            {
                                this.context.totalItemCount > 0 ?
                                    <div className='navbarCartTotalItemCount'>
                                        <span>
                                            {this.context.totalItemCount}
                                        </span>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </label>


                    <div className='navbarCartInfo'>
                        <div className='navbarCartTitle'>
                            My bag, {this.context.totalItemCount} items
                        </div>

                        <div className='navbarCartSmallItems noScrollBar'>
                            <>
                                {
                                    this.context.items && this.context.items.length !== 0 ?
                                        this.context.items.map((item, i) =>
                                            <React.Fragment key={item.itemUUID}>
                                                <SmallCartItem
                                                    item={item.itemInfo} 
                                                    selectedAttrs={item.selectedAttrs} 
                                                    count={item.count} 
                                                    order={i} 
                                                />
                                            </React.Fragment>
                                        )
                                        :
                                        <div className='cartItemPlaceholder'>
                                            <p> No Items <br></br> ¯\_(ツ)_/¯ </p>
                                        </div>
                                }
                            </>
                        </div>

                        <div className='navbarCartPricing'>
                            <h3 className='navbarCartPricingTag'>
                                Total
                            </h3>
                            <h3 className='navbarCartPricingAmount'>
                                {
                                    this.context.totalItemPrices ?
                                        <PriceTag prices={this.context.totalItemPrices} />
                                        :
                                        null
                                }
                            </h3>
                        </div>

                        <div className='navbarCartButtons'>
                            <a href='/cart'> <button className='navbarCartBagButton'>VIEW BAG</button> </a>
                            <button className='navbarCartCheckOutButton'>CHECK OUT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NavbarIcons.contextType = CartContext

export default NavbarIcons
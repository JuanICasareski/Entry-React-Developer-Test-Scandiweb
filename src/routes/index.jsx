import React, { Component } from 'react'
import CartContext from '../context/cartContext'
import styles from '../components/styles/index.scss'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null
        }
    }

    componentDidMount() {
        const query = `
            query {
                categories {
                    name
                    products {
                        id
                        name
                        brand
                        inStock
                        gallery
                        prices {
                            currency {
                                symbol  
                            }
                            amount
                        }
                    }
                }
            }           
        `
        fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            this.setState({items: data.data.categories})
        })
    }
    render() {
        return (
            <div style={{
                width: '1238px',
                position: 'relative',
                margin: '0 auto'    
                }}
            >
                {
                    this.state.items?
                        this.state.items.map(category =>
                            category.name == this.context.currentCategory?
                                <div className='indexView'>
                                    {
                                        category.products.map(product => 
                                            <div className='productIndexView' 
                                                style={{
                                                width: '386px',
                                                height: '444px',
                                                paddingTop: '16px'
                                                }}
                                            >
                                                <div style={{
                                                    height: '330px',
                                                    width: '386px',
                                                    position: 'relative'
                                                    }}
                                                >
                                                    <img src={product.gallery[0]}
                                                        className='centerImage' 
                                                        style={{
                                                            maxHeight: '330px',
                                                            maxWidth: '354px'
                                                        }}
                                                    />   
                                                </div>
                                                <div style={{
                                                    marginLeft: '16px',
                                                    marginTop: '35px'
                                                    }}
                                                >
                                                    <h3 className='productIndexViewName' style={{marginBottom: 0}}>
                                                        {product.brand} {product.name}
                                                    </h3>
                                                    <h4 className='productIndexViewPricing' style={{marginTop: '2px'}}>
                                                        {product.prices[0].currency.symbol}{product.prices[0].amount}
                                                    </h4>
                                                </div>
                                            </div>     
                                        )                               
                                    }
                                </div>
                            : null
                        )
                    : null
                }
            </div>
        )
    }
}

Index.contextType = CartContext

export default Index
import React, { Component } from 'react'
import styles from './styles/attributeButton.scss'

class AttributeRadioButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
            displayValue: props.attr.displayValue, 
            value: props.attr.value,
            id: props.attr.id
        }
    }
    // props.type = null
    render = () => {
        if (this.state.type == 'swatch') {
            return (
                <label className='swatchButton'>
                    <input type='radio' name={this.state.id} required></input>
                    <span style={{
                            height: '25px',
                            width: '25px',
                            background : this.state.displayValue,
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '5px'
                            }}
                    >
                    </span>
                </label>
            )
        }
        else {   
            return(
                <label className='attributeButton'>
                    <input type='radio' name={this.state.id} required></input>
                    <button 
                        style={{marginRight: '5px', marginTop: '0'}} 
                    >
                        {this.state.value}
                    </button>
                </label>
            )
        }
    }

}

export default AttributeRadioButton
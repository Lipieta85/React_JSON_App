import React, { Component } from 'react'
import './Cockpit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'



class Cockpit extends Component {

    render() {
        return (
            <div className='addUserBtn' >
                <button onClick={() => {
                    this.props.toggled();
                    this.props.toggledButton()
                }}
                    disabled={this.props.disabled} ><FontAwesomeIcon icon={faPlusCircle} /> <span>Add user</span> </button>
            </div>
        )
    }
}

export default Cockpit
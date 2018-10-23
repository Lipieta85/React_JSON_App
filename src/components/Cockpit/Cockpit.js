import React from 'react'
import './Cockpit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Cockpit = (props) => {
    return (
        <div className='addUserBtn' >
            <button onClick={() => {
                props.toggled();
                props.toggledButton()
            }}
                disabled={props.disabled} ><FontAwesomeIcon icon={faPlusCircle} /> <span>Add user</span> </button>
        </div>
    )
}

export default Cockpit
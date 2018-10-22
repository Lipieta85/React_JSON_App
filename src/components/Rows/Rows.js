import React from 'react';
import './Rows.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const rows = (props) => {
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td><button className='deleteButton' onClick={props.delete}><FontAwesomeIcon icon={faTimes} /></button></td>
        </tr>
    )
}

export default rows;
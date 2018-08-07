import React from 'react';
import './cell.css';



const Cell = props => {

    return (
        <img 
            className={props.className}
            data-img-id={props.imgId}
            data-row={props.row}
            src={props.src}
            alt={`ID number: ${props.id}`}
            onMouseOver={e => props.fx(e)}
        />
    )
}

export default Cell;
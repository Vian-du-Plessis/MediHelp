/* React */
import React, {useState, useEffect} from 'react';

/* Styling */
import styles from './Button.module.scss'

const Button = ( props ) => {
    return (
        <button className={ props.className ? props.className : '' }    
            type={ props.type }
            onClick={ props.onClick }
        >
            { props.label || 'No Label' }
        </button>
    );
};

export default Button;
import React, { useState, useEffect } from 'react';
import styles from './Button.module.scss'

const Button = ( props ) => {
    let iconName = props.icon || '';
    let iconNameLength = iconName.length;
    
    const [buttonActive, setButtonActive] = useState( true );
    useEffect(() => {
        setButtonActive( 
            props.state != undefined 
            ? props.state 
            : true 
        );
    });
    

    return (
        <button
            className={`
                ${ props.className ? props.className : '' } 
                ${ 
                    buttonActive 
                    ? styles.active__button 
                    : styles.not__active__button 
                }    
            `}
            type={ props.type || 'submit' }
            onClick={ props.onClick }
        >
            { props.label || 'No Label'}
            { 
                iconNameLength > 1 
                ? <img src={ require( `../../Assets/SVG/${ iconName }.svg` )}/> 
                : '' 
            }
        </button>
    );
};

export default Button;
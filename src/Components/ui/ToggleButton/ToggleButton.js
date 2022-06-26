import React, { forwardRef } from 'react';

import styles from './ToggleButton.module.scss';
import './ToggleButton.scss';



const ToggleButton = (props) => {

    const toggleActiveButton = ( e ) => {
        console.log(e.currentTarget.innerText); // Gets the value
        if( document.querySelector('.activeToggle') ) {
            const elements = document.querySelector( '.activeToggle' );
            elements.classList.remove( 'activeToggle' );
        }
    
        e.currentTarget.classList.add( 'activeToggle' );
    }
    return (
        <div className={` 
            ${ styles.bigContainer } 
            ${ props.className ? props.className : '' }
        `}>
            <p>{ props.label }</p>
            <div className={` 
                ${ styles.outerContainer } 
                ${ props.className ? props.className : '' }
            `}>
                <div
                    className={` 
                        ${ styles.leftButton } 
                        activeToggle
                        `}
                        onClick={ props.onClick }
                >
                    <p>{ props.leftButton }</p>
                </div>
                <div 
                    className={ styles.rightButton }
                    onClick={ props.onClick }
                >
                    <p>{ props.rightButton }</p>
                </div>
            </div>
        </div>
    );
};

export default ToggleButton;
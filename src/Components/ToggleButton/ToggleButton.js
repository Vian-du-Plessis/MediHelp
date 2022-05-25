import React from 'react';

import styles from './ToggleButton.module.scss';
import './ToggleButton.scss';

const toggleActiveButton = ( e ) => {
    console.log(e.currentTarget.innerText); // Gets the value
    if( document.querySelector('.activeToggle') ) {
        const elements = document.querySelector( '.activeToggle' );
        elements.classList.remove( 'activeToggle' );
    }

    e.currentTarget.classList.add( 'activeToggle' );
}

const ToggleButton = ( props ) => {
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
                    onClick={ (e) => toggleActiveButton(e) }
                >
                    <p>{ props.leftButton }</p>
                </div>
                <div 
                    className={ styles.rightButton }
                    onClick={ (e) => toggleActiveButton(e) }
                >
                    <p>{ props.rightButton }</p>
                </div>
            </div>
        </div>
    );
};

export default ToggleButton;
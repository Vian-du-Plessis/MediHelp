import React, { forwardRef, useEffect, useState } from 'react';

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

    const [ activeClass, setActiveClass] = useState('');
    const [ activeValueOne, setActiveValueOne ] = useState('');
    const [ activeValueTwo, setActiveValueTwo ] = useState('');
    useEffect(() => {
        setActiveClass(props.active);
        console.log("🚀 ~ file: ToggleButton.js ~ line 25 ~ useEffect ~ props.active", props.active)
        setActiveValueOne(props.activeOne);
        console.log("🚀 ~ file: ToggleButton.js ~ line 27 ~ useEffect ~ props.activeOne", props.activeOne)
        setActiveValueTwo(props.activeTwo);
        console.log("🚀 ~ file: ToggleButton.js ~ line 29 ~ useEffect ~ props.activeTwo", props.activeTwo)
    }, [props.active, props.activeOne, props.activeTwo])

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
                            ${props.active == props.activeTwo ? 'activeToggle' : ''}
                        `}
                        onClick={ props.onClick }
                >
                    <p>{ props.leftButton }</p>
                </div>
                <div 
                    // className={ styles.rightButton }
                    className={`
                        ${styles.rightButton} 
                        ${props.active == props.activeOne ? 'activeToggle' : ''}
                    `}
                    onClick={ props.onClick }
                >
                    <p>{ props.rightButton }</p>
                </div>
            </div>
        </div>
    );
};

export default ToggleButton;
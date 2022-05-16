import React, { useState, useEffect } from 'react';
import styles from './Input.module.scss';

const Input = ( props ) => {

    const [showInputIcon, setInputIcon] = useState( false );

    useEffect(() => {
        setInputIcon( 
            props.iconName != undefined 
            ? props.iconName 
            : false 
        );
    });

    return (
        <div 
            className={ 
                props.className 
                ? props.className 
                : styles.container
            }
        >
            <p className= { styles.label }>
                { props.label || 'No Label' }
            </p>
            <div className={ styles.input__container }>
                { showInputIcon &&
                    <img 
                        className={`
                            ${ styles.icon__img } 
                            ${ props.iconSide == 'Right' ? styles.icon__right : '' }
                            ${ props.iconSide == 'Left' ? styles.icon__left : '' }
                        `}
                        onClick={ props.iconClick }
                        src={ require( `../../Assets/SVG/${ props.iconName }.svg` ) }
                    />
                }
                <input
                    className={`
                        ${ props.iconSide == 'Right' ? styles.icon__right__style : '' }
                        ${ props.iconSide == 'Left' ? styles.icon__left__style : '' }
                    `}
                    name={ props.name || '' }
                    type={ props.type || 'text' }
                    placeholder={ props.placeholder || ''}
                />
            </div>
            <div className={ styles.error__container }>
                <p className= { styles.error }>
                    { props.errorMessage || '' }
                </p>
            </div>
        </div>
    );
};

export default Input;
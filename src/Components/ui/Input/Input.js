/* React */
import React, { forwardRef } from 'react';

/* Styling */
import styles from './Input.module.scss';

const Input = forwardRef((props, ref) => {

    return (
        <div className={` 
            ${ styles.container }
            ${ props.className ? props.className : '' } 
        `}>
            <p className={ styles[ 'container__textParagraph--label' ] }>
                { props.label || 'No Label' }
            </p>

            <div className={ styles.container__inputs }>
                {
                    props.iconLeft != undefined 
                    && <img 
                        className={`
                            ${ styles.container__inputs__imageElement } 
                            ${ styles[ 'container__inputs__imageElement--left' ] } 
                        `}
                        onClick={ props.iconClick }
                        src={ require( `../../../Assets/SVG/${ props.iconLeft }.svg` ) }
                    />
                }
                <input
                    ref={ ref }
                    name={ props.name }
                    type={ props.type }
                    placeholder={ props.placeholder }
                    onChange={ props.onChange }
                />   
                {
                    props.iconRight != undefined 
                    && <img 
                        className={`
                            ${ styles.container__inputs__imageElement } 
                            ${ styles[ 'container__inputs__imageElement--right' ] } 
                        `}
                        onClick={ props.iconClick }
                        src={ require( `../../../Assets/SVG/${ props.iconRight }.svg` ) }
                    />
                }      
            </div>

            <div className={ styles.container__textParagraph }>
                <p className={ styles[ 'container__textParagraph--error' ] }>
                    { props.errorMessage }
                </p>
            </div>
        </div>
    );
});

export default Input;
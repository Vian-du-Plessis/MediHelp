/* React */
import React, { forwardRef, useEffect } from 'react';

/* Styling */
import styles from './Select.module.scss';

const Select = forwardRef((props, ref) => {

    const options = props.options;
    useEffect(() => {

    }, [props.options])

    //const optValues = props.options || [];

    //const selectOptions = optValues.map(( item, index ) => <option key={ '' || index } value={ '' || item }> { '' || item }</option>)

    return (
        <div className={`
            ${styles.container}
            ${props.className ? props.className : ''}
        `}>
            <p className={ styles.label }>
                {props.label || 'No Label'}
            </p>
            <select ref={ref}>
                <option key="none" value="">{props.placeholderOption}</option>
                { options }
            </select>
            <div className={ styles.container__textParagraph }>
                <p className={ styles[ 'container__textParagraph--error' ] }>
                    { props.errorMessage }
                </p>
            </div>
        </div>
    );
});

export default Select;
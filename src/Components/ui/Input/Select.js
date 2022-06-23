/* React */
import React, { forwardRef } from 'react';

/* Styling */
import styles from './Select.module.scss';

const Select = forwardRef((props, ref) => {

    //const optValues = props.options || [];

    //const selectOptions = optValues.map(( item, index ) => <option key={ '' || index } value={ '' || item }> { '' || item }</option>)

    const options = props.options;
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
        </div>
    );
});

export default Select;
/* React */
import React from 'react';

/* Styling */
import styles from './Select.module.scss';

const Select = (props) => {

    const optValues = props.options || [];

    const selectOptions = optValues.map(( item, index ) => <option key={ '' || index } value={ '' || item }> { '' || item }</option>)

    return (
        <div className={`
            ${styles.container}
            ${props.className ? props.className : ''}
        `}>
            <p className={ styles.label }>
                {props.label || 'No Label'}
            </p>
            <select>
                <option key="none" value="">{props.placeholderOption}</option>
                { selectOptions }
            </select>
        </div>
    );
};

export default Select;
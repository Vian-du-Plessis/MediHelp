import React from 'react';
import styles from './Select.module.scss';

const Select = ( props ) => {

    const optValues = props.options || [];

    const selectOptions = optValues.map(( item, index ) => <option key={ '' || index } value={ '' || item }> { '' || item }</option>)

    return (
        <div className={ styles.container }>
            <p className={ styles.label }>
                { props.label || 'No Label' }
            </p>
            <select>
                <option key="none" value="">{ props.placeholderOption }</option>
                { selectOptions }
            </select>
        </div>
    );
};

export default Select;
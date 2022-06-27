/* React */
import React, { forwardRef, useEffect, useState } from 'react';

/* Styling */
import styles from './Select.module.scss';

const Select = forwardRef((props, ref) => {

    const options = props.options;
    const [ defaultOption, setDefautlOption ] = useState('');
    useEffect(() => {
        setDefautlOption(props.defaultValue);
    }, [props.options, props.defaultValue])

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
            <select 
                ref={ref} 
                defaultValue={defaultOption}
                disabled={props.disabled}
                onChange={props.onChange}
            >
                <option key="none" value={defaultOption == undefined ? '' : defaultOption}>{defaultOption == undefined ? props.placeholderOption : defaultOption}</option>
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
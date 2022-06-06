/* React */
import React from 'react';

/* Styling */
import styles from './SearchInput.module.scss';

/* Components */
import Icon from '../Icon/Icon';

const SearchInput = ( props ) => {
    return (
        <div className={ styles.container }>
            {/* Icon */}
            <Icon
                className={ props.className ? props.className : '' }
                icon='search'
            />
            {/* ./Icon */}
            <input
                type='text'
                placeholder='Search...'
            />
        </div>
    );
};

export default SearchInput;
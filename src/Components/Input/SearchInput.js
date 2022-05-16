import React from 'react';
import styles from './SearchInput.module.scss';
import Icon from '../Icon/Icon';

const SearchInput = ( props ) => {
    return (
        <div className={ styles.container }>
            <Icon
                className={ props.className ? props.className : '' }
                icon='search'
            />
            <input
                type='text'
                placeholder='Search...'
            />
        </div>
    );
};

export default SearchInput;
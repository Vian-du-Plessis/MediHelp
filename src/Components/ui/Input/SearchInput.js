/* React */
import React, { forwardRef } from 'react';

/* Styling */
import styles from './SearchInput.module.scss';

/* Components */
import Icon from '../Icon/Icon';

const SearchInput = forwardRef((props, ref) => {
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
                placeholder={ props.placeholder }
                ref={ ref }
                onChange={ props.change }
            />
        </div>
    );
});

export default SearchInput;
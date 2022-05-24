import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ( props ) => {
    return (
        <div className={`
            ${ styles.outerContainer } 
            ${ props.className ? props.className : '' }
        `}>
            <span>{ props.value }</span>
        </div>
    );
};

export default Pagination;
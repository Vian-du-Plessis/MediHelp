import React from 'react';
import styles from './PatientInfo.module.scss';

import Icon from '../Icon/Icon';

const PatientInfo = () => {
    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.innerContainer }>
                <div className={ styles.innerContainer__headings}>
                    <h5>Patient Info</h5>
                    <Icon
                        className={ styles.__iconContainer}
                        icon='close'
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
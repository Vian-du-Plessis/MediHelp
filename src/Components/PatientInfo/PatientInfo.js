import React from 'react';
import styles from './PatientInfo.module.scss';

import Icon from '../ui/Icon/Icon';
import Button from '../ui/Button/Button';

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
                <div className={ styles.innerContainer__info}>
                    <div>
                        <p>First name</p>
                        <h6>John</h6>
                    </div>
                    <div>
                        <p>Last name</p>
                        <h6>Doe</h6>
                    </div>
                    <div>
                        <p>ID</p>
                        <h6>0202215108087</h6>
                    </div>
                    <div>
                        <p>Age</p>
                        <h6>20</h6>
                    </div>
                </div>
                <hr />
                <div className={ styles.innerContainer__info__second }>
                    <div>
                        <p>Gender</p>
                        <h6>John</h6>
                    </div>
                    <div>
                        <p>Email</p>
                        <h6>John</h6>
                    </div>
                    <div>
                    </div>
                    <div>
                        <p>Contact No</p>
                        <h6>John</h6>
                    </div>
                </div>
                <hr />
                <div className={ styles.innerContainer__info__third }>
                    <div>
                        <p>Medical Aid Provider</p>
                        <h6>Bestmed</h6>
                    </div>
                    <div>
                    </div>
                    <div>
                        <p>Medical Aid Number</p>
                        <h6>127685</h6>
                    </div>
                    <div>
                    </div>
                </div>
                <div className={ styles.bottomContainer }>
                    <Button
                        className={ styles.button }
                        label='Edit Patient'
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
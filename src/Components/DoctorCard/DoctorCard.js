import React from 'react';
import styles from './DoctorCard.module.scss';

import Profile from '../../Assets/Images/profile.jpg';
import Icon from '../Icon/Icon';

const DoctorCard = () => {
    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.imageContainer }>
                <img src={Profile} alt="" />
            </div>
            <div className={ styles.column }>
                <div className={ styles.row }>
                    <p>Dr. Julia Roberts</p>
                </div>
                <div className={ styles.row }>
                    <h6>Doctor ID</h6>
                    <p>875164</p>
                </div>
                <div className={ styles.row }>
                    <h6>Specialisation</h6>
                    <p>General Practitioner</p>
                </div>
            </div>
            <div className={ styles.iconContainer }>
                <Icon
                    className={ styles.viewIcon }
                    icon='view'
                />
            </div>
        </div>
    );
};

export default DoctorCard;
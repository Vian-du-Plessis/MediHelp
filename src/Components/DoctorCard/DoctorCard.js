/* React */
import React from 'react';

/* Styling */
import styles from './DoctorCard.module.scss';

/* Components */
import Profile from '../../Assets/Images/profile.jpg';
import Icon from '../ui/Icon/Icon';

const DoctorCard = ( props ) => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.imageContainer}>
                <img src={Profile} alt="" />
            </div>
            <div className={styles.column}>
                <div className={styles.row}>
                    <p>Dr. {props.name}</p>
                </div>
                <div className={styles.row}>
                    <h6>Doctor ID</h6>
                    <p>{props.id}</p>
                </div>
                <div className={styles.row}>
                    <h6>Specialisation</h6>
                    <p>{props.specialisation}</p>
                </div>
            </div>
            <div className={styles.iconContainer}>
                {/* Icon */}
                <Icon
                    className={styles.viewIcon}
                    icon='view'
                />
                {/* /Icon */}
            </div>
        </div>
    );
};

export default DoctorCard;
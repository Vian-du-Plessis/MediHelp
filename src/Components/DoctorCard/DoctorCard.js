/* React */
import React from 'react';

/* Styling */
import styles from './DoctorCard.module.scss';

/* Components */
import Profile from '../../Assets/Images/profile.jpg';
import Icon from '../ui/Icon/Icon';

const DoctorCard = ( props ) => {
    const getKey = (index) => {
        props.doctorId(index)
        props.showDoctorInfo(true)
    }

    return (
        <div className={styles.outerContainer} key={props.doctorId}>
            <div className={styles.imageContainer}>
                <img src={props.src} alt="" />
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
                    key={props.id}
                    className={styles.viewIcon}
                    icon='view'
                    click={() => getKey(props.id)}
                />
                {/* /Icon */}
            </div>
        </div>
    );
};

export default DoctorCard;
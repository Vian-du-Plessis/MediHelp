import React, { useEffect, useState } from 'react';

import styles from './ReceptionistCard.module.scss';

import Icon from '../ui/Icon/Icon';

import Profile from '../../Assets/Images/profile.jpg'

const ReceptionistCard = (props) => {

    const getKey = (index) => {
            props.showReceptionProfile(true);
            props.receptionId(index);
            console.log(index)
    }

    const [ userData, setUserData ] = useState([]);
    useEffect(() => {
        setUserData(props.userData);
    }, [ props.userData ])
    return (
        <div className={ styles.outerContainer }
            key={props.uniqueId}
        >
            <div className={ styles.outerContainer__imageContainer}>
                <img src={props.src} alt="Profile Image" />
            </div>
            <div className={ styles.outerContainer__nameContainer }>
                <h6>Name</h6>
                <p>{props.name}</p>
            </div>
            <div className={ styles.outerContainer__ageContainer }>
                <h6>Age</h6>
                <p>{props.age}</p>
            </div>
            <div className={ styles.outerContainer__emailContainer }>
                <h6>Email</h6>
                <p>{props.email}</p>
            </div>
            <div className={ styles.outerContainer__rankContainer }>
                <h6>Rank</h6>
                <p>{props.rank}</p>
            </div>
            <div className={ styles.outerContainer__iconContainer }>
                <Icon
                    key={props.id}
                    className={ styles.viewIcon }
                    icon='view'
                    click={() => getKey(props.id) }
                />
            </div>
        </div>
    );
};

export default ReceptionistCard;
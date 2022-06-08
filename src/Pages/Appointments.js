import React from 'react';

import styles from './Appointments.module.scss';

import SearchInput from '../Components/Input/SearchInput';
import ProfileImage from '../Assets/SVG/profile.svg';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import Appointment from '../Components/Appointment/Appointment';



const Appointments = () => {
    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search...'
                    />
                    <div className={ styles.topContainer__profileContainer }>
                        <img src={ ProfileImage } alt="" />
                        <p>Susan</p>
                    </div>
                </div>
                <div className={ styles.middleContainer__headerContainer }>
                    <div className={ styles.headerContainer__main }>
                        <h3>

                        </h3>

                    </div>
                    <div className={ styles.headerContainer__sub }>
                        
                    </div>
                </div>
                <Appointment/>
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Appointments;
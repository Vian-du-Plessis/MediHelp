import React, { useEffect, useState, memo } from 'react';

import styles from './Appointments.module.scss';

import SearchInput from '../Components/Input/SearchInput';
import ProfileImage from '../Assets/SVG/profile.svg';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import Appointment from '../Components/Appointment/Appointment';



const Appointments = () => {

    const [ renderVal, setRenderVal ] = useState({
        render: false
    });

    const [ passingVal, setPassingVal ] = useState({
        render: false
    });

    useEffect(() => {
        setPassingVal({...passingVal, render: renderVal});
        console.log('This will be the prop Value')
        console.log(renderVal)
    }, [renderVal])



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
                <Appointment
                    renderVal={passingVal}
                />
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment
                    renderVal={item => setRenderVal({...renderVal, render: item})}
                />
            </div>
        </div>
    );
};

export default Appointments;
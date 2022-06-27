import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';

import styles from './Appointments.module.scss';

import SearchInput from '../Components/ui/Input/SearchInput';
import ProfileImage from '../Assets/SVG/profile.svg';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import Appointment from '../Components/Appointment/Appointment';
import Button from '../Components/ui/Button/Button';
import ToggleButton from '../Components/ui/ToggleButton/ToggleButton';
import AppointmentTableItem from '../Components/AppointmentTableItem/AppointmentTableItem';



const Appointments = () => {

    const monthList = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    const weekdayList = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]

    const [ renderVal, setRenderVal ] = useState({
        render: false
    });

    const [ passingVal, setPassingVal ] = useState({
        render: false
    });

    const [ activeToggle, setActiveToggle ] = useState('Weekly');

    useEffect(() => {
        setPassingVal({...passingVal, render: renderVal});
    }, [renderVal]);

    useEffect(() => {

    }, [])

    const [ date, setDate ] = useState('');
    useEffect(() => {
        let todayDay = weekdayList[new Date().getDay()];
        let month = monthList[new Date().getMonth()];
        let todayNumber = new Date().getDate();
        setDate(todayDay + ' ' + todayNumber + ' ' + month)
    }, [])

    const [ toggledValue, setToggledValue ] = useState('Weekly');
    const getToggled = ( e ) => {
        let toggled = e.currentTarget.innerText
        setToggledValue(toggled)
        console.log("🚀 ~ file: Appointments.js ~ line 35 ~ getToggled ~ toggled", toggled)
        if( document.querySelector('.activeToggle') ) {
            const elements = document.querySelector( '.activeToggle' );
            elements.classList.remove( 'activeToggle' );
        }
        e.currentTarget.classList.add( 'activeToggle' );

        if( toggled == 'All' ) {
            axios.post('http://localhost/Server/getAllAppointments.php', {start: 0})
            .then((res) => {
                console.log(res)
            })
        }
    }

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
            <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search by name, number or ID'
                    />
                    <div className={ styles.topContainer__profileContainer }>
                        <img src={ ProfileImage } alt="" />
                        <p>Susan</p>
                    </div>
                </div>
                <div className={ styles.middleContainer__headerContainer }>
                    <div className={ styles.headerContainer__main }>
                        <h3>
                            { 
                                date
                            }
                        </h3>
                        <Button
                            label='Manage Appointmnets'
                        />
                        {
                           <ToggleButton
                                    className={ styles.toggleButton }
                                    leftButton='Weekly'
                                    rightButton='All'
                                    onClick={getToggled}
                                    active={activeToggle}
                                    activeTwo='Weekly'
                                    activeOne='All'
                                />
                           
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
{                toggledValue == 'All'
                ?   <AppointmentTableItem/>
                :   <Appointment
                        renderVal={passingVal}
                    />}
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Appointments.module.scss';

import SearchInput from '../Components/ui/Input/SearchInput';
import ProfileImage from '../Assets/SVG/profile.svg';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import Appointment from '../Components/Appointment/Appointment';
import Button from '../Components/ui/Button/Button';
import ToggleButton from '../Components/ui/ToggleButton/ToggleButton';
import AppointmentTableItem from '../Components/AppointmentTableItem/AppointmentTableItem';
import Icon from '../Components/ui/Icon/Icon';
import ViewAppointment from '../Components/ViewAppointment/ViewAppointment';



const Appointments = () => {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ userProfile, setProfile ] = useState('');
    useEffect(() => {
        let loggedUser =  sessionStorage.getItem('loggedOnUser');
        let loggedUserName = sessionStorage.getItem('adminName');
        let image = sessionStorage.getItem('adminProfile');
        setProfile(image);
        setUsername(loggedUserName);
        if( loggedUser == '' || loggedUser == ' ' || loggedUser == undefined || loggedUser == null ) {
            navigate('/')
        } 
    }, [])

    const [ pageNumber, setPageNumber ] = useState(1);
    const [ start, setStart ] = useState(0);
    const pageLeft = () => {
        if(pageNumber != 0) {
            setStart(start - 12)
            setPageNumber(pageNumber - 1)
        }
        console.log(pageNumber);
    }

    const pageRight = () => {
        if(pageNumber != pages) {
            setStart(start + 12)
            setPageNumber(pageNumber + 1)
        }
        console.log(pageNumber);
    }

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

    const closeAppointmentInfo = () => {
        setShowAppointmentInfo(!showAppointmentInfo)
    }

    const [ renderAllAppointments, setRenderAllAppointments ] = useState(false);
    const [ appointmentsToRender, setAppointmentsToRender ] = useState([]);
    const [ showAppointmentInfo, setShowAppointmentInfo ] = useState(false);
    const [ appointmentID, setAppointmentID ] = useState(0);

    const [ pages, setPages ] = useState(0); 
    useEffect(() => {
        setRenderAllAppointments(false);
        console.log(start)
        axios.post('http://localhost/Server/getAllAppointments.php', {start: start})
        .then((res) => {
            console.log("🚀 ~ file: Appointments.js ~ line 102 ~ .then ~ res", res)
            setPages(Math.ceil(res.data.count/12))
            setAppointmentsToRender(res.data);
        });
    }, [renderAllAppointments, start]);

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
        if( document.querySelector('.activeToggle') ) {
            const elements = document.querySelector( '.activeToggle' );
            elements.classList.remove( 'activeToggle' );
        }
        e.currentTarget.classList.add( 'activeToggle' );

        if( toggled == 'All' ) {
            setRenderAllAppointments(true);
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
                        <img src={'http://localhost/Server/' + userProfile} alt="" />
                        <p>{username}</p>
                    </div>
                </div>
                <div className={ styles.middleContainer__headerContainer }>
                    <div className={ styles.headerContainer__main }>
                        <h3>
                            { 
                                showAppointmentInfo
                                ? 'Appointment Details'
                                : date
                            }
                        </h3>
                            {
                                    !showAppointmentInfo
                                ?   <ToggleButton
                                    className={ styles.toggleButton }
                                    leftButton='Weekly'
                                    rightButton='All'
                                    onClick={getToggled}
                                    active={activeToggle}
                                    activeTwo='Weekly'
                                    activeOne='All'
                                />
                                : null
                            }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
                { 
                    toggledValue == 'All' && !showAppointmentInfo
                    ?   <AppointmentTableItem
                                data={appointmentsToRender}
                                showAppointmentInfo={item => setShowAppointmentInfo(item)}
                                showAppointmentID={item => setAppointmentID(item)}
                                pageNumber={pageNumber}
                                pageRight={pageRight}
                                pageLeft={pageLeft}
                                pageLimit={pages}
                        />
                    :   toggledValue == 'Weekly' && !showAppointmentInfo
                    ?   <Appointment
                            renderVal={passingVal}
                        />
                    :   <ViewAppointment
                            rerenderAppointments={item => setRenderAllAppointments(item)}
                            modalOpen={item => setShowAppointmentInfo(item)}
                            clickCancel={() => closeAppointmentInfo()}
                            appointmentId={appointmentID}
                        />
                }
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
import React, { useEffect, useState } from 'react';
import styles from './AppointmentTableItem.module.scss';

import Icon from '../ui/Icon/Icon';
import Pagination from '../PaginationItem/Pagination';

const AppointmentTableItem = (props) => {

    const [ userData, setUserData ] = useState([]);
    const [ userSearchData, setUserSearchData ] = useState([]);
    const [ nameClickCount, setNameClickCount ] = useState(0);
    const [ visitClickCount, setVisitClickCount ] = useState(0);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ paging, setPaging ] = useState(true);
    const [ pageLimit, setPageLimit ] = useState(0);

    const sortNames = () => {
        if(nameClickCount == 0) {
            setNameClickCount(1)
        } else if(nameClickCount == 1) {
            setNameClickCount(nameClickCount + 1)
        } else {
            setNameClickCount(1)
        }

        if(nameClickCount == 1) {
            userData.sort((a, b) => 
            (a.doctor > b.doctor) ? 1 : ((b.doctor > a.doctor) ? -1: 0 ))
        } else {
            userData.sort((a, b) => 
            (a.doctor < b.doctor) ? 1 : ((b.doctor < a.doctor) ? -1: 0 ))
        }
        setVisitClickCount(0);
    }

    const sortVisits = () => {
        if(visitClickCount == 0) {
            setVisitClickCount(1)
        } else if(visitClickCount == 1) {
            setVisitClickCount(visitClickCount + 1)
        } else {
            setVisitClickCount(1)
        }

        if(visitClickCount == 1) {
            userData.sort((a, b) => a.time.split(':')[0] - b.time.split(':')[0])
        } else {
            userData.sort((a, b) => b.time.split(':')[0] - a.time.split(':')[0])
        }

        setNameClickCount(0);
    }

    const getKey = (index) => {
        props.showAppointmentInfo(true);
        props.showAppointmentID(index);
    }

    const [ appointmentsData, setAppointmentsData ] = useState([]);
    useEffect(() => {
        setAppointmentsData(props.data.users);
        setUserData(props.data.users);
        setPageNumber(props.pageNumber)
        setPageLimit(props.pageLimit);
    }, [props.data, props.pageNumber, props.pageLimit])

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.tableHeadingContainer }>
                <div>
                    <h6>Doctor</h6>
                    <div className={ styles.nameIconContainer } onClick={sortNames}>
                        <Icon
                            className={ styles.nameIcon }
                            icon='up'
                            click={ sortNames }
                            style={nameClickCount == 2 ? {opacity: 0.2 } : {opacity: 1}}
                        />
                        <Icon
                            className={ styles.nameIcon }
                            icon='down'
                            click={ sortNames }
                            style={nameClickCount == 1 ? {opacity: 0.2 } : {opacity: 1}}
                        />
                    </div>
                </div>
                <h6>Patient</h6> 
                <h6>Patient ID</h6> 
                <div className={ styles.tableHeadingContainerSecond }>
                    <div>
                        <h6>Appointment Time</h6>
                        <div className={ styles.nameIconContainer }>
                            <Icon
                                className={ styles.nameIcon }
                                icon='up'
                                click={sortVisits}
                                style={visitClickCount == 2 ? {opacity: 0.2 } : {opacity: 1}}
                            />
                            <Icon
                                className={ styles.nameIcon }
                                icon='down'
                                click={sortVisits}
                                style={visitClickCount == 1 ? {opacity: 0.2 } : {opacity: 1}}
                            />
                        </div>
                    </div>
                </div>
                <h6>Date</h6>
            </div>
            {
                appointmentsData.map((x, index) => 
                    <div className={ styles.patientRow } key={x.id}>
                        <p>{x.doctor}</p>
                        <p>{x.patient}</p>
                        <p>{x.patient_id}</p>
                        <p>{x.time}</p>
                        <p>{x.date}</p>
                        <div>
                            <Icon
                                key={x.id}
                                className={ styles.viewIcon }
                                icon='view'
                                click={() => getKey(x.id) }
                            />
                        </div>
                    </div> 
                )
            }
            {
               
                <div className={ styles.paginationContainer }>
                <Icon
                    className={ styles.left__icon }
                    icon='page-left'
                    click={ props.pageLeft }
                    style={ pageNumber == 1 ? {opacity: 0.2} : {opacity: 1} }
                />

                <Icon
                    className={ styles.right__icon }
                    icon='page-right'
                    click={ props.pageRight }
                    style={ pageLimit == pageNumber ? {opacity: 0.2} : {opacity: 1} }
                />
            </div>
            }


        </div>
    );
};

export default AppointmentTableItem;
import React, { useEffect, useState } from 'react';
import styles from './PatientTableItem.module.scss';

import Icon from '../ui/Icon/Icon';
import Pagination from '../PaginationItem/Pagination';

const PatientTableItem = (props) => {

    const [ userData, setUserData ] = useState([]);
    const [ userSearchData, setUserSearchData ] = useState([]);
    const [ nameClickCount, setNameClickCount ] = useState(0);
    const [ visitClickCount, setVisitClickCount ] = useState(0);
    const [ startIndex, setStartIndex ] = useState(0);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ paging, setPaging ] = useState(true);

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
            (a.name_and_surname > b.name_and_surname) ? 1 : ((b.name_and_surname > a.name_and_surname) ? -1: 0 ))
        } else {
            userData.sort((a, b) => 
            (a.name_and_surname < b.name_and_surname) ? 1 : ((b.name_and_surname < a.name_and_surname) ? -1: 0 ))
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
            userData.sort((a, b) => a.timePassed - b.timePassed)
        } else {
            userData.sort((a, b) => b.timePassed - a.timePassed)
        }
        setNameClickCount(0);
    }

    const getKey = (index) => {
        console.log(index)
        props.showPatientInfo(true);
    }

    useEffect(() => {
        setUserData(props.values);
        setUserSearchData(props.searchValues);
        setVisitClickCount(0);
        setNameClickCount(0);
        setStartIndex(props.index);
        setPaging(props.pagingOn);
        console.log(props.values)
    }, [props.indexLimit, props.values, props.resetFilter, props.index, props.page, props.indexLimit, props.pagingOn, props.searchValues]);

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.tableHeadingContainer }>
                <div>
                    <h6>Name</h6>
                    <div className={ styles.nameIconContainer } onClick={sortNames}>
                        <Icon
                            className={ styles.nameIcon }
                            icon='up'
                            click={ sortNames }
                            style={ nameClickCount == 2 ? {opacity: 0.2 } : {opacity: 1}}
                        />
                        <Icon
                            className={ styles.nameIcon }
                            icon='down'
                            click={ sortNames }
                            style={ nameClickCount == 1 ? {opacity: 0.2 } : {opacity: 1}}
                        />
                    </div>
                </div>
                <h6>Contact no.</h6> 
                <h6>ID</h6> 
                <div className={ styles.tableHeadingContainerSecond }>
                    <div>
                        <h6>Last visit</h6>
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
            </div>
            { paging &&
                userData.map((x, index) => 
                    <div className={ styles.patientRow } key={x.id}>
                        <p>{x.name_and_surname}</p>
                        <p>{x.phone_number}</p>
                        <p>{x.sa_id}</p>
                        <p>
                            {
                                x.timePassed == 'N/A' 
                                ? 'N/A' 
                                : x.timePassed > 365 
                                ? Math.round(x.timePassed/365) + ' Years ago'
                                : x.timePassed == 0
                                ? 'Today' 
                                : x.timePassed == 1
                                ? x.timePassed + ' Day ago'
                                : x.previous_appointments == ' '
                                ? 'N/A'
                                : x.timePassed + ' Days ago'
                            }
                        </p>
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
                !paging &&
                userSearchData.map((x, index) => 
                <div className={ styles.patientRow } key={x.id}>
                    <p>{x.name_and_surname}</p>
                    <p>{x.phone_number}</p>
                    <p>{x.sa_id}</p>
                    <p>
                        {
                            x.timePassed == 'N/A' 
                            ? 'N/A' 
                            : x.timePassed > 365 
                            ? Math.round(x.timePassed/365) + ' Years ago'
                            : x.timePassed == 0
                            ? 'Today' 
                            : x.timePassed == 1
                            ? x.timePassed + ' Day ago'
                            : x.timePassed + ' Days ago'
                        }
                    </p>
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
                paging &&
                <div className={ styles.paginationContainer }>
                <Icon
                    className={ styles.left__icon }
                    icon='page-left'
                    click={ props.pageLeft }
                    style={ startIndex.start == 0 ? {opacity: 0.2} : {opacity: 1} }
                />
                <Pagination
                    value='1'
                />
                <Pagination
                    value='2'
                />
                <Pagination
                    value='3'
                />
                <Pagination
                    value='4'
                />
                <span>...</span>
                <Pagination
                    value='20'
                />
                <Icon
                    className={ styles.right__icon }
                    icon='page-right'
                    click={ props.pageRight }
                    style={ startIndex.start == props.indexLimit - 9 ? {opacity: 0.2} : {opacity: 1} }
                />
            </div>
            }


        </div>
    );
};

export default PatientTableItem;
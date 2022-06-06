/* React */
import React, {useEffect, useState} from 'react';

/* Styling */
import styles from './DatePicker.module.scss'
import './DatePicker.scss';

/* Components */
import Icon from '../Icon/Icon';

const DatePicker = () => {

    const [yearToday, setYearToday] = useState();
    const [monthToday, setMonthToday] = useState();
    const [monthTodayName, setMonthTodayName] = useState();
    const [calDays, setCalDays] = useState();

    const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const weekDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]

    useEffect(() => {
        const d = new Date();
        const thisDay = d.getDate();
        const yearGet = d.getFullYear();
        const monthGet = d.getMonth();
        const daysGet = new Date( yearGet, monthGet + 1 , 0 ).getDate();
        setYearToday( yearGet );
        setMonthToday( monthGet );
        setMonthTodayName( monthList[monthGet] );

        let startDate = new Date(yearGet, monthGet, 1);
        let starting = startDate.toString();
        starting = starting.split(' ')[0];
        let startingNumber = weekDays.findIndex( (item) => item === starting );

        let prevMonthGet = '';
        if(monthGet === 0) {
            prevMonthGet = 12;
        } else {
            prevMonthGet = (monthGet - 1);
        }
        
        const prevDaysGet = new Date( yearGet - 1, prevMonthGet + 1, 0 ).getDate();
        
        let start = prevDaysGet - (startingNumber);
        const daysList = [];
        const prevDayList = [];
        const nextDaysList = [];
        let prevDayStart = start;
        console.log("🚀 ~ file: DatePicker.js ~ line 68 ~ useEffect ~ prevDayStart", prevDayStart)



        for( let i = 0; i < startingNumber; i++ ) {
            prevDayStart++;
            let object = {
                class: 'notShowing',
                today: false,
                day: prevDayStart 
            }
            prevDayList.push(object);
            console.log("🚀 ~ file: DatePicker.js ~ line 79 ~ useEffect ~ prevDayList", prevDayList)
        }
        
        let days = 0;
        for(let i = 0; i < daysGet; i++) {
            days++;
            let object = {
                class: 'showing',
                today: thisDay === days ? true : false,
                day: days 
            }
            daysList.push(object);
        }

        let nextDays = 0;
        let nextDaysLimit = 42 - prevDayList.length - daysList.length;
        for( let i = 0; i < nextDaysLimit; i++ ) {
            nextDays++;            
            let object = {
                class: 'notShowing',
                today: false,
                day: nextDays 
            }
            nextDaysList.push(object);
        }

        const finalDaysList = [...prevDayList, ...daysList, ...nextDaysList]

        const calendarItem = finalDaysList.map(( item, index ) => <div className={`${ styles.dayContainer } ${ item.class } ${ item.today ? 'today' : '' } dayContainer`} onClick={(e) => toggleActiveDay(e)} key={index}><span>{ item.day }</span></div>);

        setCalDays( calendarItem );  

    }, []);

    const toggleActiveDay = ( e ) => {
        console.log(e.currentTarget.innerText); // Gets the value
        if( document.querySelector('.active') ) {
            const elements = document.querySelector( '.active' );
            elements.classList.remove( 'active' );
        }

        e.currentTarget.classList.add( 'active' );
    }

    const prevMonth = () => {
        const d = new Date();
        const thisDay = d.getDate();
        const thisMonth = d.getMonth();
        const thisYear = d.getFullYear();

        let yearGet = '';
        let monthGet = monthToday - 1;

        setMonthToday( monthGet );
        setMonthTodayName( monthList[monthGet] );

        if(monthGet < 0) {
            yearGet = yearToday - 1;
            monthGet = 11;
            setMonthToday(11);
            setMonthTodayName( monthList[11] );
            setYearToday( yearGet );
        } else {
            yearGet = yearToday;
        }

        const daysGet = new Date( yearGet, monthGet + 1 , 0 ).getDate();
        

        let startDate = new Date(yearGet, monthGet, 1);
        let starting = startDate.toString();
        starting = starting.split(' ')[0];
        let startingNumber = weekDays.findIndex( (item ) => item === starting );
        let prevMonthGet = '';
        if(monthGet === 0) {
            prevMonthGet = 12;
        } else {
            prevMonthGet = (monthGet - 1);
        }
        
        const prevDaysGet = new Date( yearGet - 1, prevMonthGet + 1, 0 ).getDate();
        
        let start = prevDaysGet - (startingNumber);
        const daysList = [];
        const prevDayList = [];
        const nextDaysList = [];
        let prevDayStart = start;

        for( let i = 0; i < startingNumber; i++ ) {
            prevDayStart++;
            let object = {
                class: 'notShowing',
                today: false,
                day: prevDayStart
            }
            prevDayList.push(object);
        }
        
        let days = 0;
        for(let i = 0; i < daysGet; i++) {
            days++;
            let isToday = false;

            if(monthGet === thisMonth && days === thisDay && yearToday === thisYear) {
                isToday = true;
            } else {
                isToday = false;
            }
            let object = {
                class: 'showing',
                today: isToday,
                day: days
            }
            daysList.push(object);
        }

        let nextDays = 0;
        let nextDaysLimit = 42 - prevDayList.length - daysList.length;
        for( let i = 0; i < nextDaysLimit; i++ ) {
            nextDays++;
            let object = {
                class: 'notShowing',
                today: false,
                day: nextDays
            }
            nextDaysList.push(object);
        }

        const finalDaysList = [...prevDayList, ...daysList, ...nextDaysList]

        const calendarItem = finalDaysList.map(( item, index ) => <div className={`${ styles.dayContainer } ${ item.class } ${ item.today ? 'today' : '' } dayContainer`} onClick={(e) => toggleActiveDay(e)} key={index}><span>{ item.day }</span></div>);

        setCalDays( calendarItem ); 
    }

    const nextMonth = () => {
        const d = new Date();
        const thisDay = d.getDate();
        const thisMonth = d.getMonth();
        const thisYear = d.getFullYear();
        let yearGet = '';
        let monthGet = monthToday + 1;

        setMonthToday( monthGet );
        setMonthTodayName( monthList[monthGet] );

        if(monthGet > 11) {
            yearGet = yearToday + 1;
            monthGet = 0;
            setMonthToday(0);
            setMonthTodayName( monthList[0] );
            setYearToday( yearGet );
        } else {
            yearGet = yearToday;
        }

        const daysGet = new Date( yearGet, monthGet + 1 , 0 ).getDate();
        

        let startDate = new Date(yearGet, monthGet, 1);
        let starting = startDate.toString();
        starting = starting.split(' ')[0];
        let startingNumber = weekDays.findIndex( (item ) => item === starting );
        let prevMonthGet = '';
        if(monthGet === 0) {
            prevMonthGet = 12;
        } else {
            prevMonthGet = (monthGet - 1);
        }
        
        const prevDaysGet = new Date( yearGet - 1, prevMonthGet + 1, 0 ).getDate();
        
        let start = prevDaysGet - (startingNumber);
        const daysList = [];
        const prevDayList = [];
        const nextDaysList = [];
        let prevDayStart = start;

        for( let i = 0; i < startingNumber; i++ ) {
            prevDayStart++;
            let object = {
                class: 'notShowing',
                today: false,
                day: prevDayStart
            }
            prevDayList.push(object);
        }
        
        let days = 0;
        for(let i = 0; i < daysGet; i++) {
            days++;
            let isToday = false;

            if(monthGet === thisMonth && days === thisDay && yearToday === thisYear) {
                isToday = true;
            } else {
                isToday = false;
            }
            let object = {
                class: 'showing',
                today: isToday,
                day: days
            }
            daysList.push(object);
        }

        let nextDays = 0;
        let nextDaysLimit = 42 - prevDayList.length - daysList.length;
        for( let i = 0; i < nextDaysLimit; i++ ) {
            nextDays++;
            let object = {
                class: 'notShowing',
                today: false,
                day: nextDays
            }
            nextDaysList.push(object);
        }

        const finalDaysList = [...prevDayList, ...daysList, ...nextDaysList]

        const calendarItem = finalDaysList.map(( item, index ) => <div className={`${ styles.dayContainer } ${ item.class } ${ item.today ? 'today' : '' } dayContainer`} onClick={(e) => toggleActiveDay(e)} key={index}><span>{ item.day }</span></div>);

        setCalDays( calendarItem ); 
    }

    return (
        <div className={styles.bigContainer}>
            <h6>Date</h6>
            <div className={styles.outerContainer}>
                <div className={styles.monthChange}>
                    <p>{monthTodayName + ' ' + yearToday} </p>
                    <div className={styles.monthChange__buttons}>
                        {/* Icons */}
                        <Icon
                            className={styles.button}
                            icon='right'
                            click={prevMonth}
                        />
                        <Icon
                            className={styles.button}
                            icon='left'
                            click={nextMonth}
                        />
                        {/* /Icons */}
                    </div>
                </div>
                <div className={styles.weekDays}>
                    <h6>S</h6>
                    <h6>M</h6>
                    <h6>T</h6>
                    <h6>W</h6>
                    <h6>T</h6>
                    <h6>F</h6>
                    <h6>S</h6>
                </div>
                <div className={styles.Days}>
                    {calDays}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
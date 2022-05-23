import React, { useEffect, useState } from 'react';
import styles from './DatePicker.module.scss'
import './DatePicker.scss';

import Icon from '../Icon/Icon';

const DatePicker = () => {

    const [startingDayToday, setStartingDayToday] = useState();
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [days, setDays] = useState('');
    const [calDays, setCalDays] = useState('');

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

    useEffect(() => {

        const d = new Date();
        const yearGet = d.getFullYear();
        const monthGet = d.getMonth();
        const daysGet = new Date(yearGet, monthGet + 1, 0).getDate();
        setYear( yearGet );
        setMonth( monthList[monthGet] );
        setDays( daysGet );


        let startDate = new Date(2022, 4, 1);
        let starting = startDate.toString();
        starting = starting.split(' ')[0];
        let startingNumber = 0;
        
        if( starting == 'Sun' ) {
            startingNumber = 0;
            setStartingDayToday(0);
        } else if( starting == 'Mon' ) {
            startingNumber = 1;
            setStartingDayToday(1);
        } else if( starting == 'Tue' ) {
            startingNumber = 2;
            setStartingDayToday(2);
        } else if( starting == 'Wed' ) {
            startingNumber = 3;
            setStartingDayToday(3);
        } else if( starting == 'Thu' ) {
            startingNumber = 4;
            setStartingDayToday(4);
        } else if( starting == 'Fri' ) {
            startingNumber = 5;
            setStartingDayToday(5);
        } else if( starting == 'Sat' ) {
            startingNumber = 6;
            setStartingDayToday(6);
        }

        console.log(startingNumber)

        const prevMonthGet = (d.getMonth() - 1);
        const prevDaysGet = new Date(yearGet, prevMonthGet + 1, 0).getDate();
        console.log("🚀 ~ file: DatePicker.js ~ line 73 ~ useEffect ~ prevDaysGet", prevDaysGet)
        let start = prevDaysGet - (startingNumber);
        console.log("🚀 ~ file: DatePicker.js ~ line 75 ~ useEffect ~ start", start)
        const daysList = [];

        for(let i = 0; i < 35; i++) {
            if(start == prevDaysGet) {
                console.log('hey');
                start = 0;
                start++;
            } else {
                console.log('not');
                start++
            }

            daysList.push(start);
            console.log(daysList)
        }

        const calendarItem = daysList.map(item => <div className={`${ styles.dayContainer } dayContainer`} onClick={(e) => toggleActiveDay(e)}><span>{ item }</span></div>);

        setCalDays(calendarItem);



        console.log(startingDayToday)


        console.log("🚀 ~ file: DatePicker.js ~ line 13 ~ useEffect ~ startDate", startingDayToday)
    }, [startingDayToday]);





    const toggleActiveDay = (e) => {
        if( document.querySelector('.active') ) {
            const elements = document.querySelector( '.active' );
            elements.classList.remove( 'active' );
        }

        e.currentTarget.classList.add( 'active' );
    }
  


    const d = new Date();
    const weekDay = d.getDay();


    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.monthChange }>
                <p>{month + ' ' + year} </p>
                <div className={ styles.monthChange__buttons }>
                    <Icon
                        className={ styles.button }
                        icon='right'
                    />
                    <Icon
                        className={ styles.button }
                        icon='left'
                    />
                </div>
            </div>
            <div className={ styles.weekDays }>
                <h6>S</h6>
                <h6>M</h6>
                <h6>T</h6>
                <h6>W</h6>
                <h6>T</h6>
                <h6>F</h6>
                <h6>S</h6>
            </div>
            <div className={ styles.Days }>
                { calDays }
            </div>
        </div>
    );
};

export default DatePicker;
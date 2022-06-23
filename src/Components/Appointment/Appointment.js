/* React */
import React, { useEffect, useRef, useState } from 'react';

/* Styling */
import styles from './Appointment.module.scss';

/* Components */
import Icon from '../ui/Icon/Icon';
import ToggleButton from '../ui/ToggleButton/ToggleButton';
import axios from 'axios';

const Appointment = ( props ) => {

    const [ daysToDisplay, setDaysToDisplay ] = useState();
    const [ appointments, setAppointments ] = useState([]);

    const [ todayValues, setTodayValues ] = useState({
        number: '',
        value: ''
    });
    const [ monthValue, setMonthValue ] = useState({
        value: '',
        listValue: ''
    });
    const [ yearValue, setYearvalue ] = useState();

    const [ daysArray, setDaysArray ] = useState([]);

    const [ checkDate, setCheckDate ] = useState([]);



    let days = [
        {
            day: 'Monday',
            date: '',
            isDay: false,
            dayShort: 'Mon',
            fullDate: ''
        },
        {
            day: 'Tuesday',
            date: '',
            isDay: false,
            dayShort: 'Tuesday',
            fullDate: ''
        },        
        {
            day: 'Wednesday',
            date: '',
            isDay: false,
            dayShort: 'Wed',
            fullDate: ''
        },
        {
            day: 'Thursday',
            date: '',
            isDay: false,
            dayShort: 'Thu',
            fullDate: ''
        },
        {
            day: 'Friday',
            date: '',
            isDay: false,
            dayShort: 'Fri',
            fullDate: ''
        },
        {
            day: 'Saturday',
            date: '',
            isDay: false,
            dayShort: 'Sat',
            fullDate: ''
        },
        {
            day: 'Sunday',
            date: '',
            isDay: false,
            dayShort: 'Sun',
            fullDate: ''
        }
    ]

    let dayList = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]

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
        let today = new Date().toString().split(' ')[0]; // Returns monday to friday
        let todayIndex = dayList.indexOf(today)
        let todayNumber = new Date().toString().split(' ')[2]; // Returns the day of the month 1-31
        if(todayNumber[0] == 0) {
            todayNumber = todayNumber[1]; //This removes the zero
        }
        setTodayValues({...todayValues, number: todayNumber, value: today});
        let month = new Date().getMonth();
        setMonthValue( {...monthValue, value: monthList[month], listValue: month } );
        let year = new Date().getFullYear();
        setYearvalue(year);
        let prevMonthTotalDays = new Date(year, month, 0).getDate();
        let monthTotalDays = new Date(year, month + 1, 0).getDate(); 

        let prevDaysArray = [];
        let prevDayStartCount = +todayNumber;
        for( let i = 0; i < todayIndex; i++ ) {
            if( prevDayStartCount == 0) {
                prevDayStartCount = prevMonthTotalDays + 1;
            }
            prevDayStartCount--;
            prevDaysArray.push( {day: '', value: prevDayStartCount, monthVal: monthList[month], year: 2022} );
        }
        prevDaysArray.reverse();

        let nextDayStartCount = +todayNumber - 1;
        for( let i = 0; i < 7 - todayIndex; i++ ) {
            if( nextDayStartCount == monthTotalDays ) {
                nextDayStartCount = 1
            }
            nextDayStartCount++;
            prevDaysArray.push({day: '', value: nextDayStartCount, monthVal: monthList[month], year: 2022});
        }

        for( let i = 0; i < prevDaysArray.length; i++ ) {
            prevDaysArray[i].day = dayList[i]
        }

        for( let i = 0; i < 7; i++ ) {
            days[i].fullDate = prevDaysArray[i].value + ' ' + prevDaysArray[i].monthVal + ' ' + prevDaysArray[i].year;
        }

        setCheckDate(days);

        setDaysArray(prevDaysArray);

        let dayItems = prevDaysArray.map( ( item, index ) => 
            <div key={ index }>
                <h4>{ item.day }</h4>
                <h5>{ item.value }</h5>
            </div>    
        )
        setDaysToDisplay(dayItems);

    }, []);

    const [ renderVal, setRenderVal ] = useState(props.renderVal);

     useEffect(() => {
        console.log(renderVal)
        axios.post('http://localhost/Server/readUserPosts.php')
        .then( ( res ) => {
            setAppointments( res.data );
        });
        setRenderVal(false);

    }, [props.renderVal]); 

    const daysPrev = () => {
        let prevWeekValue = +daysArray[0].value;
        let prevMonthTotalDays = new Date(2022, monthValue.listValue, 0).getDate();
        let month = monthValue.value;
        let testArray = [];
        for( let i = 0; i < 7; i++ ) {
            if( prevWeekValue == 1 ) {
                prevWeekValue = prevMonthTotalDays + 1;
            } 
            prevWeekValue--;
            testArray.unshift( {day: '', value: prevWeekValue} );
        }

        for( let i = 0; i < 7; i++ ) {
            testArray[i].day = dayList[i]
        }

        let dayItems = testArray.map( ( item, index ) => 
            <div key={ index }>
                <h4>{ item.day }</h4>
                <h5>{ item.value }</h5>
            </div>    
        )

        setDaysToDisplay(dayItems);
    }

    useEffect(() => {
        let todayStringValue = new Date().toString().split(' ')[0]; // Returns the day it is today Mon - Sun
        let todayIndexOfDayList = dayList.indexOf(todayStringValue); // Returns the index of today out of dayList
        let todayIntegerValue = new Date().toString().split(' ')[2]; // Returns the number of the day it is today
        if(todayIntegerValue[0] == 0) {
            todayIntegerValue = todayIntegerValue[1]; //This removes the zero
        }
        let yearTodayIntegerValue = new Date().getFullYear();
        let monthTodayIntegerValue = new Date().getMonth(); // Returns index of the current month 1-12 minus 1 
        let currentMonthIndex = monthTodayIntegerValue;
        let monthStringValue = monthList[currentMonthIndex];
        let prevMonthTotalDays = new Date(2022, monthTodayIntegerValue, 0).getDate(); // Returns total days for previous month
        let monthTotalDays = new Date(2022, monthTodayIntegerValue + 1, 0).getDate(); // Returns total days for current month

        let daysArray = [];

        let count = +todayIntegerValue;
        for( let i = 0; i < todayIndexOfDayList; i++ ) {
            if( count == 0 ) {
                count = prevMonthTotalDays + 1;
                currentMonthIndex -= 1;
                monthStringValue = monthList[currentMonthIndex];
            }
            count--;
            daysArray.unshift({
                dayIntVal: count,
                monthStrVal: monthStringValue,
                yearIntVal: yearTodayIntegerValue
            })
        }
    });

    return (
        <div className={ styles.container }>
{/*             <div className={ styles.leftButton } onClick={ daysPrev }>
                Left Button
            </div>
            <div className={ styles.rightButton } onClick={ daysNext }>
                Right Button
            </div> */}
            <div className={ styles.container__top }>
                { daysToDisplay }
            </div>

            <div className={ styles.container__bottom }>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>7 am</h6> <hr/>
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('07') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>8 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('08') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>9 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate   ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('09') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>10 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('10') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>11 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('11') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>12 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('12') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>1 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('13') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>2 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('14') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>3 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('15') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>4 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[0].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[1].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[2].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[3].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[4].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[5].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes(  checkDate[6].fullDate  ) && x.time.includes('16') ).map(( x, index) => <div key={index}>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>5 pm</h6> <hr />
                </div>
            </div>
        </div>
    );
};

export default Appointment;
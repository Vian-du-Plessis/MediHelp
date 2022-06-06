/* React */
import React, { useEffect, useState } from 'react';

/* Styling */
import styles from './Appointment.module.scss';

/* Components */
import Icon from '../Icon/Icon';
import ToggleButton from '../ToggleButton/ToggleButton';
import axios from 'axios';

const Appointment = () => {

    const [ weekDays, setWeekDays ] = useState();
    const [ appointments, setAppointments ] = useState( [] );
    const [ renderAppointments, setRenderAppointments ] = useState();
    const [ dayNumbers, setDayNumbers ] = useState();

    let days = [
        {
            day: 'Monday',
            date: '02',
            isDay: false,
            dayShort: 'Mon'
        },
        {
            day: 'Tuesday',
            date: '03',
            isDay: false,
            dayShort: 'Tuesday'
        },        
        {
            day: 'Wednesday',
            date: '04',
            isDay: false,
            dayShort: 'Wed'
        },
        {
            day: 'Thursday',
            date: '05',
            isDay: false,
            dayShort: 'Thu'
        },
        {
            day: 'Friday',
            date: '06',
            isDay: false,
            dayShort: 'Fri'
        },
        {
            day: 'Saturday',
            date: '07',
            isDay: false,
            dayShort: 'Sat'
        },
        {
            day: 'Sunday',
            date: '08',
            isDay: false,
            dayShort: 'Sun'
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
        let today = new Date().toString().split(' ')[0]; //Returns Sun
        let month = new Date().getMonth(); //Value returned + 1 for actual month from range 1-12 //Returns 5
        let year = new Date().getFullYear(); //Returns 2022
        let daysInMonthPrev = new Date(year, month, 0).getDate(); // Works with values 1-12 //Returns 31
        let daysInMonth = new Date(year, month + 1, 0).getDate(); // Works with values 1-12 //Returns 31

        let todayNumber = new Date().toString().split(' ')[2];
        let dayIndex = dayList.indexOf(today);

        let monthToShow = monthList[month];

        let prevDayNumbers = [];
        let dayNumber = +todayNumber + 1;
        for(let i = 0; i <= dayIndex; i++) {
            dayNumber--;
            if(dayNumber == 0) {
                monthToShow = monthList[month - 1]
                dayNumber = daysInMonthPrev;
            }
            prevDayNumbers.push({month: monthToShow, number: dayNumber.toString(), fullDate: dayNumber.toString() + ' ' + monthToShow});
        }
        prevDayNumbers.reverse();

        let daysNext = [];
        let nextDaysNumber = +todayNumber;
        for(let i = 0; i < 7; i++) {
            if(nextDaysNumber == daysInMonth) {
                nextDaysNumber = 1;
                monthToShow = monthList[month + 1]
            }
            nextDaysNumber++;
            daysNext.push({month: monthToShow, number: nextDaysNumber.toString(), fullDate: nextDaysNumber.toString() + ' ' + monthToShow});
        }

        const finalDaysNumber = [ ...prevDayNumbers, ...daysNext ];
        setDayNumbers(finalDaysNumber);

        for(let i = 0; i < days.length; i++) {
            days[i].date = finalDaysNumber[i].number;
            if(days[i].dayShort == today) {
                days[i].isDay = true;
            }
        }

    }, []);

    useEffect(() => {
        let weekItem = days.map(( item ) =>
            <div className={ item.isDay == true ? styles.activeDay : '' }>
                <h6>{ item.day }</h6>
                <h5>{ item.date }</h5>
            </div>
        );

        setWeekDays( weekItem );

        axios.post('http://localhost/Server/readUserPosts.php')
        .then( ( res ) => {
            console.log(res.data)
            setAppointments( res.data );
        });

    }, [renderAppointments]);

    return (
        <div className={ styles.container }>
            <div className={ styles.container__top }>
                { weekDays }
            </div>

            <div className={ styles.container__bottom }>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>7 am</h6> <hr/>
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('07') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>8 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('08') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>9 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate  ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('09') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>10 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('10') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>11 am</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('11') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>12 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('12') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>1 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('13') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>2 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('14') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>3 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('15') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                </div>
                <div className={ styles[ 'container__bottom--time' ] }>
                    <h6>4 pm</h6> <hr />
                </div>
                <div className={ styles[ 'container__bottom--appointment' ] }>
                <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[0].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[1].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[2].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[3].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[4].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[5].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
                        }
                    </div>
                    <div>
                        {
                            appointments.filter( x => x.date.includes( dayNumbers[6].fullDate ) && x.time.includes('16') ).map(x => <div>{x.patient}</div>) 
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
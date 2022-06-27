/* React */
import React, { useState, useRef, useEffect } from 'react';

/* Styling */
import styles from './CreateAppointment.module.scss';

/* Components */
import DatePicker from '../Date-Picker/DatePicker';
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import axios from 'axios';

const CreateAppointment = ( props ) => {

    const [ val, setVal ] = useState('');

    const [ doctorVal, setDoctorVal ] = useState();
    const [ patientVal, setPatientVal ] = useState();

    useEffect(() => {
        axios.post('http://localhost/Server/getDoctors.php')
        .then( ( res ) => {                
            // console.log(res.data)
            let options = res.data.map( ( item, index ) => 
                <option key={index} value={item.id + ' ' + item.name_and_surname}>
                    {item.name_and_surname + ' (' + item.specialisation + ')'}
                </option>)
            setDoctorVal( options );
        });

        axios.post('http://localhost/Server/getAllPatients.php')
        .then( ( res ) => {                
            // console.log(res.data)
            let options = res.data.map( ( item, index ) => 
                <option key={index} value={item.sa_id + ' ' + item.name_and_surname}>
                    {item.name_and_surname + ' (' + item.sa_id + ')'}
                </option>)
            setPatientVal( options );
        });
    }, []);

    let timeVal = useRef();
    let doctor = useRef();
    let name = useRef();
    const setAppointment = () => {
        let doc = doctor.current.value;
        let docStrVal = 'Dr. ' + doc.toString().split(' ')[2]
        let nameVal = name.current.value;
        let fullNamVal = nameVal.toString().split(' ')[1] + ' ' + nameVal.toString().split(' ')[2];
        let patId = nameVal.split(' ')[0];
        let time = timeVal.current.value  ;

        let appointValues = {
            docVal: docStrVal,
            patVal: fullNamVal,
            patIdVal: patId,
            timeVal: time,
            dateVal: val
        }

        axios.post('http://localhost/Server/makeAppointment.php', appointValues)
        .then( ( res ) => {         
            // console.log(res)       
        });

        props.renderVal(true);
    }

    return (
        <div className={styles.outerContainer}>
            <div>
                <h1>Create Appointment</h1>
                <hr />
                {val}
            </div>

            {/* DatePicker */}
            <DatePicker
                changeVal={val => setVal(val)}
            />
            {/* /DatePicker */}
            
            {/* Input */}
            <Input
                label='Time'
                type='time'
                ref={timeVal}
            />
            {/* /Input */}

            {/* Selects */}

            <Select
                placeholderOption='Please Select'
                label='Doctor'
                options={doctorVal}
                ref={doctor}
            />
            {/* /Selects */}

            {/* Input */}
            <Select
                placeholderOption='Please Select'
                label='Patient'
                options={patientVal}
                ref={name}
            />
            {/* /Input */}

            {/* Button */}
            <Button
                className={styles.buttonContainer}
                label='Confirm Appointment'
                onClick={setAppointment}
            />
            {/* /Button */}
        </div>
    );
};

export default CreateAppointment;
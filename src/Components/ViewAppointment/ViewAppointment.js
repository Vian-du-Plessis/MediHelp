/* React */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

/* Styling */
import styles from './ViewAppointment.module.scss';

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';

const AddPatient = (props) => {
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ appointmentID, setAppointmentID ] = useState('');
    const [ appointmentData, setAppointmentData ] = useState([]);
    const [ doctorsData, setDoctorsData ] = useState([]);
    const [ patientsData, setPatientsData ] = useState([]);

    const [ doctorsOptions, setDoctorsOptions ] = useState([]);
    const [ patientsOptions, setPatientsOptions ] = useState([]);

    const [ appointmentTime, setAppointmentTime ] = useState('');
    const [ appointmentDate, setAppointmentDate ] = useState('');

    const [ patientId, setPatientId ] = useState();
    const [ patientName, setPatientName ] = useState();
    const [ doctorName, setDoctorName ] = useState();

    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    useEffect(() => {
        axios.post('http://localhost/Server/getIndividualAppointment.php', {id: props.appointmentId})
        .then((res) => {
            let data = res.data;
            setAppointmentData(data.appointment);
            setDoctorsData(data.docs);
            setPatientsData(data.pats);
            setAppointmentTime(data.appointment[0].time)
            setAppointmentDate(data.appointment[0].date)
            setPatientId(data.appointment[0].patient_id)
            setPatientName(data.appointment[0].patient + ' ' + data.appointment[0].patient_id)
            setDoctorName(data.appointment[0].doctor);

            let doctorOptions = data.docs.map((x, index) => 
                <option key={ index } value={ x.name_and_surname + ' ' + x.sa_id }>{x.name_and_surname}</option>
            )
            setDoctorsOptions(doctorOptions);

            let patientOptions = data.pats.map((x, index) => 
                <option key={ index } value={ x.name_and_surname + ' ' + x.sa_id }>{x.name_and_surname}</option>
            )
            setPatientsOptions(patientOptions)
        })
        setAppointmentID(props.appointmentId);
    }, [props.appointmentId])

    let selectedPatient = useRef();
    const changePatient = () => {
        let selected = selectedPatient.current.value;
        let nameId =selected
        let sliced = selected.slice(nameId.length - 13, nameId.length)

        setPatientId(sliced)
    }

    let doctor = useRef();
    let id = useRef();
    let time = useRef();
    let date = useRef();
    const [ timeError, setTimeError ] = useState('');
    const [ dateError, setDateError ] = useState('');
    const updatePatient = () => {
        setClickCounter(clickCounter + 1)

        if( clickCounter == 0 ) {
            setInputsDisabled(false);
        } else if( clickCounter == 1 ) {
            setClickCounter(0)
            let doctorName = doctor.current.value;
            let patientName = selectedPatient.current.value;
            let newName = patientName.slice(0, patientName.length - 13);
            let patientId = id.current.value;
            let appointTime = time.current.value;
            let appointDate = date.current.value;
            
            let errors = {
                time: true,
                date: true
            }

            let appointDetails = {
                id: appointmentID,
                doctor: doctorName,
                patient: newName,
                patientId: patientId,
                time: appointTime,
                date: appointDate
            }

            if( appointTime == '' ) {
                setTimeError('Please choose a time');
            } else {
                setTimeError('')
                errors.time = false
            }

            if( appointDate == '' ) {
                setDateError('Please choose a date');
            } else {
                setDateError('')
                errors.date = false
            }

            let errorsResult = Object.values(errors).some(x => x === true);
            let detailsResult = Object.values(appointDetails).some(x => x === '');

            if( !errorsResult && !detailsResult ) {
                axios.post('http://localhost/Server/updateAppointment.php', appointDetails)
                .then((res) => {
                    setClickCounter(0);
                    props.modalOpen(false);
                })
            }
        
        }
    }

    const [ deleteClickCount, setDeleteClickCount ] = useState(0);
    const deleteProfile = () => {
        setDeleteClickCount(deleteClickCount + 1);
        if( deleteClickCount == 1 ) {
            setDeleteClickCount(0);

            axios.post('http://localhost/Server/deleteAppointment.php', {id: appointmentID})
            .then((res) => {
                props.modalOpen(false);
                props.rerenderAppointments(true);
            })
        }
    }

    return (
        <div className={styles.bigContainer}>
            <h5>Doctor Info</h5>
            <div className={styles.firstContainer}>
                <div className={styles.Row}>
                    {/* Input */}
                    <Select
                        className={styles.selectInput}
                        label='Doctor Name'
                        placeholderOption='Please select a doctor'
                        options={ doctorsOptions }
                        ref={ doctor }
                        // errorMessage={ doctorSpecialisationError }
                        defaultValue={ doctorName }
                        disabled={inputsDisabled}
                    />
                    <Select
                        className={styles.selectInput}
                        label='Patient Name'
                        placeholderOption='Please select a patient'
                        options={ patientsOptions }
                        ref={ selectedPatient }
                        onChange={changePatient}
                        defaultValue={ patientName }
                        disabled={inputsDisabled}
                    />

                </div>
                <div className={styles.Row}>
                    <Input
                        className={styles.input}
                        label='Patient ID'
                        placeholder='e.g. 0202215108087'
                        defaultValue={patientId}
                        ref={id}
                        disabled={true}
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        className={styles.input}
                        label='Appointment Time'
                        placeholder='e.g. 10:30:00'
                        defaultValue={appointmentTime}
                        errorMessage={timeError}
                        disabled={inputsDisabled}
                        ref={time}
                    />
                </div>
                <hr />
                <div className={styles.Row}>
                    <Input
                        className={styles.input}
                        label='Date'
                        placeholder='e.g. 20 June 2022'
                        defaultValue={appointmentDate}
                        errorMessage={dateError}
                        disabled={inputsDisabled}
                        ref={date}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={ styles.firstButton }>
                    <Button
                        className={styles.button}
                        label={ deleteClickCount == 1 ? 'Confirm Delete?' : 'Delete Appointment' }
                        onClick={deleteProfile}
                    />
                </div>
                <div className={ styles.lastButtons }>
                    <Button
                        className={styles.button}
                        label='Cancel'
                        onClick={props.clickCancel}
                    />
                    <Button
                        className={styles.button}
                        label={clickCounter == 1 ? 'Update Info' : 'Edit Appointment'}
                        onClick={updatePatient}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddPatient;
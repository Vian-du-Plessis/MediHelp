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
    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ appointmentID, setAppointmentID ] = useState('');
    useEffect(() => {
        axios.post('http://localhost/Server/getIndividualAppointment.php', {id: props.appointmentId})
        .then((res) => {

        })
        setAppointmentID(props.appointmentId);
    }, [props.appointmentId])

    const [ deleteClickCount, setDeleteClickCount ] = useState(0);
    const deleteProfile = () => {
        setDeleteClickCount(deleteClickCount + 1);
        if( deleteClickCount == 1 ) {
            setDeleteClickCount(0);

            axios.post('http://localhost/Server/deleteDoctor.php', {id: appointmentID})
            .then((res) => {
                props.modalOpen(false);
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
                    />
                    <Select
                        className={styles.selectInput}
                        label='Patient Name'
                        placeholderOption='Please select a patient'
                    />

                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    {/* Input */}
                    <Input
                        className={styles.input}
                        label='Patient ID'
                        placeholder='e.g. 0202215108087'
                    />
                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    <Input
                        className={styles.input}
                        label='Appointment Time'
                        placeholder='e.g. 10:30:00'
                    />
                </div>
                <hr />
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='Date'
                        placeholder='e.g. 20 June 2022'
                    />
                    {/* /Inputs */}
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
                    />
                </div>
            </div>
        </div>
    );
};

export default AddPatient;
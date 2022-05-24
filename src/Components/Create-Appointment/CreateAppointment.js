import React from 'react';
import styles from './CreateAppointment.module.scss';

import DatePicker from '../Date-Picker/DatePicker';
import Input from '../Input/Input';
import Select from '../Input/Select';
import Button from '../Button/Button';
const CreateAppointment = () => {
    return (
        <div className={ styles.outerContainer }>
            <div>
                <h1>Create Appointment</h1>
                <hr />
            </div>


            <DatePicker/>
            
            <Input
                label='Time'
                type='time'
            />
            <Select
                placeholderOption='Please Select'
                label='Speciality'
            />
            <Select
                placeholderOption='Please Select'
                label='Doctor'
            />
            <Input
                label='Patient'
                placeholder='Search by name, number or ID'
            />
            <Button
                className={ styles.buttonContainer }
                label='Confirm Appointment'
            />
        </div>
    );
};

export default CreateAppointment;
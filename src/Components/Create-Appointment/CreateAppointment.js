/* React */
import React from 'react';

/* Styling */
import styles from './CreateAppointment.module.scss';

/* Components */
import DatePicker from '../Date-Picker/DatePicker';
import Input from '../Input/Input';
import Select from '../Input/Select';
import Button from '../Button/Button';

const CreateAppointment = () => {
    return (
        <div className={styles.outerContainer}>
            <div>
                <h1>Create Appointment</h1>
                <hr />
            </div>

            {/* DatePicker */}
            <DatePicker/>
            {/* /DatePicker */}
            
            {/* Input */}
            <Input
                label='Time'
                type='time'
            />
            {/* /Input */}

            {/* Selects */}
            <Select
                placeholderOption='Please Select'
                label='Speciality'
            />
            <Select
                placeholderOption='Please Select'
                label='Doctor'
            />
            {/* /Selects */}

            {/* Input */}
            <Input
                label='Patient'
                placeholder='Search by name, number or ID'
            />
            {/* /Input */}

            {/* Button */}
            <Button
                className={styles.buttonContainer}
                label='Confirm Appointment'
            />
            {/* /Button */}
        </div>
    );
};

export default CreateAppointment;
/* React */
import React from 'react';

/* Styling */
import styles from './AddDoctor.module.scss';

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';

const AddPatient = (props) => {
    return (
        <div className={styles.bigContainer}>
            <h5>Doctor Info</h5>
            <div className={styles.firstContainer}>
                <div className={styles.Row}>
                    {/* Input */}
                    <Input
                        className={styles.input}
                        label='First name'
                        placeholder='e.g. John'
                    />
                    <Input
                        className={styles.input}
                        label='Last name'
                        placeholder='e.g. Doe'
                        />
                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    {/* Input */}
                    <Input
                        className={styles.input}
                        label='ID'
                        placeholder='e.g. 9104235140086'
                    />
                    <Input
                        className={styles.input}
                        label='Age'
                        placeholder='e.g. 26'
                    />
                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    {/* ToggleButton */}
                    <ToggleButton
                        label='Gender'
                        rightButton='Male'
                        leftButton='Female'
                    />
                    {/* /ToggleButton */}
                </div>
                <hr />
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='Email'
                        placeholder='e.g. email@provider.com'
                    />
                    <Input
                        className={styles.input}
                        label='Contact No'
                        placeholder='+27 12 34 5678'
                    />
                    {/* /Inputs */}
                </div>
            </div>
            <h5>Additional info</h5>
            <div className={styles.secondContainer}>
                <div className={styles.Row}>
                    {/* Selects */}
                    <Select
                        className={styles.selectContainer}
                        label='Specialisation'
                        placeholderOption='Please select an option'
                    />
                    <Select
                        className={styles.selectContainer}
                        label='Assigned Room'
                        placeholderOption='Please select an option'
                    />
                    {/* /Selects */}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {/* Buttons */}
                <Button
                    className={styles.button}
                    label='Cancel'
                    onClick={props.clickCancel}
                />
                <Button
                    className={styles.button}
                    label='Save'
                    onClick={props.clickSave}
                />
                {/* /Buttons */}
            </div>
        </div>
    );
};

export default AddPatient;
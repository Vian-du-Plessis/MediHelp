import React from 'react';
import styles from './AddPatient.module.scss';

import Input from '../Input/Input';
import Select from '../Input/Select';
import Button from '../Button/Button';
import ToggleButton from '../ToggleButton/ToggleButton';

const AddPatient = ( props ) => {
    return (
        <div className={ styles.bigContainer }>
            <h5>Patient Info</h5>
            <div className={ styles.firstContainer }>
                <div className={ styles.Row }>
                    <Input
                        className={ styles.input }
                        label='First name'
                        placeholder='e.g. John'
                    />
                    <Input
                        className={ styles.input }
                        label='Last name'
                        placeholder='e.g. Doe'
                    />
                </div>
                <div className={ styles.Row }>
                    <Input
                        className={ styles.input }
                        label='ID'
                        placeholder='e.g. 9104235140086'
                    />
                    <Input
                        className={ styles.input }
                        label='Age'
                        placeholder='e.g. 26'
                    />
                </div>
                <div className={ styles.Row }>
                    <ToggleButton
                        label='Gender'
                        rightButton='Male'
                        leftButton='Female'
                    />
                </div>

                <hr />

                <div className={ styles.Row }>
                    <Input
                        className={ styles.input }
                        label='Email'
                        placeholder='e.g. email@provider.com'
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='+27 12 34 5678'
                    />
                </div>
            </div>
            <h5>Medical Aid</h5>
            <div className={ styles.secondContainer }>
                <div className={ styles.Row }>
                    <Select
                        className={ styles.selectContainer }
                        label='Medical Aid Provider'
                        placeholderOption='Please select an option'
                    />
                    <Input
                        className={ styles.input }
                        label='Last name'
                        placeholder='e.g. Doe'
                    />
                </div>
            </div>
            <div className={ styles.buttonContainer }>
                <Button
                    className={ styles.button }
                    label='Cancel'
                    onClick={ props.clickCancel }
                />
                <Button
                    className={ styles.button }
                    label='Save'
                    onClick={ props.clickSave }
                />
            </div>
        </div>
        
    );
};

export default AddPatient;
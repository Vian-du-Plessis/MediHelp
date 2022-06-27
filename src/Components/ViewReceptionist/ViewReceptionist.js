/* React */
import React, {useEffect, useRef, useState} from 'react';

/* Styling */
import styles from './ViewReceptionist.module.scss';

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';
import axios from 'axios';

const ViewPatient = (props) => {

    const [ gender, setGender ] = useState('');
    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    const [ clickCounter, setClickCounter ] = useState(0);
    useEffect(() => {
        axios.post('http://localhost/Server/getIndividualPatient.php', {id: props.patientID})
        .then((res) => {
        }    
    }, [props.receptionId])

    const [ genderValue, setGenderValue ] = useState('Female');
    const getGender = ( e ) => {
        let genderVal = e.currentTarget.innerText
        setGenderValue(genderVal);
        if( document.querySelector('.activeToggle') ) {
            const elements = document.querySelector( '.activeToggle' );
            elements.classList.remove( 'activeToggle' );
        }
        e.currentTarget.classList.add( 'activeToggle' );
    }

    const addPatient = () => {
        setClickCounter(clickCounter + 1);

        if(clickCounter == 0) {
            setInputsDisabled(false);
        } else if(clickCounter == 1) {
            setClickCounter(0);
           
    
            let detailsResult = Object.values(patientWithoutMedDetails).some(item => item === '');
            let errorsResult = Object.values(patientDetailsErrors).some(item => item == true);
            setInputsDisabled(true);
            if( !detailsResult && !errorsResult ) {
                setClickCounter(0)
                axios.post('http://localhost/Server/updatePatient.php', patientDetails)
                .then((res) => {
                    props.openModal(false);
                })
            }
        }
    }

    const [ deleteClickCount, setDeleteClickCount ] = useState(0);
    const deleteProfile = () => {
        setDeleteClickCount(deleteClickCount + 1);
        if( deleteClickCount == 1 ) {
            setDeleteClickCount(0)

            axios.post('http://localhost/Server/deletePatient.php', {id: patientSelectedID})
            .then((res) => {
                props.openModal(false);
            })
        }
    }

return (
    <div className={styles.bigContainer}>
        <h5>Patient Info</h5>
        <div className={styles.firstContainer}>
            <div className={styles.Row}>
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
            </div>
            <div className={styles.Row}>
                <Input
                    className={styles.input}
                    label='Age'
                    placeholder='e.g. 26'
                />
            </div>
            <div className={styles.Row}>
                <ToggleButton
                    label='Gender'
                    rightButton='Male'
                    leftButton='Female'
                />
            </div>
            <hr />
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Email'
                        placeholder='e.g. email@provider.com'
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='012 34 5678'
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Rank'
                        disabled={true}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={ styles.firstButton }>
                    <Button
                        className={styles.button}
                        label={deleteClickCount == 1 ? 'Confirm Delete?' : 'Delete Patient Profile'}
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
                        className={`
                            ${styles.button}
                            ${styles.acceptButton}
                        `}
                        label={clickCounter == 1 ? 'Update Info' : 'Edit Patient'}
                    />
                </div>
            </div>
        </div> 
    );
};

export default ViewReceptionist;
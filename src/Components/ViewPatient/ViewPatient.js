/* React */
import React, {useEffect, useRef, useState} from 'react';

/* Styling */
import styles from './ViewPatient.module.scss';

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';
import axios from 'axios';

const ViewPatient = (props) => {

    const medicalAids = [
        'Bestmed',
        'Bonitas',
        'Discovery Health',
        'Fedhealth',
        'Genesis',
        'Health Squared',
        'Ingwe',
        'Liberty',
        'Medihelp',
        'Medshield',
        'Momentum',
        'Oxygen'
    ]

    const [ medAidOptions, setMedAidOptions ] = useState([]);
    useEffect(() => {
        let options = medicalAids.map((x, index) => 
            <option key={ index }>{x}</option>
        )
        setMedAidOptions(options);
    }, [])

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

    const [ patientNameError, setPatientNameError ] = useState('');
    let patientName = useRef();

    const [ patientLastError, setPatientLastError ] = useState('');
    let patientLast = useRef();

    const [ patientIDError, setPatientIDError ] = useState('');
    let patientID = useRef();

    const [ patientAgeError, setPatientAgeError ] = useState('');
    let patientAge = useRef();

    const [ patientEmailError, setPatientEmailError ] = useState('');
    let patientEmail = useRef();

    const [ patientContactNoError, setPatientContactNoError ] = useState('');
    let patientContactNo = useRef();

    const [ patientMedicalAidError, setPatientMedicalAidError ] = useState('');
    let patientMedicalAid = useRef();

    const [ patientMedicalAidNoError, setPatientMedicalAidNoError ] = useState('');
    let patientMedicalAidNo = useRef();

    const [ patientCalcAge, setPatientCalcAge ] = useState('');
    const calculateAge = () => {
        let id = patientID.current.value;
        let thisYear = new Date().getFullYear();
        let thisYearShort = thisYear.toString().substring(2,4);
        console.log('asgasg')

        let idFirstPart = id.toString().substring(0, 2);
        if( idFirstPart < thisYearShort ) {
            let fullYear = 20 + idFirstPart;
            let age = thisYear - fullYear;
            console.log("🚀 ~ file: AddPatient.js ~ line 85 ~ calculateAge ~ age", age)
            setPatientCalcAge(age);
        } else if( idFirstPart > thisYearShort ) {
            let fullYear = 19 + idFirstPart;
            let age = thisYear - fullYear;
            setPatientCalcAge(age);
        }
    }

    const addPatient = () => {
        const patientDetailsErrors = {
            name: true,
            last: true,
            id: true,
            age: true,
            email: true,
            number: true,
            medProvider: true,
            medNumber: true
        }

        let name = patientName.current.value;
        if( name == '' ) {
            setPatientNameError('Please add a First Name');
            patientDetailsErrors.name = true;
        } else {
            setPatientNameError('');
            patientDetailsErrors.name = false;
        }

        let last = patientLast.current.value;
        if( last == '' ) {
            setPatientLastError('Please add a Last Name');
            patientDetailsErrors.last = true;
        } else {
            setPatientLastError('');
            patientDetailsErrors.last = false;
        }

        let id = patientID.current.value;
        if( id == '' ) {
            setPatientIDError('Please add ID Number');
            patientDetailsErrors.id = true;
        } else if( id.length != 13 ) {
            setPatientIDError('ID must be 13 Numbers Long');
            patientDetailsErrors.id = true;
        } else {
            patientDetailsErrors.id = false;
            setPatientIDError('');
        }

        let age = patientAge.current.value;
        if( age == '' ) {
            setPatientAgeError('Please add a Age');
            patientDetailsErrors.age = true;
        } else {
            setPatientAgeError('');
            patientDetailsErrors.age = false;
        }
        
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = patientEmail.current.value;
        if( email == '' ) {
            setPatientEmailError('Please add an Email');
            patientDetailsErrors.email = true;
        } else if( !email.match(emailRegex) ) {
            setPatientEmailError('Email format is not valid');
            patientDetailsErrors.email = false;
        } else {
            setPatientEmailError('');
            patientDetailsErrors.email = false;
        }

        const numberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        let number = patientContactNo.current.value;
        if( number == '' ) {
            setPatientContactNoError('Please add a Contact Number');
            patientDetailsErrors.number = true;
        } else if( !number.match(numberRegex) ) {
            setPatientContactNoError('This is not a valid number');
            patientDetailsErrors.number = true;
        } else {
            setPatientContactNoError('');
            patientDetailsErrors.number = false;
        }

        let medicalAid = patientMedicalAid.current.value;
        if( medicalAid == '' ) {
            setPatientMedicalAidError('Please select a Medical Aid');
            patientDetailsErrors.medProvider = true;
        } else {
            patientDetailsErrors.medProvider = false;
        }

        let medicalAidNumber = patientMedicalAidNo.current.value;
        if( medicalAidNumber == '' ) {
            setPatientMedicalAidNoError('Please select a Medical Aid');
            patientDetailsErrors.medNumber = true;
        } else if( medicalAidNumber.length > 11 ) {
            setPatientMedicalAidNoError('Medical Aid Number is too long');
            patientDetailsErrors.medNumber = true;
        } else {
            setPatientMedicalAidNoError('');
            patientDetailsErrors.medNumber = false;
        }

        let patientDetails = {
            name: name,
            last: last,
            id: id,
            age: age,
            gender: genderValue,
            email: email,
            number: number,
            medProvider: medicalAid,
            medNumber: medicalAidNumber
        };

        let detailsResult = Object.values(patientDetails).some(item => item === '');
        let errorsResult = Object.values(patientDetails).some(item => item == true);
        
        if( !detailsResult && !errorsResult ) {
            axios.post('http://localhost/Server/addPatient.php', patientDetails)
            .then((res) => {
                if( Array.isArray(res.data) ) {
                    setPatientEmailError(res.data[0]);
                    setPatientIDError(res.data[1]);
                } else if( res.data == 'Email is not available' ) {
                    setPatientEmailError(res.data);
                } else if( res.data == 'ID has already been used' ) {
                    setPatientIDError(res.data);
                } else {
                    props.modalOpen(false);
                }
            })
        }

    }

    return (
        <div className={styles.bigContainer}>
            <h5>Patient Info</h5>
            <div className={styles.firstContainer}>
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='First name'
                        placeholder='e.g. John'
                        ref={ patientName }
                        errorMessage={ patientNameError }
                    />
                    <Input
                        className={styles.input}
                        label='Last name'
                        placeholder='e.g. Doe'
                        ref={ patientLast }
                        errorMessage={ patientLastError }
                    />
                    {/* /Inputs */}
                </div>
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='ID'
                        placeholder='e.g. 9104235140086'
                        ref={ patientID }
                        onChange={ calculateAge }
                        errorMessage={ patientIDError }
                    />
                    <Input
                        className={styles.input}
                        label='Age'
                        placeholder='e.g. 26'
                        ref={ patientAge }
                        errorMessage={ patientAgeError}
                        defaultValue ={ patientCalcAge }
                    />
                    {/* /Inputs */}
                </div>
                <div className={styles.Row}>
                    {/* ToggleButton */}
                    <ToggleButton
                        label='Gender'
                        rightButton='Male'
                        leftButton='Female'
                        onClick={ getGender }
                    />
                    {/* /ToggleButton */}
                </div>
                <hr />
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={ styles.input }
                        label='Email'
                        placeholder='e.g. email@provider.com'
                        ref={ patientEmail }
                        errorMessage={ patientEmailError }
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='012 34 5678'
                        ref={ patientContactNo }
                        errorMessage={ patientContactNoError }
                    />
                    {/* /Inputs */}
                </div>
            </div>
            <h5>Medical Aid</h5>
            <div className={styles.secondContainer}>
                <div className={styles.Row}>
                    {/* Select */}
                    <Select
                        className={styles.selectContainer}
                        label='Medical Aid Provider'
                        placeholderOption='Please select an option'
                        options={ medAidOptions }
                        ref={ patientMedicalAid }
                        errorMessage={ patientMedicalAidError }
                    />
                    <Input
                        className={styles.input}
                        label='Medical Aid Number'
                        placeholder='e.g. 18975'
                        ref={ patientMedicalAidNo }
                        errorMessage={ patientMedicalAidNoError }
                    />
                    {/* /Select */}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {/* Button */}
                <Button
                    className={styles.button}
                    label='Cancel'
                    onClick={props.clickCancel}
                />
                <Button
                    className={styles.button}
                    label='Add Patient'
                    onClick={ addPatient }
                />
                {/* /Button */}
            </div>
        </div> 
    );
};

export default ViewPatient;
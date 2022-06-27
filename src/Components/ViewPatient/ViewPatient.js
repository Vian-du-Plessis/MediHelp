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
    const [ userData, setUserData ] = useState([]);
    const [ gender, setGender ] = useState('');
    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    const [ medAidProviderName, setMedAidProviderName ] = useState(true);
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ patientSelectedID, setPatientSelectedID ] = useState('');
    useEffect(() => {
        axios.post('http://localhost/Server/getIndividualPatient.php', {id: props.patientID})
        .then((res) => {
            let data = res.data;
            let firstName = data.name_and_surname.toString().split(' ')[0];
            let lastName = data.name_and_surname.toString().slice(firstName.length, data.name_and_surname.length - 1);
            let prevAppointment = data.previous_appointments;
            if(prevAppointment == ' ') {
                prevAppointment = 'No Previous Appointments'
            } else {
                prevAppointment = data.previous_appointments
            }
            
            let medNumberValue = '';
            if( data.medAidProvider == '' || data.medAidProvider == ' ' ) {
                medNumberValue = ' ';
            } else {
                medNumberValue = data.medical_aid_number;
            }

            console.log(data.medAidProvider)
            setMedAidProviderName(data.medAidProvider);

            let userData =         
            {
                name: firstName,
                last: lastName,
                id: data.sa_id,
                age: data.age,
                gender: data.gender,
                email: data.email,
                number: data.phone_number,
                prevAppoint: prevAppointment,
                medProvider: data.medAidProvider,
                medNumber: medNumberValue
            }
            setGender(data.gender);
            setPatientCalcAge(data.age);
            setUserData(userData);
        })

        let options = medicalAids.map((x, index) => 
            <option value={x} key={ index }>{x}</option>
        )   
        setMedAidOptions(options);
        setPatientSelectedID(props.patientID);
    }, [props.patientID])

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
        setClickCounter(clickCounter + 1);

        if(clickCounter == 0) {
            setInputsDisabled(false);
        } else if(clickCounter == 1) {
            setClickCounter(0);
            const patientDetailsErrors = {
                name: true,
                last: true,
                id: true,
                age: true,
                email: true,
                number: true,
                medProvider: false,
                medNumber: false
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
            let medicalAidNumber = patientMedicalAidNo.current.value;
            let newMedAidNumber = '';
            if( medicalAid == '' ) {
                newMedAidNumber = ' ';
            } else {
                newMedAidNumber = medicalAidNumber;
            }

            if( medicalAid == '' ) {
                medicalAid = ' '
            } else {
                medicalAid = medicalAid
            }
            
            if( medicalAidNumber == '' ) {
                setPatientMedicalAidNoError('');
            } else if( medicalAidNumber.length > 11 ) {
                setPatientMedicalAidNoError('Medical Aid Number is too long');
                patientDetailsErrors.medNumber = true;
            } else {
                setPatientMedicalAidNoError('');
                patientDetailsErrors.medNumber = false;
            }

            let patientWithoutMedDetails = {
                name: name,
                last: last,
                id: id,
                age: age,
                gender: genderValue,
                email: email,
                number: number,
                rowId: patientSelectedID
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
                medNumber: newMedAidNumber,
                rowId: patientSelectedID
            };
    
            let detailsResult = Object.values(patientWithoutMedDetails).some(item => item === '');
            console.log("🚀 ~ file: ViewPatient.js ~ line 261 ~ addPatient ~ detailsResult", detailsResult)
            let errorsResult = Object.values(patientDetailsErrors).some(item => item == true);
            console.log("🚀 ~ file: ViewPatient.js ~ line 281 ~ addPatient ~ errorsResult", errorsResult)
            setInputsDisabled(true);
            if( !detailsResult && !errorsResult ) {
                setClickCounter(0)
                console.log('asg')
                axios.post('http://localhost/Server/updatePatient.php', patientDetails)
                .then((res) => {
                    console.log(res)
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
                console.log(res)
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
                        ref={ patientName }
                        errorMessage={ patientNameError }
                        defaultValue={userData.name}
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={styles.input}
                        label='Last name'
                        placeholder='e.g. Doe'
                        ref={ patientLast }
                        errorMessage={ patientLastError }
                        defaultValue={userData.last}
                        disabled={inputsDisabled}
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        className={styles.input}
                        label='ID'
                        placeholder='e.g. 9104235140086'
                        ref={ patientID }
                        onChange={ calculateAge }
                        errorMessage={ patientIDError }
                        defaultValue={userData.id}
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={styles.input}
                        label='Age'
                        placeholder='e.g. 26'
                        ref={ patientAge }
                        errorMessage={ patientAgeError}
                        defaultValue ={ patientCalcAge }
                        disabled={inputsDisabled}
                    />
                </div>
                <div className={styles.Row}>
                    <ToggleButton
                        label='Gender'
                        rightButton='Male'
                        leftButton='Female'
                        onClick={ getGender }
                        active={ gender }
                        activeOne='Male'
                        activeTwo='Female'
                    />
                </div>
                <hr />
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Email'
                        placeholder='e.g. email@provider.com'
                        ref={ patientEmail }
                        errorMessage={ patientEmailError }
                        defaultValue={userData.email}
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='012 34 5678'
                        ref={ patientContactNo }
                        errorMessage={ patientContactNoError }
                        defaultValue={userData.number}
                        disabled={inputsDisabled}
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Last Appointment'
                        defaultValue={userData.prevAppoint}
                        disabled={true}
                    />
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
                        defaultValue={ medAidProviderName }
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={styles.input}
                        label='Medical Aid Number'
                        placeholder='e.g. 18975'
                        ref={ patientMedicalAidNo }
                        errorMessage={ patientMedicalAidNoError }
                        defaultValue={userData.medNumber}
                        disabled={inputsDisabled}
                    />
                    {/* /Select */}
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
                        onClick={ addPatient }
                    />
                </div>
            </div>
        </div> 
    );
};

export default ViewPatient;
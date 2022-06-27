/* React */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

/* Styling */
import styles from './ViewDoctor.module.scss';

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';

const AddPatient = (props) => {
    const specialisations = [
        'Endocrinologist',
        'General Practitioner',
        'OB/GYN',
        'Pediatrician',
        'Podiatrist',
        'Psychiatrist',
        'Rheumatologist'
    ]

    const rooms = [
        '3C',
        '2B',
        '7G',
        '4D',
        '1A',
        '6F',
        '5E'
    ]

    const [ gender, setGender ] = useState('');
    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ doctorSelectedId, setDoctorSelectedId ] = useState('');
    const [ userData, setUserData ] = useState([]);
    const [ userAdmin, setUserAdmin ] = useState(false);
    useEffect(() => {
        axios.post('http://localhost/Server/getIndividualDoctor.php', {id: props.doctorId})
        .then((res) => {
            let data = res.data;
            let firstName = data.name_and_surname.toString().split(' ')[0];
            let lastName = data.name_and_surname.toString().slice(firstName.length, data.name_and_surname.length - 1);

            let userDoctorData = {
                name: firstName,
                last: lastName,
                age: data.age,
                email: data.email,
                number: data.phone_number,
                special: data.specialisation,
                room: data.assigned_room
            }

            setGender(data.gender);
            setUserData(userDoctorData);
            setDoctorSelectedId(props.doctorId);
        })
        setUserAdmin(props.userAdmin);
    }, [props.doctorId, props.userAdmin])

    const [ specialisationOptions, setSpecialisationOptions ] = useState([]);
    const [ roomOptions, setRoomOptions ] = useState([]);
    useEffect(() => {
        let options = specialisations.map((x, index) => 
            <option key={ index }>{x}</option>
        )

        let optionsTwo = rooms.map((x, index) => 
            <option key={ index }>{x}</option>
        )
        setRoomOptions(optionsTwo)
        setSpecialisationOptions(options);
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

    const [ doctorNameError, setDoctorNameError ] = useState('');
    let doctorName = useRef();

    const [ doctorLastError, setDoctorLastError ] = useState('');
    let doctorLast = useRef();

    const [ doctorAgeError, setDoctorAgeError ] = useState('');
    let doctorAge = useRef();

    const [ doctorEmailError, setDoctorEmailError ] = useState('');
    let doctorEmail = useRef();

    const [ doctorContactNoError, setDoctorContactNoError ] = useState('');
    let doctorContactNo = useRef();

    const [ doctorSpecialisationError, setDoctoSpecialisationError ] = useState('');
    let doctorSpecialisation = useRef();

    const [ doctorRoomError, setDoctorRoomError ] = useState('');
    let doctorRoom = useRef();

    const addDoctor = () => {
        setClickCounter(clickCounter + 1);

        if(clickCounter == 0) {
            setInputsDisabled(false);
        } else if(clickCounter == 1) {
            const doctorDetailsErrors = {
                name: true,
                last: true,
                age: true,
                email: true,
                number: true,
                specialisation: true,
                room: true
            }
    
            let name = doctorName.current.value;
            if( name == '' ) {
                setDoctorNameError('Please add a First Name');
                doctorDetailsErrors.name = true;
            } else {
                setDoctorNameError('');
                doctorDetailsErrors.name = false;
            }
    
            let last = doctorLast.current.value;
            if( last == '' ) {
                setDoctorLastError('Please add a Last Name');
                doctorDetailsErrors.last = true;
            } else {
                setDoctorLastError('');
                doctorDetailsErrors.last = false;
            }
    
            let age = doctorAge.current.value;
            if( age == '' ) {
                setDoctorAgeError('Please add a Age');
                doctorDetailsErrors.age = true;
            } else {
                setDoctorAgeError('');
                doctorDetailsErrors.age = false;
            }
            
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let email = doctorEmail.current.value;
            if( email == '' ) {
                setDoctorEmailError('Please add an Email');
                doctorDetailsErrors.email = true;
            } else if( !email.match(emailRegex) ) {
                setDoctorEmailError('Email format is not valid');
                doctorDetailsErrors.email = false;
            } else {
                setDoctorEmailError('');
                doctorDetailsErrors.email = false;
            }
    
            const numberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            let number = doctorContactNo.current.value;
            if( number == '' ) {
                setDoctorContactNoError('Please add a Contact Number');
                doctorDetailsErrors.number = true;
            } else if( !number.match(numberRegex) ) {
                setDoctorContactNoError('This is not a valid number');
                doctorDetailsErrors.number = true;
            } else {
                setDoctorContactNoError('');
                doctorDetailsErrors.number = false;
            }
    
            let specialisation = doctorSpecialisation.current.value;
            if( specialisation == '' ) {
                setDoctoSpecialisationError('Please select a Medical Aid');
                doctorDetailsErrors.specialisation = true;
            } else {
                setDoctoSpecialisationError('');
                doctorDetailsErrors.specialisation = false;
            }
    
            let room = doctorRoom.current.value;
            if( room == '' ) {
                setDoctorRoomError('Please enter a room number');
                doctorDetailsErrors.room = true;
            } else {
                setDoctorRoomError('');
                doctorDetailsErrors.room = false;
            }
    
            let doctorDetails = {
                name: name,
                last: last,
                age: age,
                gender: genderValue,
                email: email,
                number: number,
                special: specialisation,
                room: room,
                rowId: doctorSelectedId
            };
    
            let detailsResult = Object.values(doctorDetails).some(item => item === '');
            let errorsResult = Object.values(doctorDetailsErrors).some(item => item == true);
            
            if( !detailsResult && !errorsResult ) {
                axios.post('http://localhost/Server/updateDoctor.php', doctorDetails)
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

            axios.post('http://localhost/Server/deleteDoctor.php', {id: doctorSelectedId})
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
                    <Input
                        className={styles.input}
                        label='First name'
                        placeholder='e.g. John'
                        ref={ doctorName }
                        errorMessage={ doctorNameError }
                        defaultValue={ userData.name }
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={styles.input}
                        label='Last name'
                        placeholder='e.g. Doe'
                        ref={ doctorLast }
                        errorMessage={ doctorLastError }
                        defaultValue={ userData.last }
                        disabled={inputsDisabled}
                    />
                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    {/* Input */}
                    <Input
                        className={styles.input}
                        label='Age'
                        placeholder='e.g. 26'
                        ref={ doctorAge }
                        errorMessage={ doctorAgeError }
                        defaultValue={ userData.age }
                        disabled={inputsDisabled}
                    />
                    {/* /Input */}
                </div>
                <div className={styles.Row}>
                    {/* ToggleButton */}
                    <ToggleButton
                        label='Gender'
                        rightButton='Male'
                        leftButton='Female'
                        onClick={ getGender }
                        active={ gender }
                        activeOne='Male'
                        activeTwo='Female'
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
                        ref={ doctorEmail }
                        errorMessage={ doctorEmailError }
                        defaultValue={ userData.email }
                        disabled={inputsDisabled}
                    />
                    <Input
                        className={styles.input}
                        label='Contact No'
                        placeholder='+27 12 34 5678'
                        ref={ doctorContactNo }
                        errorMessage={ doctorContactNoError }
                        defaultValue={ userData.number }
                        disabled={inputsDisabled}
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
                        options={ specialisationOptions }
                        ref={ doctorSpecialisation }
                        errorMessage={ doctorSpecialisationError }
                        defaultValue={ userData.special }
                        disabled={inputsDisabled}
                    />
                    <Select
                        className={styles.selectContainer}
                        label='Assigned Room'
                        placeholderOption='Please select an option'
                        options={ roomOptions }
                        ref={ doctorRoom }
                        errorMessage={ doctorRoomError }
                        defaultValue={ userData.room }
                        disabled={inputsDisabled}
                    />
                    {/* /Selects */}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={ styles.firstButton }>
                   { userAdmin
                    ?   <Button
                            className={styles.button}
                            label={ deleteClickCount == 1 ? 'Confirm Delete?' : 'Delete Doctor Profile' }
                            onClick={deleteProfile}
                        />
                    :   ''
                    }
                </div>
                <div className={ styles.lastButtons }>
                    {
                        userAdmin
                        ?   <Button
                                className={styles.button}
                                label='Cancel'
                                onClick={props.clickCancel}
                            /> 
                        :   <Button
                                className={styles.button}
                                label='Close'
                                onClick={props.clickCancel}
                            />
                    }
                    { 
                            userAdmin
                        ?   <Button
                            className={styles.button}
                            label={clickCounter == 1 ? 'Update Info' : 'Edit Doctor'}
                            onClick={addDoctor}
                        />
                        :   ''

                    }

                </div>
            </div>
        </div>
    );
};

export default AddPatient;
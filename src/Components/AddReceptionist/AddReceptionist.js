/* React */
import React, {useEffect, useRef, useState} from 'react';

/* Styling */
import styles from './AddReceptionist.module.scss';

import Profile from '../../Assets/Images/profile.jpg'

/* Components */
import Input from '../ui/Input/Input';
import Select from '../ui/Input/Select';
import Button from '../ui/Button/Button';
import ToggleButton from '../ui/ToggleButton/ToggleButton';
import axios from 'axios';

const AddReceptionist = (props) => {
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

    let firstName = useRef();
    const [ firstNameError, setFirstNameError ] = useState('');
    let lastName = useRef();
    const [ lastNameError, setLastNameError ] = useState('');
    let userAge = useRef();
    const [ ageError, setAgeError ] = useState('');
    let userRank = useRef();
    const [ rankError, setRankError ] = useState('');
    let userEmail = useRef();
    const [ emailError, setEmailError ] = useState('');
    let userNumber = useRef();
    const [ numberError, setNumberError ] = useState('');
    let userPassword = useRef();
    const [ passwordError, setPaswordError ] = useState('');
    let userPassConfirm = useRef();
    const [ passwordConfirmError, setPasswordConfirmError ] = useState('');

    const addPatient = () => {
        let errors = {
            name: true,
            last: true,
            age: true,
            rank: true,
            email: true,
            number: true,
            password: true
        }

        let name = firstName.current.value;
        if( name == '' ) {
            setFirstNameError('Please enter a first name');
            errors.name = true;
        } else {
            setFirstNameError('');
            errors.name = false;
        }

        let last = lastName.current.value;
        if( last == '' ) {
            setLastNameError('Please enter a first name');
            errors.last = true;
        } else {
            setLastNameError('');
            errors.last = false;
        }

        let age = userAge.current.value;
        if( age.length > 3 ) {
            setAgeError('Age is not a valid Number');
            errors.age = true
        } else if( age == '' ) {
            setAgeError('Please enter your age');
            errors.age = true
        } else {
            setAgeError('');
            errors.age = false
        }

        let rank = userRank.current.value;
        if( rank == '' ) {
            setRankError('Please enter a rank')
            errors.rank = true
        } else if ( rank > 1 ) {
            setRankError('Rank can only be 0 or 1')
            errors.rank = true
        } else {
            setRankError('')
            errors.rank = false
        }

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = userEmail.current.value;
        if( email == ' ' ) {
            setEmailError('Please add an Email');
            errors.email = true;
        } else if( !email.match(emailRegex) ) {
            setEmailError('Email format is not valid');
            errors.email = false;
        } else {
            setEmailError('');
            errors.email = false;
        }

        const numberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        let number = userNumber.current.value;
        if( number == '' ) {
            setNumberError('Please add a Contact Number');
            errors.number = true;
        } else if( !number.match(numberRegex) ) {
            setNumberError('This is not a valid number');
            errors.number = true;
        } else {
            setNumberError('');
            errors.number = false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
        let password = userPassword.current.value;
        let passConfirm = userPassConfirm.current.value;
        if( password == '' ) {
            setPaswordError('Please enter a password');
            errors.password = true;
        } else if( !password.match(passwordRegex) ) {
            setPaswordError('Your password does not meet the requirements');
            errors.password = true;
        } else {
            setPaswordError('');
            errors.password = false;
        }

        if( password != passConfirm ) {
            setPasswordConfirmError('Passwords does not match');
            errors.password = true;
        } else {
            setPasswordConfirmError('');
            errors.password = false;
        }

        let receptionistDetails = {
            name: name,
            last: last,
            age: age,
            gender: genderValue,
            rank: rank,
            email: email,
            number: number,
            pass: password
        }

        let detailsResult = Object.values(receptionistDetails).some(item => item === '');
        let errorsResult = Object.values(errors).some(item => item == true);
        
        if( !detailsResult && !errorsResult ) {
            axios.post('http://localhost/Server/addReceptionist.php', receptionistDetails)
            .then((res) => {
                if( res.data == 'Email is not available' ) {
                    setEmailError(res.data);
                } else {
/*                     console.log(res);
                    props.modalOpen(false); */
                }
            })
        }

    }

    return (
        <div className={styles.bigContainer}>
            <h5>Receptionist Info</h5>
            <div className={styles.firstContainer}>
                <div className={styles.Row}>
                    <div className={styles.imageContainer}>
                        <img src={Profile} alt="" />
                    </div>
                    <Input
                        className={styles.imageInput}
                        label='Choose profile picture'
                        type='file'
                    />
                </div>
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='First name'
                        placeholder='e.g. John'
                        ref={firstName}
                        errorMessage={firstNameError}
                    />
                    <Input
                        className={styles.input}
                        label='Last name'
                        placeholder='e.g. Doe'
                        ref={lastName}
                        errorMessage={lastNameError}
                    />
                    {/* /Inputs */}
                </div>
                <div className={styles.Row}>
                    {/* Inputs */}
                    <Input
                        className={styles.input}
                        label='Age'
                        placeholder='e.g. 26'
                        ref={userAge}
                        errorMessage={ageError}
                    />
                    <Input
                        className={styles.input}
                        label='Admin Rank'
                        placeholder='e.g. 0 or 1'
                        ref={userRank}
                        errorMessage={rankError}
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
                        active={ genderValue }
                        activeOne={ !genderValue }
                        activeTwo={ genderValue }
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
                        ref={userEmail}
                        errorMessage={emailError}
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='012 34 5678'
                        ref={userNumber}
                        errorMessage={numberError}
                    />
                    {/* /Inputs */}
                </div>
            </div>
            <h5>Password</h5>
            <div className={styles.secondContainer}>
                <div className={styles.Row}>
                    {/* Select */}
                    <Input
                        className={styles.input}
                        label='Password'
                        placeholder='Enter your password'
                        ref={userPassword}
                        errorMessage={passwordError}
                    />
                    <Input
                        className={styles.input}
                        label='Confirm Password'
                        placeholder='Confirm your password'
                        ref={userPassConfirm}
                        errorMessage={passwordConfirmError}
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

export default AddReceptionist;
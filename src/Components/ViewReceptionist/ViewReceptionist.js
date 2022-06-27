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

const ViewReceptionist = (props) => {

    const [ gender, setGender ] = useState('');
    const [ inputsDisabled, setInputsDisabled ] = useState(true);
    const [ clickCounter, setClickCounter ] = useState(0);
    const [ userData, setUserData ] = useState([]);
    const [ userAdmin, setUserAdmin ] = useState([]);
    const [ canEdit, setCanEdit ] = useState(false);
    const [ updateId, setUpdateId] = useState('');
    useEffect(() => {
        let loggedOnId = sessionStorage.getItem('adminId');

        axios.post('http://localhost/Server/getIndividualReceptionist.php', props.receptionId)
        .then((res) => {
            let data = res.data;
            setGender(data.gender)
            let userData = {
                name: data.name_and_surname.split(' ')[0],
                last: data.name_and_surname.split(' ')[1],
                age: data.age,
                gender: data.gender,
                number: data.phone_number,
                email: data.email,
                admin: data.admin
            }

            setUserData(userData);
            setUserAdmin(props.userAdmin);
            setUpdateId(props.receptionId);
        })

        if(props.userAdmin == true) {
            setCanEdit(true)
        } else if(props.userAdmin == false && loggedOnId == props.receptionId ) {
            setCanEdit(true);
        } else {
            setCanEdit(false);
        }
    }, [props.receptionId, props.userAdmin])

    const [ genderValue, setGenderValue ] = useState('Female');
    const getGender = ( e ) => {
        let genderVal = e.currentTarget.innerText
        console.log("🚀 ~ file: ViewReceptionist.js ~ line 55 ~ getGender ~ genderVal", genderVal)
        setGenderValue(genderVal);
        if( document.querySelector('.activeToggle') ) {
            const elements = document.querySelector( '.activeToggle' );
            elements.classList.remove( 'activeToggle' );
        }
        e.currentTarget.classList.add( 'activeToggle' );
    }

    let name = useRef();
    let last = useRef();
    let age = useRef();
    let email = useRef();
    let number = useRef();
    let rank = useRef();
    const [ nameError, setNameError ] = useState('');
    const [ lastError, setLastError ] = useState('');
    const [ ageError, setAgeError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ numberError, setNumberError ] = useState('');
    const [ rankError, setRankError ] = useState('');

     const editPatient = () => {
        setClickCounter(clickCounter + 1);

        if(clickCounter == 0 ) {
            setInputsDisabled(false);
        } else if(clickCounter == 1) {
            setClickCounter(0);

            let errors = {
                name: true,
                last: true,
                age: true,
                email: true,
                number: true,
                rank: true,
            }

            let username = name.current.value;
            if(username == '' || username == ' ') {
                errors.name = true;
                setNameError('Please fill in your name');
            } else {
                errors.name = false
                setNameError('')
            }
            let lastname = last.current.value;
            if(lastname == '' || lastname == ' ') {
                errors.last = true;
                setLastError('Please fill in your last name');
            } else {
                errors.last = false
                setLastError('')
            }
            let userage = age.current.value;
            if(userage == '' || userage == ' ') {
                errors.age = true;
                setAgeError('Please fill in your age');
            } else {
                errors.age = false
                setAgeError('')
            }
            let useremail = email.current.value;
            if(useremail == '' || useremail == ' ') {
                errors.email = true;
                setEmailError('Please fill in your email');
            } else {
                errors.email = false
                setEmailError('')
            }
            let usernumber = number.current.value;
            if(usernumber == '' || usernumber == ' ') {
                errors.number = true;
                setNumberError('Please fill in your number');
            } else {
                errors.number = false
                setNumberError('')
            }
            let userRank = rank.current.value;
            if(userRank == '' || userRank == ' ') {
                errors.rank = true;
                setRankError('Please fill in your rank');
            } else {
                errors.rank = false
                setRankError('')
            }

            let userDetails = {
                name: username,
                last: lastname,
                age: userage,
                gender: genderValue,
                email: useremail,
                number: usernumber,
                rank: userRank,
                id: updateId
            }
    
            let detailsResult = Object.values(userDetails).some(item => item === '');
            let errorsResult = Object.values(errors).some(item => item == true);
            setInputsDisabled(true);
            if( !detailsResult && !errorsResult ) {
                setClickCounter(0)
                axios.post('http://localhost/Server/updateReceptionist.php', userDetails)
                .then((res) => {
                    console.log("🚀 ~ file: ViewReceptionist.js ~ line 160 ~ .then ~ res", res)
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

            axios.post('http://localhost/Server/deletePatient.php', {id: 1})
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
                    ref={name}
                    errorMessage={nameError}
                    defaultValue={userData.name}
                    disabled={inputsDisabled}
                />
                <Input
                    className={styles.input}
                    label='Last name'
                    placeholder='e.g. Doe'
                    defaultValue={userData.last}
                    disabled={inputsDisabled}
                    ref={last}
                    errorMessage={lastError}
                />
            </div>
            <div className={styles.Row}>
                <Input
                    className={styles.input}
                    label='Age'
                    placeholder='e.g. 26'
                    defaultValue={userData.age}
                    disabled={inputsDisabled}
                    ref={age}
                    errorMessage={ageError}
                />
            </div>
            <div className={styles.Row}>
                <ToggleButton
                    label='Gender'
                    rightButton='Male'
                    leftButton='Female'
                    onClick={getGender}
                    active={ gender }
                    activeOne='Male'
                    activeTwo='Female'
                    disabled={inputsDisabled}
                />
            </div>
            <hr />
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Email'
                        placeholder='e.g. email@provider.com'
                        defaultValue={userData.email}
                        disabled={inputsDisabled}
                        ref={email}
                        errorMessage={emailError}
                    />
                    <Input
                        className={ styles.input }
                        label='Contact No'
                        placeholder='012 34 5678'
                        defaultValue={userData.number}
                        disabled={inputsDisabled}
                        ref={number}
                        errorMessage={numberError}
                    />
                </div>
                <div className={styles.Row}>
                    <Input
                        className={ styles.input }
                        label='Rank'
                        disabled={ userAdmin ? inputsDisabled : true}
                        defaultValue={userData.admin}
                        ref={rank}
                        errorMessage={rankError}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={ styles.firstButton }>
                    {
                        userAdmin
                        ?   <Button
                                className={styles.button}
                                label={deleteClickCount == 1 ? 'Confirm Delete?' : 'Delete Patient Profile'}
                                onClick={deleteProfile}
                            />
                        : ''
                    }

                </div>
                <div className={ styles.lastButtons }>
                    {
                        canEdit
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
                        canEdit 
                        ?   <Button
                                className={`
                                    ${styles.button}
                                    ${styles.acceptButton}
                                `}
                                onClick={editPatient}
                                label={clickCounter == 1 ? 'Update Info' : 'Edit Profile'}
                            />
                        : ''
                    }

                </div>
            </div>
        </div> 
    );
};

export default ViewReceptionist;
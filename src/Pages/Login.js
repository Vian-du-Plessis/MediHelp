/* React */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* Styling */
import styles from './Login.module.scss';

/* Images */
import LoginImage from '../Assets/SVG/Login-Image.svg';
import Logo from '../Assets/SVG/MediHelp-Main-Logo.svg';

/* Components */
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';

const Login = () => {

    const navigate = useNavigate();

    //Error Messages for inputs
    const [errorMessages, setErrorMessages] = useState({
        emailError: '',
        passError: ''
    });

    //If there is any errors and the user starts typing the error will be cleared.
    const clearErrors = () => {
        setErrorMessages({...errorMessages, emailError: '', passError: ''});
    }

    // Ref's to get email and password values on Button Click
    let getEmailValue = useRef();
    let getPasswordValue = useRef();
    const handleLogin = () => {
        let emailVal = getEmailValue.current.value;
        let passVal = getPasswordValue.current.value;

        let inputs = {
            email: emailVal,
            password: passVal
        }

        if(emailVal === '' || passVal === '') {
            //This will execute if any of the inputs is empty and does not contain values
            setErrorMessages({...errorMessages, emailError: 'Please provide your email', passError: 'Please provide your password'});
        } else {
            //This will execute if both inputs contains values
            axios.post('http://localhost/Server/userLogin.php', inputs)
            .then((res) => {                
                if(res.data === true) {
                    //If this user exists on the database this will execute
                    sessionStorage.setItem('loggedOnUser', inputs.email);
                    navigate('/appointments');
                } else {
                    //This will execute if the values from the inputs cannot be referenced back to the database.
                    setErrorMessages({...errorMessages, emailError: 'Email or Password Invalid'});
                }
            });
        }
    }
    
    const [inputIconPass, setInputIconPass] = useState('show-password');
    const [passInputType, setPassInputType] = useState('password');
    //Function to show the users password and also hide it
    const passwordShowHide = () => {
        if(passInputType == 'password') {
            //This will show the users password in normal text
            setPassInputType('text');
            setInputIconPass('hide-password');
        } else {
            //This will hide the users password
            setPassInputType('password');
            setInputIconPass('show-password');
        } 
    };

    return (
        <div className={ styles.container }>
            <div className={ styles.container__image }>
                <img className={ styles.container__imageElement }
                    src={ LoginImage }
                />
            </div>

            <div className={ styles.container__form }>
                <img className={ styles.container__form__imageElement }
                    src={ Logo }
                />

                <div className={ styles.container__inputs }>
                    {/* Inputs */}
                    <Input
                        label='Email'
                        ref={ getEmailValue }
                        placeholder='Enter your email'
                        onChange={ clearErrors }
                        errorMessage={ errorMessages.emailError }
                    />
                    <Input
                        label='Password'
                        ref={ getPasswordValue }
                        type={ passInputType }
                        placeholder='Enter your password'
                        onChange={ clearErrors }
                        iconRight={ inputIconPass }
                        iconClick={ passwordShowHide }
                        errorMessage={ errorMessages.passError }
                    />
                    {/* ./Inputs */}
                </div>

                <div className={ styles.container__text }>
                    <a className={ styles.container__textElement }
                        href=''
                    >
                        Forgot Password?
                    </a>
                </div>
                
                {/* Button */}
                <Button
                    className={ styles.container__buttonElement }
                    onClick={ handleLogin }
                    label='Login' 
                />
                {/* ./Button */}
            </div>
        </div>
    );
};

export default Login;
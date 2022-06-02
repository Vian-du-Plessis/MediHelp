import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.scss';
import LoginImage from '../Assets/SVG/Login-Image.svg';
import Logo from '../Assets/SVG/MediHelp-Main-Logo.svg';
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Icon from '../Components/Icon/Icon';

const Login = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const emailValue = (e) => {
        const value = e.target.value;
        setInputs({...inputs, email: value});
        console.log(inputs)
    }

    const passwordValue = (e) => {
        const value = e.target.value;
        setInputs({...inputs, password: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('gasgf')

        axios.post('http://localhost/Server/userLogin.php', inputs)
        .then((res) => {
            console.log(res)

            if(res.data === true) {
                sessionStorage.setItem('loggedOnUser', inputs.email);
                navigate('/appointments');
            } else {
                console.log('not working');
            }
        })

        console.log(inputs);
    }

    const [inputIconPass, setInputIconPass] = useState('show-password');
    const [passInputType, setPassInputType] = useState('password');
    const passwordShowHide = () => {
        if(passInputType == 'password') {
            setPassInputType('text');
            setInputIconPass('hide-password');
        } else {
            setPassInputType('password');
            setInputIconPass('show-password');
        } 
    };

    return (
        <div className={ styles.container }>
            <div className={ styles.container__left }>
                <img
                    className={` 
                        ${ styles.background__image } 
                        ${ styles.animate__slide__from__left } 
                    `}
                    src={ LoginImage }
                />
            </div>
            <div className={ styles.container__right }>
                <img
                    className={` 
                        ${ styles.logo__image } 
                        ${ styles.animate__slide__from__right__logo } 
                    `}
                    src={ Logo }
                />

                <div className={`
                    ${ styles.inputs__container }
                    ${ styles.animate__slide__from__right }
                `}>
                    <Input
                        label='Email'
                        placeholder='Enter your email'
                        onChange={emailValue}
                    />
                    <Input
                        label='Password'
                        type={ passInputType }
                        placeholder='Enter your password'
                        iconSide='Right'
                        iconName={ inputIconPass }
                        iconClick={ passwordShowHide }
                        errorMessage='Wrong password'
                        onChange={passwordValue}
                    />
                </div>

                <div className={` 
                    ${ styles.link__container }
                    ${ styles.animate__slide__from__right }
                `}>
                    <a href='' className={` 
                        ${ styles.link__container } 
                    `}>
                        Forgot Password?
                    </a>
                </div>



                <Button
                    className={`
                        ${ styles.submit__button }
                        ${ styles.animate__slide__from__right }
                    `}
                    label={ 'Login' }
                    icon='right-arrow'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Login;
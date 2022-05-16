import React, { useState } from 'react';
import styles from './Login.module.scss';
import LoginImage from '../Assets/SVG/Login-Image.svg';
import Logo from '../Assets/SVG/MediHelp-Main-Logo.svg';
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Icon from '../Components/Icon/Icon';

const Login = () => {

    const [inputIconPass, setInputIconPass] = useState( 'show-password' );
    const [passInputType, setPassInputType] = useState( 'password' );
    const passwordShowHide = () => {
        if( passInputType == 'password' ) {
            setPassInputType( 'text' );
            setInputIconPass( 'hide-password' );
            console.log("Show password");
        } else {
            setPassInputType( 'password' );
            setInputIconPass( 'show-password' );
            console.log("hide password");
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
                    />
                    <Input
                        label='Password'
                        type={ passInputType }
                        placeholder='Enter your password'
                        iconSide='Right'
                        iconName={ inputIconPass }
                        iconClick={ passwordShowHide }
                        errorMessage='Wrong password'
                    />
                </div>

                <a href='' className={ styles.link__container }>
                    Forgot Password?
                </a>

                <Button
                    className={`
                        ${ styles.submit__button }
                        ${ styles.animate__slide__from__right }
                    `}
                    label={ 'Login' }
                    icon='right-arrow'
                />
            </div>
        </div>
    );
};

export default Login;
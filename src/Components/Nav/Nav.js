import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import Logo from '../../Assets/SVG/MediHelp-Page-Logo.svg';
import LogoSmall from '../../Assets/SVG/MediHelp-Heart-Logo.svg';
import Icon from '../Icon/Icon';

const Nav = () => {
    return (
        <div className={ styles.container }>

            <img
                className={ styles.logo__big }
                src={ Logo }
                alt='Logo'
            />

            <img
                className={ styles.logo__small }
                src={ LogoSmall }
                alt='Logo'
            />

            <hr/>

            <NavLink to='/' className={ ({ isActive }) => isActive ? styles.active__link : styles.unselected }>
                <div className={ styles.icon__link__container }>
                    <div></div>
                        <Icon
                            className={ styles.link__icon }
                            icon='appointment'
                        />
                        <p>Appointments</p>
                    <div></div>
                </div>
            </NavLink>

            <NavLink to='/Login' className={ ({ isActive }) => isActive ? styles.active__link : styles.unselected }>
                <div className={ styles.icon__link__container }>
                    <div></div>
                        <Icon
                            className={ styles.link__icon }
                            icon='patients'
                        />
                        <p>Patients</p>
                    <div></div>
                </div>
            </NavLink>

            <NavLink to='/New' className={ ({ isActive }) => isActive ? styles.active__link : styles.unselected }>
                <div className={ styles.icon__link__container }>
                    <div></div>
                        <Icon
                            className={ styles.link__icon }
                            icon='doctors'
                        />
                        <p>Doctors</p>
                    <div></div>
                </div>
            </NavLink>

        </div>
    );
};

export default Nav;
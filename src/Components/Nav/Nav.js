/* React */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Styling */
import styles from './Nav.module.scss';

/* Images */
import Logo from '../../Assets/SVG/MediHelp-Page-Logo.svg';
import LogoSmall from '../../Assets/SVG/MediHelp-Heart-Logo.svg';

/* Components */
import Icon from '../Icon/Icon';

const Nav = () => {
    return (
        <div className={styles.container}>
            <img
                className={styles.logo__big}
                src={ Logo }
                alt='Logo'
            />

            <img
                className={styles.logo__small}
                src={ LogoSmall }
                alt='Logo'
            />
            <hr/>
            <NavLink to='/Appointments' className={({ isActive }) => isActive ? styles.active__link : styles.unselected}>
                <div className={styles.icon__link__container}>
                    <div></div>
                        {/* Icon */}
                        <Icon
                            className={styles.link__icon}
                            icon='appointment'
                        />
                        {/* /Icon */}
                        <p>Appointments</p>
                    <div></div>
                </div>
            </NavLink>

            <NavLink to='/Patients' className={({ isActive }) => isActive ? styles.active__link : styles.unselected}>
                <div className={styles.icon__link__container}>
                    <div></div>
                        {/* Icon */}
                        <Icon
                            className={styles.link__icon}
                            icon='patients'
                        />
                        {/* /Icon */}
                        <p>Patients</p>
                    <div></div>
                </div>
            </NavLink>

            <NavLink to='/Doctors' className={({ isActive }) => isActive ? styles.active__link : styles.unselected}>
                <div className={styles.icon__link__container}>
                    <div></div>
                        {/* Icon */}
                        <Icon
                            className={styles.link__icon}
                            icon='doctors'
                        />
                        {/* /Icon */}
                        <p>Doctors</p>
                    <div></div>
                </div>
            </NavLink>

            <div className={`
                ${ styles.logout__link__container }
            `}>
                {/* Icon */}
                <Icon
                    className={ styles.link__icon }
                    icon='logout'
                />
                {/* /Icon */}
                <p>Logout</p>
            </div>
        </div>
    );
};

export default Nav;
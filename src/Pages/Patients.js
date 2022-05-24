import React from 'react';

/* Import SCSS */
import styles from './Patients.module.scss';

/* Import Images */
import ProfileImage from '../Assets/SVG/profile.svg';

/* Import Components */
import PatientTableItem from '../Components/PatientTableItem/PatientTableItem';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import SearchInput from '../Components/Input/SearchInput';
import Button from '../Components/Button/Button';

const Patients = () => {
    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search...'
                    />
                    <div className={ styles.topContainer__profileContainer }>
                        <img src={ ProfileImage } alt="" />
                        <p>Susan</p>
                    </div>
                </div>
                <div className={ styles.middleContainer__headerContainer }>
                    <div className={ styles.headerContainer__main }>
                        <h3>Patients</h3>
                        <Button
                            className={ styles.button }
                            label='Add patient'
                        />
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
                <PatientTableItem/>
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Patients;
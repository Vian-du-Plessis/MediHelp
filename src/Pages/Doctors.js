import React, { useState } from 'react';

/* Import SCSS */
import styles from './Doctors.module.scss';

/* Import Images */
import ProfileImage from '../Assets/SVG/profile.svg';

/* Import Components */
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import SearchInput from '../Components/Input/SearchInput';
import DoctorCard from '../Components/DoctorCard/DoctorCard';
import AddDoctor from '../Components/AddDoctor/AddDoctor';
import Button from '../Components/Button/Button';

const Patients = () => {

    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const openAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }
    const closeAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }

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
                        <h3>
                            { 
                                addPatientOpen 
                                ? 'Add doctor' 
                                : 'Doctors' 
                            }
                        </h3>
                        { 
                            !addPatientOpen
                            &&
                            <Button
                                className={ styles.button }
                                label='Add doctor'
                                onClick={() => openAddPatient() }
                            />
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
                <div className={ styles.middleContainer__content }>
                    {
                        !addPatientOpen
                        ? <DoctorCard/>
                        : <AddDoctor
                            clickCancel={() => closeAddPatient()}
                        />
                    }
                </div>

            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Patients;
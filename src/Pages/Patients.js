import React, { useState } from 'react';

/* Import SCSS */
import styles from './Patients.module.scss';

/* Import Images */
import ProfileImage from '../Assets/SVG/profile.svg';

/* Import Components */
import PatientTableItem from '../Components/PatientTableItem/PatientTableItem';
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import SearchInput from '../Components/ui/Input/SearchInput';
import Button from '../Components/ui/Button/Button';
import AddPatient from '../Components/AddPatient/AddPatient';

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
                                ? 'Add patient' 
                                : 'Patients' 
                            }
                        </h3>
                        { 
                            !addPatientOpen
                            &&
                            <Button
                                className={ styles.button }
                                label='Add patient'
                                onClick={() => openAddPatient() }
                            />
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
                { 
                    !addPatientOpen 
                    ? <PatientTableItem/>
                    : <AddPatient
                        clickCancel={() => closeAddPatient()}
                    />
                }
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Patients;
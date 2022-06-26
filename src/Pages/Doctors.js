import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/* Import SCSS */
import styles from './Doctors.module.scss';

/* Import Images */
import ProfileImage from '../Assets/SVG/profile.svg';

/* Import Components */
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import SearchInput from '../Components/ui/Input/SearchInput';
import DoctorCard from '../Components/DoctorCard/DoctorCard';
import AddDoctor from '../Components/AddDoctor/AddDoctor';
import Button from '../Components/ui/Button/Button';

const Patients = () => {

    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const [ doctors, setDoctors ] = useState([]);
    const [ doctorsSearch, setDoctorsSearch ] = useState([]);
    const [ isSearchValue, setIsSearchVal ] = useState(false);
    const [ searchVal, setSearchVal ] = useState({search: ''})

    const openAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }
    
    const closeAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }

    useEffect(() => {
        axios.post('http://localhost/Server/getDoctors.php')
        .then( ( res ) => {
            setDoctors(res.data)
        });
    }, [setIsSearchVal, addPatientOpen]); 

    let sValue = useRef();
    const searchValue = () => {
        let value = sValue.current.value;
        console.log("🚀 ~ file: Doctors.js ~ line 44 ~ searchValue ~ value", value)
        setSearchVal({...searchVal, search: value});

        value.length > 0
        ? setIsSearchVal(true)
        : setIsSearchVal(false)

        axios.post('http://localhost/Server/searchDoctors.php', searchVal)
        .then( ( res ) => {
            setDoctorsSearch(res.data.users)
        });
    }

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search by name, specialisation or ID '
                        ref={ sValue }
                        change={ searchValue }
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
                        !addPatientOpen && !isSearchValue
                        ? doctors.map(( item, index ) => <DoctorCard 
                            name={item.name_and_surname}
                            id={item.id}
                            specialisation={item.specialisation}
                            key={index}
                        />)
                        : isSearchValue && !addPatientOpen
                        ? doctorsSearch.map(( item, index ) => <DoctorCard 
                            name={item.name_and_surname}
                            id={item.id}
                            specialisation={item.specialisation}
                            key={index}
                        />)
                        : <AddDoctor
                            clickCancel={() => closeAddPatient()}
                            modalOpen={item => setAddPatientOpen(item)}
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
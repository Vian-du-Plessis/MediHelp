import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
import ViewDoctor from '../Components/ViewDoctor/ViewDoctor';

const Patients = () => {

    
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ userAdmin, setUserAdmin ] = useState('');
    const [ userProfile, setProfile ] = useState('');
    useEffect(() => {
        let loggedUser =  sessionStorage.getItem('loggedOnUser');
        let loggedUserName = sessionStorage.getItem('adminName');
        let loggedUserAdmin = sessionStorage.getItem('rank');
        let image = sessionStorage.getItem('adminProfile');
        setProfile(image);

        setUsername(loggedUserName);
        if( loggedUserAdmin == 1 || loggedUserAdmin == '1') {
            setUserAdmin(loggedUserAdmin);
        } else {
            setUserAdmin(false);
        }
        if( loggedUser == '' || loggedUser == ' ' || loggedUser == undefined || loggedUser == null ) {
            navigate('/')
        } 
    }, [])

    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const [ doctors, setDoctors ] = useState([]);
    const [ doctorsSearch, setDoctorsSearch ] = useState([]);
    const [ isSearchValue, setIsSearchVal ] = useState(false);
    const [ searchVal, setSearchVal ] = useState({search: ''})
    const [ doctorsId, setDoctorsId ] = useState('');
    const [ showDoctorsInfo, setDoctorsInfo ] = useState('');

    const openAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }
    
    const closeAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }

    const closeDoctorInfo = () => {
        setDoctorsInfo(!showDoctorsInfo)
    }

    useEffect(() => {
        axios.post('http://localhost/Server/getDoctors.php')
        .then( ( res ) => {
            setDoctors(res.data)
        });
    }, [setIsSearchVal, addPatientOpen, showDoctorsInfo]); 

    let sValue = useRef();
    const searchValue = () => {
        let value = sValue.current.value;
        setSearchVal({...searchVal, search: value});

        value.length > 0
        ? setIsSearchVal(true)
        : setIsSearchVal(false)

        axios.post('http://localhost/Server/searchDoctors.php', searchVal)
        .then( ( res ) => {
            if(res.data == false) {
                setDoctorsSearch([]);
            } else {
                setDoctorsSearch(res.data.users)
            }
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
                        <img src={'http://localhost/Server/' + userProfile} alt="" />
                        <p>{username}</p>
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
                            userAdmin && !addPatientOpen && !showDoctorsInfo
                            ?   <Button
                                    className={ styles.button }
                                    label='Add doctor'
                                    onClick={() => openAddPatient() }
                                />
                            : ''
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                </div>
                <div className={ styles.middleContainer__content }>

                    {
                            showDoctorsInfo
                        ?   <ViewDoctor
                                clickCancel={() => closeDoctorInfo()}
                                doctorId={doctorsId}
                                modalOpen={item => setDoctorsInfo(item)}
                                userAdmin={userAdmin}
                            />
                        :   !addPatientOpen && !isSearchValue
                        ?   doctors.map(( item, index ) => <DoctorCard 
                                name={item.name_and_surname}
                                id={item.id}
                                specialisation={item.specialisation}
                                key={index}
                                src={'http://localhost/Server/' + item.profile_image}
                                doctorId={item => setDoctorsId(item)}
                                showDoctorInfo={item => setDoctorsInfo(item)}
                            />)
                        :   isSearchValue && !addPatientOpen
                        ?   doctorsSearch.map(( item, index ) => <DoctorCard 
                                name={item.name_and_surname}
                                id={item.id}
                                specialisation={item.specialisation}
                                key={index}
                                src={'http://localhost/Server/' + item.profile_image}
                                doctorId={item => setDoctorsId(item)}
                                showDoctorInfo={item => setDoctorsInfo(item)}
                            />)
                        :   <AddDoctor
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
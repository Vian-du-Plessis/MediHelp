import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


/* Import SCSS */
import styles from './Reception.module.scss';

/* Import Images */
import ProfileImage from '../Assets/SVG/profile.svg';

/* Import Components */
import CreateAppointment from '../Components/Create-Appointment/CreateAppointment';
import SearchInput from '../Components/ui/Input/SearchInput';
import Button from '../Components/ui/Button/Button';
import ReceptionistCard from '../Components/ReceptionistCard/ReceptionistCard';

const Patients = () => {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ userAdmin, setUserAdmin ] = useState('');
    useEffect(() => {
        let loggedUser =  sessionStorage.getItem('loggedOnUser');
        let loggedUserName = sessionStorage.getItem('adminName');
        let loggedUserAdmin = sessionStorage.getItem('rank');
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

    const [ userData, setUserData ] = useState([]);
    useEffect(() => {
        axios.post('http://localhost/Server/getReceptionists.php')
        .then((res) => {
            let cardItem = res.data.map((item) => 
                <ReceptionistCard
                    src=''
                    name={item.name_and_surname}
                    age={item.age}
                    email={item.email}
                    rank={item.admin}
                />   
            )
            setUserData(cardItem);
        })
    })


    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search by name, number or ID'
                    />
                    <div className={ styles.topContainer__profileContainer }>
                        <img src={ ProfileImage } alt="" />
                        <p>{username}</p>
                    </div>
                </div>
                <div className={ styles.middleContainer__headerContainer }>
                    <div className={ styles.headerContainer__main }>
                        <h3>
                            { 
                                'Receptionists'
                            }
                        </h3>
                        {   
                            <Button
                                className={ styles.button }
                                label='Add Receptionist'
                            />
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>

                </div>
                <div className={ styles.containerReceptionCards }>
                    {userData}
                </div>
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Patients;
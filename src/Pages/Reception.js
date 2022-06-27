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
import ViewReceptionist from '../Components/ViewReceptionist/ViewReceptionist';
import AddReceptionist from '../Components/AddReceptionist/AddReceptionist';

const Reception = () => {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ userAdmin, setUserAdmin ] = useState('');
    useEffect(() => {
        let loggedUser =  sessionStorage.getItem('loggedOnUser');
        let loggedUserName = sessionStorage.getItem('adminName');
        let loggedUserAdmin = sessionStorage.getItem('rank');
        setUsername(loggedUserName);
        if( loggedUserAdmin == 1 || loggedUserAdmin == '1') {
            setUserAdmin(true);
        } else {
            setUserAdmin(false);
        }
        if( loggedUser == '' || loggedUser == ' ' || loggedUser == undefined || loggedUser == null ) {
            navigate('/')
        } 
    }, [])

    const [ userData, setUserData ] = useState([]);
    const [ receptionId, setReceptionId ] = useState('');
    const [ showReceptionProfile, setShowReceptionProfile ] = useState(false);
    useEffect(() => {
        axios.post('http://localhost/Server/getReceptionists.php')
        .then((res) => {
            let cardItem = res.data.map((item, index) => 
                <ReceptionistCard
                    key={item.id}
                    src=''
                    id={item.id}
                    name={item.name_and_surname}
                    age={item.age}
                    email={item.email}
                    rank={item.admin}
                    uniqueId={index}
                    showReceptionProfile={item => setShowReceptionProfile(item)}
                    receptionId={item => setReceptionId(item)}
                />   
            )
            setUserData(cardItem);
        })
    }, [])

    const closePatientInfo = () => {
        setShowReceptionProfile(!showReceptionProfile);
    }

    const [ showAddReceptionist, setShowAddReceptionist ] = useState(false)
    const openAddReceptionist = () => {
        setShowAddReceptionist(true);
    }

    const closeAddReceptionist = () => {
        setShowAddReceptionist(false);
    }


    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search by name or email'
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
                        {   !showAddReceptionist && !showReceptionProfile && userAdmin
                            ?   <Button
                                    className={ styles.button }
                                    label='Add Receptionist'
                                    onClick={openAddReceptionist}
                                />
                            : ''
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>

                </div>
                <div className={ styles.containerReceptionCards }>

                    {
                        showReceptionProfile
                        ?   <ViewReceptionist
                                receptionId={receptionId}
                                userAdmin={userAdmin}
                                clickCancel={() => closePatientInfo()}
                                openModal={value => setShowReceptionProfile(value)}
                            />
                        :   showAddReceptionist
                        ?   <AddReceptionist
                                clickCancel={() => closeAddReceptionist()}
                            />
                        :   userData
                    }
                    

                </div>
            </div>
            <div className={ styles.rightContainer }>
                <CreateAppointment/>
            </div>
        </div>
    );
};

export default Reception;
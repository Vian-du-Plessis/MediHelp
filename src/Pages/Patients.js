import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
import ViewPatient from '../Components/ViewPatient/ViewPatient';
import PatientInfo from '../Components/PatientInfo/PatientInfo';

const Patients = () => {

    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const [ patients, setPatients ] = useState([]);
    const [ patientsSearch, setPatientsSearch ] = useState([]);
    const [ startIndex, setStartIndex ] = useState({start: 0});
    const [ filterReset, setFilterReset ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ indexCount, setIndexCount ] = useState(0);
    const [ indexLimit, setIndexLimit ] = useState();

    const [ searchVal, setSearchVal ] = useState({search: ''});
    const [ paging, setPaging ] = useState(true);

    const [ patientInfoModal, setPatientInfoModal ] = useState(false);
    const [ patientInfoID, setPatientInfoID ] = useState(0);

    const openAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }

    const closeAddPatient = () => {
        setAddPatientOpen(!addPatientOpen);
    }

    const closePatientInfo = () => {
        setPatientInfoModal(!patientInfoModal);
    }

    const pageLeft = () => {
        if(startIndex.start > 9 && page >= 1) {
            setStartIndex({...startIndex, start: +startIndex.start - 12})
            setFilterReset(!filterReset);
            setPage(page - 1)
        }
    }

    const pageRight = () => {
        if( startIndex.start <= indexCount - 12) {
            setStartIndex({...startIndex, start: +startIndex.start + 12})
            setFilterReset(!filterReset);
            setPage(page + 1)
        }
    }

    useEffect(() => {
        axios.post('http://localhost/Server/getPatients.php', startIndex)
        .then((res) => {
            let data = res.data.users;
            setIndexCount(res.data.count);
            setIndexLimit(res.data.count);
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            data = data.map((x) => {
                return {...x, timePassed: 
                    x.previous_appointments.length > 0 
                    ? Math.round((new Date(today).getTime() - new Date(x.previous_appointments).getTime() ) / (1000 * 3600 * 24)) 
                    : x.previous_appointments == " "
                    ? 'N/A'
                    : 'N/A'
                }
            })
            setPatients(data)
        })

    }, [startIndex, patientInfoModal, addPatientOpen])

    let sValue = useRef();
    const searchValue = () => {
        let value = sValue.current.value;
        setSearchVal({...searchVal, search: value});

        if(value.length > 0) {
            setPaging(false);
        } else {
            setPaging(true);
        }

        axios.post('http://localhost/Server/searchPatients.php', searchVal)
        .then((res) => {
            if(res.data == false) {
                setPatientsSearch([])
            } else {
                let data = res.data.users;
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
    
                    
    
    
                today = mm + '/' + dd + '/' + yyyy;
                data = data.map((x) => {
                    return {...x, timePassed: 
                        x.previous_appointments.length > 0 ? Math.round((new Date(today).getTime() - new Date(x.previous_appointments).getTime() ) / (1000 * 3600 * 24)) : 'N/A'
                    }
                })
                setPatientsSearch(data);
            }
        })
    }

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.middleContainer }>
                <div className={ styles.middleContainer__topContainer }>
                    <SearchInput
                        placeholder='Search by name, number or ID'
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
                                ? 'Add patient' 
                                : patientInfoModal
                                ? 'View Patient'
                                : 'Patients'
                            }
                        </h3>
                        {
                                !addPatientOpen && !patientInfoModal
                            ?   <Button
                                    className={ styles.button }
                                    label='Add patient'
                                    onClick={() => openAddPatient() }
                                />
                            :   ''
                        }
                    </div>
                    <div className={ styles.headerContainer__sub }>

                    </div>
                    { 
                        addPatientOpen && !patientInfoModal
                        ?   <AddPatient
                                clickCancel={() => closeAddPatient()}
                                modalOpen={value => setAddPatientOpen(value)}
                            />
                        :   patientInfoModal
                        ?   <ViewPatient
                                clickCancel={() => closePatientInfo()}
                                openModal={value => setPatientInfoModal(value)}
                                patientID={patientInfoID}
                            />
                        :   <PatientTableItem
                                values={patients}
                                pageLeft={pageLeft}
                                pageRight={pageRight}
                                resetFilter={filterReset}
                                index={startIndex}
                                page={page}
                                indexLimit={indexLimit}
                                indexCount={indexCount}
                                pagingOn={paging}
                                searchValues={patientsSearch}
                                showPatientInfo={item => setPatientInfoModal(item)}
                                showPatientID={item => setPatientInfoID(item)}
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
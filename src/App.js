import { Route, Routes, useLocation } from 'react-router-dom';

/* Import Components */
import Nav from './Components/ui/Nav/Nav';

/* Import Pages */
import Patients from './Pages/Patients';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import Appointments from './Pages/Appointments';
import Modal from './Components/ui/Modal/Modal';
import ViewPatient from './Components/ViewPatient/ViewPatient';
import Reception from './Pages/Reception';

function App() {

    let location = useLocation();

    return (
        <div className="App">
            {
                location.pathname !== '/' && <Nav/>
            }
            <Routes>
                <Route path='/' element = {<Login />} />
                <Route path='/Patients' element = {<Patients />} />
                <Route path='/Doctors' element = {<Doctors />} />
                <Route path='/Appointments' element = {<Appointments />} />
                <Route path='/Receptionist' element = {<Reception />} />
            </Routes>  
            {/* <ViewPatient/> */}
        </div>
    );
}

export default App;
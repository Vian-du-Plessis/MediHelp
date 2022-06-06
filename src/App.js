import { Route, Routes, useLocation } from 'react-router-dom';

/* Import Components */
import Nav from './Components/Nav/Nav';

/* Import Pages */
import Patients from './Pages/Patients';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import Appointment from './Components/Appointment/Appointment';

function App() {

    let location = useLocation();

    return (
        <div className="App">
{/*             {
                location.pathname !== '/' && <Nav/>
            }
            <Routes>
                <Route path='/' element = {<Login />} />
                <Route path='/Patients' element = {<Patients />} />
                <Route path='/Doctors' element = {<Doctors />} />
            </Routes>  */} 

            <Appointment/>

        </div>
    );
}

export default App;
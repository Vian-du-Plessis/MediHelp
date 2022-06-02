import { Route, Routes, useLocation } from 'react-router-dom';

/* Import Components */
import Nav from './Components/Nav/Nav';

/* Import Pages */
import Patients from './Pages/Patients';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';

function App() {

    let location = useLocation();

    return (
        <div className="App">
            {
                location.pathname !== '/login' && <Nav/>
            }
            <Routes>
                <Route path='/Login' element = {<Login />} />
                <Route path='/Patients' element = {<Patients />} />
                <Route path='/Doctors' element = {<Doctors />} />
            </Routes>  
        </div>
    );
}

export default App;
import { Route, Routes } from 'react-router-dom';

/* Import Components */
import Nav from './Components/Nav/Nav';

/* Import Pages */
import Patients from './Pages/Patients';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';

import AddPatient from './Components/AddPatient/AddPatient';
import ToggleButton from './Components/ToggleButton/ToggleButton';
import DoctorCard from './Components/DoctorCard/DoctorCard';

function App() {
    return (
        <div className="App">
            <Nav/>

            <Routes>
                <Route path='/Patients' element = {<Patients />} />
                <Route path='/Doctors' element = {<Doctors />} />
            </Routes>  

        </div>
    );
}

export default App;
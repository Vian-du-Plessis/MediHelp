import Nav from './Components/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import DatePicker from './Components/Date-Picker/DatePicker';
import CreateAppointment from './Components/Create-Appointment/CreateAppointment';
import PatientInfo from './Components/PatientInfo/PatientInfo';

function App() {
    return (
        <div className="App">
            <PatientInfo/>
        </div>
    );
}

export default App;
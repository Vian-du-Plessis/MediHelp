import { Route, Routes } from 'react-router-dom';

/* Import Components */
import Nav from './Components/Nav/Nav';

/* Import Pages */
import Patients from './Pages/Patients';

function App() {
    return (
        <div className="App">
            <Nav/>

            <Routes>
                <Route path='/Patients' element = {<Patients />} />
            </Routes>
        </div>
    );
}

export default App;
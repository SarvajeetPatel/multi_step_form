import { Route, Routes } from 'react-router-dom';
import './App.css';
import PersonalDetails from './pages/PersonalDetails';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import SelfDescription from './pages/SelfDescription';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='personal' element={<PersonalDetails />} />
          <Route path='work' element={<WorkExperience />} />
          <Route path='skills' element={<Skills />} />
          <Route path='description' element={<SelfDescription />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// import { Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import './App.css';
// import PersonalDetails from './pages/PersonalDetails';
// import WorkExperience from './pages/WorkExperience';
// import Skills from './pages/Skills';
// import SelfDescription from './pages/SelfDescription';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc' }} style={{ padding: '10px 10px 10px 10px' }}>
          <HomePage />
        </Box>
      </Container>
      {/* <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='personal' element={<PersonalDetails />} />
          <Route path='work' element={<WorkExperience />} />
          <Route path='skills' element={<Skills />} />
          <Route path='description' element={<SelfDescription />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;

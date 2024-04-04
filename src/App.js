import { Box, Container } from '@mui/material';
import './App.css';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc' }} style={{ padding: '10px 10px 10px 10px' }}>
          <HomePage />
        </Box>
      </Container>
    </>
  );
}

export default App;

import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Events from './pages/Events';

function App() {
  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/team' element={<Team />} /> {/* Use lowercase for consistency */}
        <Route path='/events' element={<Events />} /> {/* Use lowercase for consistency */}
      </Routes>
    </>
  );
}

export default App;

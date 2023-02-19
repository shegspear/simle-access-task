import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Edit from './pages/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;

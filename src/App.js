import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocalPage from './LocalPage';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

function App() {
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path="/" element={<LocalPage />} />
        <Route path="/userPage" element={<UserHome />} />
        <Route path="/adminPage" element={<AdminHome />} />
        {/*<Route path="*" element={<NotFound /> />*/} 
      </Routes>
    </Router>
      
        
    </div>
  );
}

export default App;

import './App.css';
import GetUsers from './components/GetUsers';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocalPage from './LocalPage';

function App() {
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path="/" element={<LocalPage />} />
        {/*<Route path="*" element={<NotFound /> />*/} 
      </Routes>
    </Router>
      
        
    </div>
  );
}

export default App;

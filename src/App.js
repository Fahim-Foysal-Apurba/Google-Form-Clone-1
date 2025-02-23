import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocalPage from './LocalPage';
import AdminHome from './AdminHome';
import FormTem from './components/form';
import AnswerForm from './components/answer';

function App() {
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path="/" element={<LocalPage />} />
        <Route path="/adminPage" element={<AdminHome />} />
        <Route path="/formPage" element={<FormTem />} />
        <Route path="/answerPage/:id" element={<AnswerForm/>}/>
        {/*<Route path="*" element={<NotFound /> />*/} 
      </Routes>
    </Router>
      
        
    </div>
  );
}

export default App;

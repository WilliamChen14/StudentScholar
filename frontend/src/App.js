import './App.css';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Classes from "./Classes";
import Home from ".";
import Profile from "./Profile";
import FooterComponent from './components/FooterComponent';




function App() {

  
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}



export default App;

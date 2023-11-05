import './App.css';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Classes from "./Classes";
import Home from ".";


function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

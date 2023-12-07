import './App.css';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Classes from "./Classes";
import Files from "./Files"
import Home from ".";
import Profile from "./Profile";
import Notes from "./Notes"; 
import FooterComponent from './components/FooterComponent';


import React, {Component, useEffect} from "react";
import AuthService from './services/auth.service';




function App(){

  useEffect(
    ()=> {
      const user = AuthService.getCurrentUser();

      if (user) {
        console.log(user)
      }
      else{
        //redirect page to home
      }
      
      },[]
  );

  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Files" element={<Files />} />
          <Route path="/Notes" element={<Notes />} /> 
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}



export default App;

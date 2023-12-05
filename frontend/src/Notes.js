
import React, { useState, useEffect} from 'react';  //use state to change bw notes and convo
import './Notes.css';

// import ReactDOM from 'react-dom/client'; // interactivity and dynamic changing of page
// import { Button } from 'react-bootstrap'; 
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from "react-bootstrap/Container";
// import Card from 'react-bootstrap/Card';


import AuthService from './services/auth.service';

const Notes = () => {

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

  //create setOnNotesPg function?
  //let onNotesPage = useState(true); //use this?
  //blah
  const [onNotesPg, setOnNotesPg] = useState(true);


  const [activeSection, setActiveSection] = useState("notes");

  const switchSection = (section) => {
    setActiveSection(section);
  };
    return (
      <>
        <h1> Class Notes Display and Convo Page</h1>          
        <div className="body">
            <div className="leftHalf">
              <div className="iFrame">
                <p>
                  <img
                    src="https://i.pinimg.com/564x/0a/cf/9c/0acf9c74257608d41289cde8e937c603.jpg"
                  />
                </p>
              </div>
              <div className="blank">
                <p>
                  "blank"
                </p>
              </div>
            </div>
            <div className="rightHalf">
              <div className="header">
                <div
                  className = {`section-switch ${activeSection === "notes" ? "active" : ""}`}
                  onClick={() => switchSection("notes")}
                  >
                    Notes
                </div>
                <div
                    className={`section-switch ${activeSection === "discussion" ? "active" : ""}`}
                    onClick={() => switchSection("discussion")}
                >
                    Discussion
               </div>
              </div>
              {activeSection === "notes" ? (
                <p>Notes section content</p>
              ) : (
                <p>Discussion section content</p>
              )}

              {/* {useState &&
                <div className="notesPg">
                  const textString=["hello","blah"]
                  const boxes = textString.map((text) => {
                    const box = document.createElement('div');

                    box.innerText = text;

                    box.classList.add('box');


                    return box;
                  });

                  boxes.forEach((box) => {
                    document.body.appendChild(box);
                  });
                </div>
              } */}
            </div>
          </div>
      </>
    );
  };
  
  export default Notes;
  

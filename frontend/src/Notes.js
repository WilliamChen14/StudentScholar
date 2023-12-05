import React, { useState, useEffect} from 'react';  //use state to change bw notes and convo
// import ReactDOM from 'react-dom/client'; // interactivity and dynamic changing of page
// import { Button } from 'react-bootstrap'; 
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';

import './Notes.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

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

    return (
      <div>
        {/* <div className="navbar">
          <HeaderComponent />
        </div> */}
        <div className="body">
          <div className="leftHalf">
            <div className="iFrame">

            </div>
            <div className="blank">

            </div>
          </div>
          <div className="rightHalf">
            <p>
              "hello"
            </p>
            {useState &&
              <div className="notesPg">
                ([]).map({

                

                })
              </div>
            }
          </div>
        </div>
        {/* <div className="footer">
          <FooterComponent />
        </div> */}
      </div>
    );
  }
  
  export default Notes;
  
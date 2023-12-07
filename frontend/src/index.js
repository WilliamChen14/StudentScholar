import React, {useEffect}from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FrontPagePhoto from './assets/FrontPageImage.jpeg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

import BillPhoto from './assets/BillPhoto.png'
import PhilipPhoto from './assets/Philip_photo.jpg'
import BrianPhoto from './assets/BrianPhoto.jpg'
import PravirPhoto from './assets/PravirPhoto.jpg'
import SusanaPhoto from './assets/SusanaPhoto.jpg'
import { CardBody } from 'react-bootstrap';


import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthService from './services/auth.service';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="216683383933-4se13b0bgveauds2s6hfdql2jkp9fark.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

const Home = () => {

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
    <>
    <div className="all">
    <div>
      <img src={FrontPagePhoto} className='image'></img>
    </div>
    <body>
      <Row className='row-container'>
        <div className='about-us-container'>
          <div>
            <p1 className="about-us-header">About Us</p1>
          </div>
          <div>
            <p1 className="update-date">Updated November 5th, 2023 by Bill Chen</p1>
          </div>
          <div>
            <p className="about-us-description">
            Welcome to our innovative web app platform designed exclusively for UCLA college students! 
            We understand the challenges of academic life, and that's why we're excited to introduce a comprehensive solution 
            that provides open-access resources and materials tailored to your study needs. Our goal is to allow
            students to share and access lecture notes both for courses they are currently enrolled in and courses they plan
            to take in the future.
            <br></br>
            <br></br>
            Just simply set up a profile with your email, add classes via their respective class codes, and you are all set!
            </p>
          </div>
          
        
        </div>
        <div className='meet-the-team-container'>
          <div>
            <p1 className="meet-the-team-header">Meet the Team</p1>
            <Card className='team-member-card'>
              <Row>
                <Col xs={4}>
                  <div className='team-member-photo'>
                    <Card.Img src={BillPhoto}/>
                  </div>
                  <div>
                    <p1 className='team-member-name'>Bill Chen</p1>
                  </div>
                  <div>
                    <p1 className='team-member-role'>Team Member</p1>
                  </div>
                </Col>
                <Col>
                  <p1 className='member-description'>
                  Hi, my name is Bill Chen. I am a Computer Science and Engineering Major at UCLA. My favorite animes are 'Domestic Girlfriend' and 'Girlfriend Girlfriends'. Aint no way you dissing me! In my free time I like to sweat against my friends in word hunt and expore town without a place in mind.
                  </p1>
                </Col>
              </Row>

            </Card>
            <Card className='team-member-card'>
              <Row>
                <Col xs={4}>
                  <div className='team-member-photo'>
                    <Card.Img src={PhilipPhoto}/>
                  </div>
                  <div>
                    <p1 className='team-member-name'>Philip Huang</p1>
                  </div>
                  <div>
                    <p1 className='team-member-role'>Team Member</p1>
                  </div>
                </Col>
                <Col>
                  <p1 className='member-description'>
                    Hello, my name is Philip Huang and I am from Seattle, Washington. I am a second-year student at UCLA majoring in Computer Engineering. I like to play basketball and tennis, listen to music, and watch anime.  
                  </p1>
                </Col>
              </Row>
            </Card>
            <Card className='team-member-card'>
              <Row>
                <Col xs={4}>
                  <div className='team-member-photo'>
                    <Card.Img src={BrianPhoto}/>
                  </div>
                  <div>
                    <p1 className='team-member-name'>Brian He</p1>
                  </div>
                  <div>
                    <p1 className='team-member-role'>Team Member</p1>
                  </div>
                </Col>
                <Col>
                  <p1 className='member-description'>
                  Hey! I'm Brian. I'm a third year CS student and I hope you enjoy what we have to offer here! :D
                  </p1>
                </Col>
              </Row>

            </Card>

            <Card className='team-member-card'>
              <Row>
                <Col xs={4}>
                  <div className='team-member-photo'>
                    <Card.Img src={PravirPhoto}/>
                  </div>
                  <div>
                    <p1 className='team-member-name'>Pravir Chugh</p1>
                  </div>
                  <div>
                    <p1 className='team-member-role'>Team Member</p1>
                  </div>
                </Col>
                <Col>
                  <p1 className='member-description'>
                  Hi there! My name is Pravir Chugh, and I am a second-year Computer Science Major at UCLA. 
                  </p1>
                </Col>
              </Row>

            </Card>
            <Card className='team-member-card'>
              <Row>
                <Col xs={4}>
                  <div className='team-member-photo'>
                    <Card.Img src={SusanaPhoto}/>
                  </div>
                  <div>
                    <p1 className='team-member-name'>Susana Sun</p1>
                  </div>
                  <div>
                    <p1 className='team-member-role'>Team Member</p1>
                  </div>
                </Col>
                <Col>
                  <p1 className='member-description'>
                    Hello! My name is Susana Sun, and I am a second-year Computer Science major at UCLA. In my free time, I love snowboarding and learning different foreign languages.
                  </p1>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Row>
    </body>
    </div>
    </>
  );
};

export default Home;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
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
import { CardBody } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

const Home = () => {
  return (
    <>
    <div>
      <img src={FrontPagePhoto} className='image'></img>
    </div>
    <Container className='body'>
      <Row className='row-container'>
        <Col xs={7} className='about-us-container'>
          <div>
            <p1 className="about-us-header">About Us</p1>
          </div>
          <div>
            <p1 className="update-date">Updated November 5th, 2023 by Bill Chen</p1>
          </div>
          <div>
            <p1>
              Our goal is to help students...
              blah blah blah blah blah blah
              There was a leak in the boat. Nobody had yet noticed it, and nobody would for the next couple of hours. This was a problem since the boat was heading out to sea and while the leak was quite small at the moment, it would be much larger when it was ultimately discovered. John had planned it exactly this way.
            </p1>
          </div>
          
        
        </Col>
        <Col className='meet-the-team-container'>
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
                  <p1>
                    Hi, my name is Bill Chen. I am a Computer Science and Engineering Major at UCLA. i like to blay blahsdfsadjkfldsa sad fsad fas df sadf sad f ae as edf v d fsa df 
                  </p1>
                </Col>
              </Row>

            </Card>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Home;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

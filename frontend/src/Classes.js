import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Classes.css';
import { Row } from 'react-bootstrap';
import { Column } from './components/FooterStyle';

import AuthService from './services/auth.service';
import axios from 'axios';


function ClassesBox({ title, description, link }, { classID }) {
  return (
    <div className="class-box">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/670/619/698/brain-computer-engineering-science-wallpaper-preview.jpg"
        alt=""
      />
      <div className="class-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={link} onClick={() => {
          AuthService.setClassPage(classID);
        }}>
          <button>Go to Notes</button>
        </Link>
      </div>
    </div>
  );
}

function Classes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addClassID, setAddClassID] = useState([]);
  const [addClassName, setAddClassName] = useState([]);
  const [addClassProfessor, setAddClassProfessor] = useState([]);

  const [userClasses, setUserClasses] = useState([]);
  const [userClassesData, setUserClassesData] = useState([]);
  const [userClassesName, setUserClassesName] = useState([]);
  const [userClassesDiscription, setUserClassesDiscription] = useState([]);

  const SubmitAddClass = (e) => {

    e.preventDefault();

    console.log(addClassID);
    console.log(addClassName);

    axios
      .post("http://localhost:8000/create-class", {
        classID: addClassID, className: addClassName, classProf: addClassProfessor
      })
      .then(response => {
        console.log("shouldve added unless code already exists");
      });
  }

  const classData = [
    {
      title: 'COM SCI M51A',
      description: 'Description for COM SCI M51A.',
      image: 'image1.jpg',
      link: '/Notes',
    },
    {
      title: 'COM SCI 35L',
      description: 'Description for COM SCI 35L.',
      image: 'image2.jpg',
      link: '/Notes',
    },
    {
      title: 'MATH 33B',
      description: 'Description for MATH 33B.',
      image: 'image3.jpg',
      link: '/Notes',
    },
  ];

  useEffect(
    () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        console.log(user)

        axios
          .post("http://localhost:8000/get-user-classes", {
            username: user.accessToken
          })
          .then(response => {
            setUserClasses(response.data[0].userClasses)
            let tempUserClassesName = userClassesName;
            let tempUserClassesData = [];

            for (let i = 0; i < response.data[0].userClasses.length; i++) {
              axios
                .post("http://localhost:8000/get-class", {
                  classID: response.data[0].userClasses[i]
                })
                .then(response => {
                  console.log(response);
                  tempUserClassesData.push(response);
                  tempUserClassesName.push(response.data.className);
                })
                .catch((err) => {
                  console.log(err);
                })
            }
            console.log(tempUserClassesName);
            setUserClassesName(tempUserClassesName);
            setUserClassesData(tempUserClassesData);
          })
      }
      else {
        //redirect page to home
      }
    }, []
  );


  const ClassesBox = (description, classID, index) => {
    let classNameFromID = userClassesName;
    return (
      <div className="class-box">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/670/619/698/brain-computer-engineering-science-wallpaper-preview.jpg"
          alt=""
        />
        <div className="class-details">
          <h2>{userClassesName[index]}</h2>
          <p>{description}</p>
          <Link to={"/Notes"} onClick={() => {
            AuthService.setClassPage(classID);
          }}>
            <button>Go to Notes</button>
          </Link>
        </div>
      </div>
    );
  }

  const className = (classID) => {
    axios
      .post("http://localhost:8000/get-class", { classID: classID })
      .then(response => {
        return response.data.className;
      })

    return "";
  }

  const filteredClassData = searchQuery
    ? classData.filter((classItem) =>
      classItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : classData;

  return (
    <div className="class-container">
      <Row>
        <div className="search-wrapper">
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              placeholder="Type to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <form id="form">
            <p>Create a Class here</p>
            <input
              type="text"
              className='search-input'
              placeholder="New Class Name"
              value={addClassName}
              onChange={(e) => setAddClassName(e.target.value)}
            />
            <input
              type="number"
              className='search-input'
              placeholder="New Class ID"
              value={addClassID}
              onChange={(e) => setAddClassID(e.target.value)}
            />
            <input
              type="text"
              className='search-input'
              placeholder="Classes Professor"
              value={addClassProfessor}
              onChange={(e) => setAddClassProfessor(e.target.value)}
            />
            <button
              onClick={SubmitAddClass}
            >Submit</button>
          </form>
        </div>
        {userClasses.length > 0 ? (
          userClasses.map((classItem, index) => (
            <>
              {ClassesBox("Discription", classItem, index)}
            </>
          ))
        ) : (
          <p>No classes found.</p>
        )}
      </Row>

    </div>
  );
}

export default Classes;

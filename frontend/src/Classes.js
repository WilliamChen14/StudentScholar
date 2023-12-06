import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Classes.css';

import AuthService from './services/auth.service';
import axios from 'axios';


function ClassesBox({ title, description, image, link }) {
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
            AuthService.setClassPage(title);
            alert("Switching to: " + title);
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

  const SubmitAddClass = (e) =>{
    e.preventDefault();

    console.log(addClassID);
    console.log(addClassName);

    axios
        .post("http://localhost:8000/create-class", { classID: addClassID, className: addClassName, classProf: addClassProfessor
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
    ()=> {
      const user = AuthService.getCurrentUser();
      console.log("opened classes");
      console.log(user);

      if (user) {
        console.log(user)
      }
      else{
        //redirect page to home
      }
      
      },[]
  );

  const filteredClassData = searchQuery
    ? classData.filter((classItem) =>
        classItem.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : classData;

  return (
    <div className="class-container">
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
            <input 
            type="text"
            className='search-input'
            placeholder="Class Name"
            value={addClassName}
            onChange={(e)=> setAddClassName(e.target.value)}
            />
            <input 
            type="number"
            className='search-input'
            placeholder="Class ID"
            value={addClassID}
            onChange={(e)=> setAddClassID(e.target.value)}
            />
            <input 
            type="text"
            className='search-input'
            placeholder="Class Professor"
            value={addClassProfessor}
            onChange={(e)=> setAddClassProfessor(e.target.value)}
            />
            <button
              onClick={SubmitAddClass}
            >Submit</button>
        </form>
      </div>

      {filteredClassData.length > 0 ? (
        filteredClassData.map((classItem, index) => (
          <ClassesBox key={index} {...classItem} />
        ))
      ) : (
        <p>No classes found.</p>
      )}
    </div>
  );
}

export default Classes;

import React from 'react';
import { Link } from 'react-router-dom';
import './Classes.css';

function ClassesBox({ title, description, image, link }) {
  return (
    <div className="class-box">
      <img src="https://c4.wallpaperflare.com/wallpaper/670/619/698/brain-computer-engineering-science-wallpaper-preview.jpg" alt="Class Image" />
      <div className="class-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={link}>
          <button>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

function Classes() {
  const classData = [
    {
      title: 'Class 1',
      description: 'Description for class 1.',
      image: 'image1.jpg',
      link: '/home1',
    },
    {
      title: 'Class 2',
      description: 'Description for class 2.',
      image: 'image2.jpg',
      link: '/home2',
    },
    {
      title: 'Class 3',
      description: 'Description for class 3.',
      image: 'image3.jpg',
      link: '/home3',
    },
  ];

  return (
    <div className="class-container">
      {classData.map((classItem, index) => (
        <ClassesBox key={index} {...classItem} />
      ))}
    </div>
  );
}

export default Classes;
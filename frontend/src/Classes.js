import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Classes.css';

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
        <Link to={link}>
          <button>Go to Notes</button>
        </Link>
      </div>
    </div>
  );
}

function Classes() {
  const [searchQuery, setSearchQuery] = useState('');

  const classData = [
    {
      title: 'Class 1',
      description: 'Description for class 1.',
      image: 'image1.jpg',
      link: '/Notes',
    },
    {
      title: 'Class 2',
      description: 'Description for class 2.',
      image: 'image2.jpg',
      link: '/Notes',
    },
    {
      title: 'Class 3',
      description: 'Description for class 3.',
      image: 'image3.jpg',
      link: '/Notes',
    },
  ];

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

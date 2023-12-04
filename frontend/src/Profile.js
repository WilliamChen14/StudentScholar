import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function ClassCodeBox({ addClass }) {
  const [classCode, setClassCode] = useState('');

  const handleClassCodeChange = (e) => {
    setClassCode(e.target.value);
  };

  const handleAddClass = () => {
    if (classCode === '111111') {
      addClass('CS35L');
      setClassCode('');
    } else if (classCode === '222222') {
      addClass('CS31');
      setClassCode('');
    } else {
      alert('Incorrect class code. Please try again.');
    }
  };

  return (
    <div className="class-code-box">
      <label htmlFor="classCode">Enter Class Code: </label>
      <input
        type="text"
        id="classCode"
        value={classCode}
        onChange={handleClassCodeChange}
      />
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [tempUser, setTempUser] = useState({ username: '' });
  const [userClasses, setUserClasses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setIsLoggedIn(true);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile({});
    setIsLoggedIn(false);
  };

  const checkIfThere = (e) => {
    e.preventDefault();
    setTempUser({ ...tempUser, username: profile.email });

    console.log(tempUser.username);

    axios
      .post('http://localhost:8000/loggin-user', tempUser)
      .then((res) => {
        console.log('it worked');
      })
      .catch((err) => {
        console.log('Error in finding a user!');
      });
  };

  const addClass = (newClass) => {
    if (!userClasses.includes(newClass)) {
      setUserClasses((prevClasses) => [...prevClasses, newClass]);
    } else {
      alert('Class already exists in the list.');
    }
  };

  const removeClass = (removedClass) => {
    setUserClasses((prevClasses) => prevClasses.filter((cls) => cls !== removedClass));
  };

  return (
    <div className="container">
      <div className="user-info">
        {isLoggedIn ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <button onClick={logOut}>Log out</button>
            <button onClick={checkIfThere}>check</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google</button>
        )}
      </div>

      {isLoggedIn && (
        <div className="my-classes">
          <div className="my-classes-container">
            <h2>My Classes</h2>
            <ClassCodeBox addClass={addClass} />
            <ul className="class-list">
              {userClasses.map((cls, index) => (
                <li key={index} className="class-list-item">
                  {cls}
                  <button className="remove-button" onClick={() => removeClass(cls)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

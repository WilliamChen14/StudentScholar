import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

import AuthService from './services/auth.service';

function ClassCodeBox({ addClass }) {
  const [classCode, setClassCode] = useState('');

  const handleClassCodeChange = (e) => {
    setClassCode(e.target.value);
  };

  const handleAddClass = () => {
    const curUser = AuthService.getCurrentUser();
    axios
        .post("http://localhost:8000/add-class", { username: curUser.accessToken, userClasses:[classCode]
        })
        .then(response => {
            console.log("nice");
        });

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

function Notes() {
    return (
        <div className="my-notes">
            <h2> My Pages/Favorited</h2>
        </div>
    );
}

function Profile() {

  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState([]);
  const [profile, setProfile] = useState({});
  const [tempUser, setTempUser] = useState({ username: '' });
  const [userClasses, setUserClasses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userClassesID, setUserClassesID] = useState([]);



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
      setIsLoggedIn(true);
      
      //localStorage.setItem('user', JSON.stringify(codeResponse));
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    setGoogleUser(null);
    setProfile({});
    setIsLoggedIn(false);
    AuthService.logout();
    localStorage.removeItem('userClasses');
  };


  useEffect(
        () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            console.log(storedUser);
            const storedClasses = JSON.parse(localStorage.getItem('userClasses'));


            if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);


            //This gets the users array of classes and then checks if the class exists
            axios
                .post("http://localhost:8000/get-user-classes", { username: storedUser.accessToken
                })
                .then(response => {        
                    setUserClassesID(response.data[0].userClasses);
                    for(let i = 0; i < response.data[0].userClasses.length; i++){

                        //this is the class ID from the array
                        let j = response.data[0].userClasses[i];

                        //this axios request checks if classID j is valid and will give a response if it is
                        axios
                            .post("http://localhost:8000/get-class", { classID: j})
                            .then(response =>{
                                if(response){
                                    console.log("This class is valid");

                                    //this is the class name if the class id is valid
                                    console.log(response.data.className);
                                }
                            })
                        console.log(response.data[0].userClasses[i]);
                    }
                });
            }

            

            if (storedClasses) {
            setUserClasses(storedClasses);
            }
            const currentUser = AuthService.getCurrentUser();
            if(currentUser){
                console.log(currentUser);
            }
            if (googleUser) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${googleUser.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);

                        AuthService.login(res.data.email)
                            .then((res)=>{
                                console.log("logged in");
                            })
                            .catch((err)=>{
                                console.log('Error in logging in');
                            })
                    })
                    .catch((err) => console.log(err));

            }


        },
        [ googleUser ]


    );




  const addClass = (newClass) => {
    if (!userClasses.includes(newClass)) {
      setUserClasses((prevClasses) => [...prevClasses, newClass]);
      localStorage.setItem('userClasses', JSON.stringify([...userClasses, newClass]));
    } else {
      alert('Class already exists in the list.');
    }
  };

  const removeClass = (removedClass) => {
    const updatedClasses = userClasses.filter((cls) => cls !== removedClass);
    setUserClasses(updatedClasses);
    localStorage.setItem('userClasses', JSON.stringify(updatedClasses));
  };

  return (
    <div className="container">
      {isLoggedIn && <Notes />}
      <div className="user-info">
        {isLoggedIn ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <button onClick={logout}>Log out</button>
            <button onClick={() => console.log(userClassesID)}>Log out</button>
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

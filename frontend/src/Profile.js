import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

import AuthService from './services/auth.service';

function ClassCodeBox({ addClass, classNames }) {
  const [classCode, setClassCode] = useState('');

  const handleClassCodeChange = (e) => {
    setClassCode(e.target.value);
  };

  const handleAddClass = () => {
    const curUser = AuthService.getCurrentUser();
    axios
        .post("http://localhost:8000/get-class", { classID:[classCode]
        })
        .then(response => {
          if (response.data && response.data.className) {
            const className = response.data.className;
            addClass(classCode, className);
          } else {
            console.log("Invalid class code");
          }
        })
        .catch(error => {
          console.error("Error fetching class data", error);
        });
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
  const [classNames, setClassNames] = useState({});
  const [usernameText, setUsernameText] = useState("");



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
          let isMounted = true;
          if (!googleUser) {
            return;
          }
            const storedUser = JSON.parse(localStorage.getItem('user'));
            console.log(storedUser);
            const storedClasses = JSON.parse(localStorage.getItem('userClasses')) || [];


            if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
            setUsernameText(storedUser.accessToken);


            //This gets the users array of classes and then checks if the class exists
            axios
                .post("http://localhost:8000/get-user-classes", { username: storedUser.accessToken
                })
                .then(response => {
                  if(isMounted) {        
                    setUserClassesID(response.data[0].userClasses);
                    for(let i = 0; i < response.data[0].userClasses.length; i++){

                        //this is the class ID from the array
                        let j = response.data[0].userClasses[i];

                        //this axios request checks if classID j is valid and will give a response if it is
                        axios
                            .post("http://localhost:8000/get-class", { classID: j})
                            .then(response =>{
                                if(isMounted && response){
                                    console.log("This class is valid");
                                    setClassNames((prevNames) => ({
                                      ...prevNames,
                                      [j]: response.data.className,
                                    }));
                                    //this is the class name if the class id is valid
                                    console.log(response.data.className);
                                }
                            })
                            .catch(error => {
                              console.error("Eroor fetching class data", error);
                            });
                        console.log(response.data[0].userClasses[i]);
                    }
                  }
                })
                .catch(error => {
                  console.error("Error fetching user classes", error);
                });
            }

            

            if (storedClasses) {
            setUserClasses(storedClasses);
            }
            const currentUser = AuthService.getCurrentUser();


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

            return () => {
              isMounted = false;
            };


        },
        [ googleUser ]


    );

    const saveClasses = () =>{
      console.log(userClassesID);
      axios
        .post("http://localhost:8000/add-class", {username: usernameText, userClasses: userClassesID})
        .then((response)=>{
          console.log(response);
        })
        .catch((err)=>{
          console.log(err);
        })
    }




  const addClass = (newClassCode, newClassName) => {
    if (!userClassesID.includes(newClassCode)) {
      setUserClassesID((prevClasses) => [...prevClasses, newClassCode]);
      setClassNames((prevNames) => ({
        ...prevNames,
        [newClassCode]: newClassName,
      }));
      setUserClasses((prevClasses) => [...prevClasses, newClassCode]);
      localStorage.setItem('userClasses', JSON.stringify([...userClassesID, newClassCode]));
    } else if (!userClasses.includes(newClassCode)){
      setUserClasses((prevClasses) => [...prevClasses, newClassCode]);
      localStorage.setItem('userClasses', JSON.stringify([...userClasses, newClassCode]));
    } else {
      alert('Class already exists in the list.');
    }
  };

  const removeClass = (removedClass) => {
    const updatedClasses = userClasses.filter((cls) => cls !== removedClass);
    setUserClasses(updatedClasses);
    localStorage.setItem('userClasses', JSON.stringify(updatedClasses));
  };

  const classCodeBox = (
    <ClassCodeBox addClass={addClass} classNames={classNames} />
  ); 

  return (
    <div className="container">
      {isLoggedIn && <Notes />}
      <div className="user-info">
        {isLoggedIn ? (
          <div>
            <h2>My Profile</h2>
            <p>Email Address: {usernameText} </p>
            <br />
            <button onClick={logout}>Log out</button>
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
                  {classNames[cls] || cls}
                  <button className="remove-button" onClick={() => removeClass(cls)}>
                    Remove
                  </button>
                </li>
              ))}
              <button onClick={saveClasses}>Save</button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

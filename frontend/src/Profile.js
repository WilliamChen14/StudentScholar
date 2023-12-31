import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';



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
            alert('Class does not exist. Please enter a valid class code.');
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

  const [userFilesMetadata, setUserFilesMetadata] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8000/get-user-files", { userName: AuthService.getCurrentUser().accessToken })
    .then(response => {
        console.log(response.data);
        setUserFilesMetadata(response.data);
      }
    )
    .catch((err) =>{
      console.log("Didn't get this user's files");
    })
  }, []);

  function onButtonClick(pdf_name) {

    console.log("File name we're searching for: " + pdf_name);
    axios.post("http://localhost:8000/get-file-contents", { fileName: pdf_name }, {responseType: 'blob'})
      .then(response => {

 
        const blob = new Blob([response.data], { type: 'application/pdf' }); // Ensure correct MIME type
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'downloadedfile.pdf'); // Set a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
        

        console.log('File Data Received');
       
      })
      .catch(error => {
        console.error('Did not get file data', error);
      });
  };

  function searchUploadedNotes(){
    let searchQuery = document.getElementById("searchQueryInput").value;
    for(let i = 0; i < userFilesMetadata.length; i++){
      console.log(userFilesMetadata[i].fileName);
      if(userFilesMetadata[i].fileName === searchQuery){
        alert("You uploaded this file!");
        break;
      }
      if(i == userFilesMetadata.length - 1){
        
        alert("Didn't find this file in your uploads. Perhaps a classmate did?")
        
      }
    }
              
  }

    return (
        <div className="my-notes">
            <p id="title"> My Pages/Favorited</p>

            {/* Metadataarray.map -> button component (onC) */}

						<div className="profile-buttons">

              {userFilesMetadata.map((eachFileMetadata) => (
                      <div className="pdf-link" onClick={() => onButtonClick(eachFileMetadata.fileName)} style={{marginBottom: "15px", border: "3px solid black"}}>
                        {eachFileMetadata.fileName}
                      </div>
              ))}
              
            </div>

            <div style={{display: "flex", flexDirection: "row"}}>
              <input type="text" id="searchQueryInput" style={{marginRight: "5px"}}></input>
              <button onClick={searchUploadedNotes}>Search!</button>
            </div>
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
      setUsernameText(codeResponse.accessToken);
      localStorage.setItem('user', JSON.stringify(codeResponse));
      localStorage.setItem('userClasses', JSON.stringify([...userClassesID]));
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    setGoogleUser(null);
    setProfile({});
    setIsLoggedIn(false);
    setUsernameText("");
    AuthService.logout();
    //localStorage.removeItem('userClasses');
  };


  useEffect(
        () => {
          let isMounted = true;
          
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if(storedUser){
              setUsernameText(storedUser.accessToken);
            }
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
      const visibleClasses = userClasses.filter((cls) => userClassesID.includes(cls));
      console.log(userClassesID);
      axios
        .post("http://localhost:8000/add-class", {username: usernameText, userClasses: visibleClasses})
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

    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      const updatedUserClasses = updatedClasses.map((cls) => parseInt(cls));
      axios
        .post("http://localhost:8000/update-user-classes", {
          username: currentUser.accessToken,
          userClasses: updatedUserClasses,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error updating user classes", error);
        });
    }
  };

  const classCodeBox = (
    <ClassCodeBox addClass={addClass} classNames={classNames} />
  );

 
  return (
    <div className="container">
      {isLoggedIn && 
        <Notes></Notes>
      }
      <div className="user-info">
        {isLoggedIn ? (
          <div>
            <p id="title">My Profile</p>
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
            <p id="title">My Classes</p>
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

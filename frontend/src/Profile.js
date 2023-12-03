import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile,setProfile] = useState([]);
    const [tempUser, setTempUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const checkIfThere = (e) => {
        e.preventDefault();
        setTempUser(tempUser => {
            return {...tempUser, username: profile.email}
        });

        console.log(tempUser.username);

        
        axios
            .post('http://localhost:8000/loggin-user', tempUser)
            .then((res)=>{
                console.log("it worked");
            })
            .catch((err) => {
                console.log('Error in finding a user!');
            });
    }

    return (
        <div>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                    <button onClick={checkIfThere}>check</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google</button>
            )}
        </div>
    );
  }
  
  export default Profile;
  
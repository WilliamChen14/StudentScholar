import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import AuthService from './services/auth.service';

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
            const currentUser = AuthService.getCurrentUser();
            if(currentUser){
                console.log(currentUser);
            }
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
        AuthService.logout();
        googleLogout();
        setProfile(null);
    };

    const checkIfThere = (e) => {
        e.preventDefault();
        setTempUser(tempUser => {
            return {...tempUser, username: profile.email}
        });

        console.log(tempUser.username);

        AuthService.login(tempUser.username)
            .then((res)=>{
                console.log("logged in");
            })
            .catch((err)=>{
                console.log('Error in logging in');
            })

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
  
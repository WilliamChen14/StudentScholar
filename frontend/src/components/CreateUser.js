import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateUser = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile,setProfile] = useState([]);

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

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/add-user', user)
            .then((res)=>{
                setUser({
                    username:'',
                    password:'',
                })

                navigate('/');
            })
            .catch((err) => {
                console.log('Error in creating a user!');
              });
    }

    return (
        <div className='CreateBook'>
            <div>
            <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
            </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show BooK List
                </Link>
              </div>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Book</h1>
                <p className='lead text-center'>Create new book</p>
    
                <form noValidate onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Username'
                      name='username'
                      className='form-control'
                      value={user.username}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Password'
                      name='password'
                      className='form-control'
                      value={user.password}
                      onChange={onChange}
                    />
                  </div>
                  <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CreateUser;
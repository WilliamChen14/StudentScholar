import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateUser = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateFile = (props) => {
    const navigate = useNavigate();
    const [file, setFile] = useState({
        discription: '',
        file: '',
    });

    const onChange = (e) => {
        setFile({...file, [e.target.name]: e.target.value});
    }

    const handleFile = (e) => {
        setNewAuthor({...file, file: e.target.files[0]});
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/add-file', file)
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
        <form onSubmit={onSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="file"
                onChange={handleFile}
            />

            <input 
                type="text"
                placeholder="name"
                name="discription"
                value={file.discription}
                onChange={onChange}
            />

            <input 
                type="submit"
            />
        </form>
    );
};
  
export default CreateFile;
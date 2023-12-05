import './Files.css'
import UploadPhoto from './assets/upload-image.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {React, useState} from "react";
import axios from 'axios'

function handleButtonClick(id) {
  alert(id);
}

function Files() {

  const [file, setFile] = useState('');

  function submitForm() {


    console.log("Submitting form")

    const form = document.getElementById("form");
    
    const description = document.getElementById("description")
    const classSelected = document.getElementById("dropdown-basic");
    const fileSelected = document.getElementById("fileElem");
    const formData = new FormData();

    formData.append("description", description.value);
    formData.append("classSelected", classSelected.value);
    formData.append("file", fileSelected.files[0]);
    alert(fileSelected.files[0].name);
    alert(fileSelected.files[0].size, 'bytes');

    axios.post("http://localhost:8000/file-upload", formData)
    .then((res) => {
      console.log(res)
      console.log("It's worked until this point")

      alert("IT WORKED!!!!!!");
    })
    .catch((err) => console.error("Error occurred", err));

  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);

    alert("File has been uploaded to frontend")
  }


  return (
    <>
      <h1>Class Notes Upload Page</h1>
      <div className='flex-container'>
      <form id="form" className='my-files'>
        <div id='left-side'>
          <div id='drop-area'>
            
              <img src={UploadPhoto} className='upload-img'></img>
              <p className='colored-paragraph'>Drag and drop files here</p>
              <input type='file' id='fileElem' onChange={handleFileChange} />
              <label className='button' for='fileElem'>Select some files</label>

              <button type="submit" onClick={submitForm}>Submit File</button>
           
          </div>
        </div>
        <div id='right-side'>
          <div className='description-area'>
         
              <h2>Description</h2>
              <textarea type='text' id='description' text-align='left' placeholder='Enter notes description:' style=
                {{ width: '500px', height: '120px' }}></textarea>
           
          </div>
          <div className='class-area'>
            <h2>Classes</h2>
            

            <select id="dropdown-basic" title='Select a class'>
              <option value="1">COM SCI 35L</option>
              <option value="2">COM SCI M51A</option>
              <option value="3">MATH 33B</option>
            </select>
          </div>
        </div>
        </form>
      </div>
    </>
  );
}

export default Files;
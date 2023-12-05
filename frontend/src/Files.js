import './Files.css'
import UploadPhoto from './assets/upload-image.png';
import {React, useState} from "react";
import axios from 'axios'

const classes = ["COM SCI M51A", "COM SCI 35L", "MATH 33B", "STATS 100A"];

function ClassList() {

  return (
    <>
      {classes.map((classItem, valç) => {
        return (
          <option value={val}> {classItem} </option>
        )
      })}
    </>
  );
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
      <h1 id='title'>Class Notes Upload Page</h1>
      <form id="form" className='my-files'>
        <div className='flex-container'>
          <div id='left-side'>
            <div id='drop-area'>
              <img src={UploadPhoto} className='upload-img'></img>
              <p className='colored-paragraph'>Drag and drop files here</p>
              <input type='file' id='fileElem' onChange={handleFileChange} />
              <div class='upload-submit-buttons'>
                <label className='button' for='fileElem'>Select a file</label>
                <button type="submit" onClick={submitForm}>Submit File</button>
              </div>
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
                <ClassList></ClassList>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Files;
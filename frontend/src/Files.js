import './Files.css'
import UploadPhoto from './assets/upload-image.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { handleFiles } from './FileUpload'

import {useEffect} from 'react';
import AuthService from './services/auth.service';

function handleButtonClick(id) {
  alert(id);
}

function Files() {

  useEffect(
    ()=> {
      const user = AuthService.getCurrentUser();

      if (user) {
        console.log(user)
      }
      else{
        //redirect page to home
      }
      
      },[]
  );


  return (
    <>
      <h1>Class Notes Upload Page</h1>
      <div class='flex-container'>
        <div id='left-side'>
          <div id='drop-area'>
            <form class='my-files'>
              <img src={UploadPhoto} class='upload-img'></img>
              <p class='colored-paragraph'>Drag and drop files here</p>
              <input type='file' id='fileElem' onChange='handleFiles(this.files)' />
              <label class='button' for='fileElem'>Select some files</label>
            </form>
          </div>
        </div>
        <div id='right-side'>
          <div class='description-area'>
            <form class='my-description'>
              <h2>Description</h2>
              <textarea type='text' id='description' text-align='left' placeholder='Enter notes description:' style=
                {{ width: '500px', height: '120px' }}></textarea>
            </form>
          </div>
          <div class='class-area'>
            <h2>Classes</h2>
            <DropdownButton id='dropdown-basic-button' title='Select a class'>
              <Dropdown.Item href='#/action-1'>COM SCI 35L</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>COM SCI M51A</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>MATH 33B</Dropdown.Item>
              <Dropdown.Item href='#/action-4'>STATS 100A</Dropdown.Item>
              <Dropdown.Item href='#/action-5'>COM SCI 111</Dropdown.Item>
              <Dropdown.Item href='#/action-6'>ASIAN 88S</Dropdown.Item>
              <Dropdown.Item href='#/action-7'>MATH 61</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Files;
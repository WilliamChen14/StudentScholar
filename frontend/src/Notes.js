import React, { useState, useEffect} from 'react';
import './Notes.css';
import AuthService from './services/auth.service';

import axios from 'axios';
// import ReactDOM from 'react-dom/client'; // interactivity and dynamic changing of page
// import { Button } from 'react-bootstrap'; 
// import HeaderComponent from './components/HeaderComponent';
// import Container from "react-bootstrap/Container";
// import Card from 'react-bootstrap/Card';



const exampleMessages = [
  "These notes look great!",
  "Does anyone know what he means on pg 5?",
  "Thank you so much for these!!!",
  "@message above, can I dm you on IG?",
  "Who wants to make a study group for the final?"
];

const examplePDFs = [
  { name: "pythoncheatsheet.pdf", link: "https://www.math.cmu.edu/~sallison/concepts18/assignment1.pdf", description: "File 1" }, 
  { name: "Week 2 Lisp Worksheet Solutions.pdf", link: "https://cse.iitkgp.ac.in/~palash/2018AlgoDesignAnalysis/assignment1.pdf", description: "File 2" },
  { name: "Logic Systems Lec3", link: "https://www.bu.edu/lernet/artemis/years/2011/slides/logicgates.pdf", description: "File 3" },
  { name: "Chess Lec2", link: "https://exeterchessclub.org.uk/chessx/pdf/TacticsInJuniorOpenings.pdf", description: "File 4" },
  { name: "Brain PDF", link: "https://catalog.ninds.nih.gov/sites/default/files/publications/know-your-brain-brain-basics.pdf", description: "File 5" }
];

const Notes = () => {
  const [curClass, setCurClass] = useState("");
  const [curClassName, setCurClassName] = useState("");
  
  const [activeSection, setActiveSection] = useState("notesPDFs");
  const [selectedPDF, setSelectedPDF] = useState(null);

  const [newMessage, setNewMessage] = useState([]);
  const [classMessages, setClassMessages] = useState([]);

  const [fileMetadata, setFileMetadata] = useState([]);

  const [fileDescription, setFileDescription] = useState("");

  function fetchFilesForClass(className) {
    // Encode the class name to ensure the URL is correctly formatted
  
    // Construct the URL with the encoded class name
    const url = `http://localhost:8000/get-class-files`;
    
    console.log(url);
    // Make the GET request
    axios.post(url, { className: className })
      .then(response => {
        console.log('Files:', response.data);
        console.log(response.data[1].description);
        // Handle the response data (array of files)

        setFileMetadata(response.data);

      })
      .catch(error => {
        console.error('Error fetching files:', error);
        // Handle errors here
      });
  }

  const submitNewComment = () => {
    classMessages.push(newMessage);
    axios
      .post("http://localhost:8000/update-class-discussion", { classID: AuthService.getClassPage(), classConversation: classMessages})
        .then(response =>{
        })

    setNewMessage("");
  }

  useEffect(
      () => {
      const user = AuthService.getCurrentUser();

        if (user) {
          console.log(user)
        }
        else{
          //redirect page to home
        }


      const currentPageID = AuthService.getClassPage();
      
      axios
      .post("http://localhost:8000/get-class", { classID: currentPageID})
        .then(response =>{
            console.log(response.data.className);
            setCurClassName(response.data.className);
            setClassMessages(response.data.classConversation);
            if(response.data.className){
              console.log("Fetching files for class! We're trying in next 2 line")
              setCurClass(response.data.className);

              console.log(response.data.className);

              fetchFilesForClass(response.data.className);
              
            }
        })
        .catch((err) =>{
          console.log("Update didn't carry over - for class name");
        })


      
      
    }, [AuthService.getClassPage()]


  );

  

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const openPDFInFrame = (pdf_name) => {

    console.log("File name we're searching for: " + pdf_name);
    axios.post("http://localhost:8000/get-file-contents", { fileName: pdf_name }, {responseType: 'blob'})
      .then(response => {

 
        const blob = new Blob([response.data], { type: 'application/pdf' }); // Ensure correct MIME type
        const downloadUrl = window.URL.createObjectURL(blob);

        const iframe = document.getElementById('mainIFrame');
        iframe.src = downloadUrl;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'downloadedfile.pdf'); // Set a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
        

        console.log('File Data Received, how to display?: ', response.data);
       
      })
      .catch(error => {
        console.error('Did not get file data', error);
      });
    

    setSelectedPDF(pdf_name);
    const displayedPDFDiv = document.querySelector('.displayedPDF');

    for(let i = 0; i < fileMetadata.length; i++){
      console.log("Class File's Name" + fileMetadata[i].fileName)
      
      if(fileMetadata[i].fileName == pdf_name){
        console.log(fileMetadata[i].description);
        setFileDescription(fileMetadata[i].description);
        break;
      }
    }
  };


    return (
      <>

        <h1> {curClass} Notes Display and Convo Page</h1>          
        <div className="body">
            <div className="leftHalf">
        
              <div className="displayedPDF">
                {/*The selected PDF will be displayed here*/}
                {selectedPDF && (
                  <iframe
                    title="Selected PDF"
                    src={selectedPDF.link}
                    width="100%"
                    height="500px"
                    id="mainIFrame"
                  />
                )}
              </div>

              <div className="description">
                <div className="descriptionHeader">
                  <p>
                    File Description
                  </p>
                </div>
                <div className="descriptionText">
                  {fileDescription}
                </div>
              </div>

            </div>
            <div className="rightHalf">

              <div className="header">
                <div
                  className = {`section-switch ${activeSection === "notesPDFs" ? "active" : ""}`}
                  onClick={() => switchSection("notesPDFs")}
                  >
                    Notes
                </div>
                <div
                  className={`section-switch ${activeSection === "discussion" ? "active" : ""}`}
                  onClick={() => switchSection("discussion")}
                >
                    Discussion
               </div>
              </div>

              {activeSection === "notesPDFs" ? (
                <div className="notesPDFs">
                  {fileMetadata.map((eachFileMetadata) => (
                    <div className="pdf-link" onClick={() => openPDFInFrame(eachFileMetadata.fileName)}>
                      {eachFileMetadata.fileName}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="discussion">
                <div className="allMessages">
                  {classMessages.map((message, index) => (
                    <div key={index} className="messageBox">
                      {message}
                    </div>
                  ))}
                </div>
                <div className="insertTextBox">
                  <input
                    type="text"
                    placeholder="Type Here"
                    value={newMessage}
                    onChange={(e)=> setNewMessage(e.target.value)}
                  />
                  <button onClick={submitNewComment}>comment</button>
                  </div>
                </div>
              )}
            </div>

          </div>
      </>
    );
  };
  
  export default Notes;
  

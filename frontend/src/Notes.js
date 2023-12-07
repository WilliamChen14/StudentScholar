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

  useEffect(
    () => {
      const currentPage = AuthService.getClassPage();

      

      if(currentPage){
        console.log(currentPage);
        setCurClass(currentPage);

        // let newString = "";

        // for(let i = 0; i < currentPage.length; i++){
        //   if(currentPage[i] == " "){
        //     newString = newString + "%20";
        //   } else {
        //     newString = newString + currentPage[i];
        //   }
        // }

        fetchFilesForClass(currentPage);

      } else {
        // did not update
        console.log("Update didn't carry over - for class name")
      }

      
      
    }, [AuthService.getClassPage()]


  );

  const [activeSection, setActiveSection] = useState("notesPDFs");
  const [selectedPDF, setSelectedPDF] = useState(null);
  const switchSection = (section) => {
    setActiveSection(section);
  };

  const openPDFInFrame = (pdf) => {
    setSelectedPDF(pdf);
    const displayedPDFDiv = document.querySelector('.displayedPDF');

    for(let i = 0; i < fileMetadata.length; i++){
      console.log("Class File's Name" + fileMetadata[i].fileName)
      
      if(fileMetadata[i].fileName == pdf.name){
        console.log(fileMetadata[i].description);
        setFileDescription(fileMetadata[i].description);
        break;
      }
    }

    //if a pdf is chosen
    if (pdf) {
      //clear existing content in the displayedPDF div
      displayedPDFDiv.innerHTML = '';
      //create a new iframe element
      const pdfIframe = document.createElement('iframe');
      pdfIframe.title = 'Selected PDF';
      pdfIframe.src = pdf.link;
      pdfIframe.width = '100%';
      pdfIframe.height = '500px';
      //Append the iframe to the displayedPDF div
      displayedPDFDiv.appendChild(pdfIframe);
    }

    // else {
    // // If no PDF is selected, display a default message //IDK WHY THIS DOESNT WORK
    //   displayedPDFDiv.innerHTML = '<div class="default-message">Choose a PDF for this class.</div>';

    // }
  };
  const addToFavorites = () => {
    if(selectedPDF) {
      //add logic to add to favorites in some state or storage
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
                  />
                )}
              </div>

              <div className="favoriteSection">
                <p>
                  Like this Note in particular?
                </p>
                <button onClick={addToFavorites}>{fileDescription}</button>
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
                  {examplePDFs.map((pdf, index) => (
                    <div key={index} className="pdf-link" onClick={() => openPDFInFrame(pdf)}>
                      {pdf.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="discussion">
                  {exampleMessages.map((message, index) => (
                    <div key={index} className="messageBox">
                      {message}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
      </>
    );
  };
  
  export default Notes;
  

import React, { useState, useEffect} from 'react';  //use state to change bw notes and convo
import './Notes.css';

// import ReactDOM from 'react-dom/client'; // interactivity and dynamic changing of page
// import { Button } from 'react-bootstrap'; 
// import HeaderComponent from './components/HeaderComponent';
import './Notes.css';
// import Container from "react-bootstrap/Container";
// import Card from 'react-bootstrap/Card';


import AuthService from './services/auth.service';

const Notes = () => {

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

  //create setOnNotesPg function?
  //let onNotesPage = useState(true); //use this?
  //blah
  const [onNotesPg, setOnNotesPg] = useState(true);


  const [activeSection, setActiveSection] = useState("notes");
  const [selectedPDF, setSelectedPDF] = useState(null);

  const switchSection = (section) => {
    setActiveSection(section);
  };
  const openPDFInFrame = (pdf) => {
    setSelectedPDF(pdf);
    const displayedPDFDiv = document.querySelector('.displayedPDF');

    //clear existing content in the displayedPDF div
    if (pdf) {
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
    else {
    // If no PDF is selected, display a default message
    const defaultMessage = document.createTextNode('Choose a PDF for this class.');
    displayedPDFDiv.appendChild(defaultMessage);
    }
  };

  const exampleMessages = [
    "These notes look great!",
    "Does anyone know what he means on pg 5?",
    "Thank you so much for these!!!",
    "@message above, can I dm you on IG?",
    "Who wants to make a study group for the final?"
  ];
  
  const examplePDFs = [
    { name: "PDF 1", link: "https://example.com/pdf1.pdf" },
    { name: "PDF 2", link: "https://example.com/pdf2.pdf" },
  ];

    return (
      <>
        <h1> Class Notes Display and Convo Page</h1>          
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
                {/* <p>
                  <img
                    src="https://i.pinimg.com/564x/0a/cf/9c/0acf9c74257608d41289cde8e937c603.jpg"
                  />
                </p> */}
              </div>



              <div className="blank">
                <p>
                  Author Notes?
                </p>
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
  

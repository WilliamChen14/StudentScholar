import React, { useState, useEffect} from 'react';
import './Notes.css';
import AuthService from './services/auth.service';
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
  { name: "HW3", link: "https://www.math.cmu.edu/~sallison/concepts18/assignment1.pdf" },
  { name: "HW4 Ans", link: "https://cse.iitkgp.ac.in/~palash/2018AlgoDesignAnalysis/assignment1.pdf" },
  { name: "Logic Systems Lec3", link: "https://www.bu.edu/lernet/artemis/years/2011/slides/logicgates.pdf" },
  { name: "Chess Lec2", link: "https://exeterchessclub.org.uk/chessx/pdf/TacticsInJuniorOpenings.pdf" },
  { name: "Brain PDF", link: "https://catalog.ninds.nih.gov/sites/default/files/publications/know-your-brain-brain-basics.pdf" }
];

const Notes = () => {
  const [curClass, setCurClass] = useState("");
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
                <button onClick={addToFavorites}>Add to Favorites</button>
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
  

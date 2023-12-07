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
  { name: "HW3", link: "https://www.math.cmu.edu/~sallison/concepts18/assignment1.pdf" },
  { name: "HW4 Ans", link: "https://cse.iitkgp.ac.in/~palash/2018AlgoDesignAnalysis/assignment1.pdf" },
  { name: "Logic Systems Lec3", link: "https://www.bu.edu/lernet/artemis/years/2011/slides/logicgates.pdf" },
  { name: "Chess Lec2", link: "https://exeterchessclub.org.uk/chessx/pdf/TacticsInJuniorOpenings.pdf" },
  { name: "Brain PDF", link: "https://catalog.ninds.nih.gov/sites/default/files/publications/know-your-brain-brain-basics.pdf" }
];

const Notes = () => {
  const [curClass, setCurClass] = useState("");
  const [curClassName, setCurClassName] = useState("");
  
  const [activeSection, setActiveSection] = useState("notesPDFs");
  const [selectedPDF, setSelectedPDF] = useState(null);

  const [newMessage, setNewMessage] = useState([]);
  const [classMessages, setClassMessages] = useState([]);

  function fetchFilesForClass(className) {
    // Encode the class name to ensure the URL is correctly formatted
    
  
    // Construct the URL with the encoded class name
    const url = `http://localhost:8000/get-class-files`;
    console.log(url);
    // Make the GET request
    axios.post(url, { className: className })
      .then(response => {
        console.log('Files:', response.data);
        // Handle the response data (array of files)
        
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
              setCurClass(response.data.className);
              fetchFilesForClass(response.data.classID);
            }
        })
        .catch((err) =>{
          console.log("Update didn't carry over - for class name");
        })

      /*

      if(curClassName){
        console.log(curClassName);
        setCurClass(curClassName);

        // let newString = "";

        // for(let i = 0; i < currentPage.length; i++){
        //   if(currentPage[i] == " "){
        //     newString = newString + "%20";
        //   } else {
        //     newString = newString + currentPage[i];
        //   }
        // }

        fetchFilesForClass(curClassName);

      } else {
        // did not update
        console.log("Update didn't carry over - for class name")
        
      }*/

      
      
    }, [AuthService.getClassPage()]


  );

  

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
                  {classMessages.map((message, index) => (
                    <div key={index} className="messageBox">
                      {message}
                    </div>
                  ))}

                  <div>
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
  

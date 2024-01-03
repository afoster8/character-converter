import React, { useState, useEffect } from 'react';
import './App.css';
import generateMatches from "./components/converter.js";

function App({ json }) {
  const [result, setResult] = useState({
    inputKanji: "",
    simplified: "",
    traditional: ""
  });

  const [info, setInfo] = useState("");

  useEffect(() => {
    const infoContainer = document.querySelector('.info-container');
    if (infoContainer && info) {
      infoContainer.classList.add('animate');
    }
  }, [info]); 

  const handleMatchClick = () => {
    const { inputKanji, simplified, traditional } = generateMatches(json);
    setResult({ inputKanji, simplified, traditional });
    setInfo(""); 
  };

  const handleContainerClick = (category) => {
    switch (category) {
      case 'kanji':
        setInfo("Information about Kanji goes here.");
        break;
      case 'simplified':
        setInfo("Information about Simplified goes here.");
        break;
      case 'traditional':
        setInfo("Information about Traditional goes here.");
        break;
      default:
        setInfo("");
    }

  };


  return (
    <div className="App">
      <h1>Japanese Character to Simplified and Traditional Chinese Converter</h1>
      <p> Input a Japanese character, output simplified and traditional Chinese characters. Intended for people who know Japanese 漢字 but not Chinese characters. </p>

      <div className="input-container">
        <label htmlFor="input-kanji">漢字:</label>
        <input type="text" id="input-kanji"></input>
        <button onClick={handleMatchClick}>Match</button>
      </div>

      {result.inputKanji && result.simplified && result.traditional &&
        <div className="results">
          <div className="kanji-container" onClick={() => handleContainerClick('kanji')}>
            <h2>Kanji</h2>
            <p id="kanji">{result.inputKanji}</p>
          </div>

          <div className="simplified-container" onClick={() => handleContainerClick('simplified')}>
            <h2>Simplified</h2>
            <p id="simplified">{result.simplified}</p>
          </div>

          <div className="traditional-container" onClick={() => handleContainerClick('traditional')}>
            <h2>Traditional</h2>
            <p id="traditional">{result.traditional}</p>
          </div>
        </div>
      }

      {info &&
        <div className="info-container">
          <h2>Information</h2>
          <p>{info}</p>
        </div>
      }
    </div>
  );
}

export default App;

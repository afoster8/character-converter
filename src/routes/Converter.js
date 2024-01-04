import React, { useState, useEffect } from 'react';
import json from "../conversion_table.json"
import "./Converter.css"

const Converter = () => {

  const [result, setResult] = useState({
    kanji: "",
    simplified: "",
    traditional: ""
  });

  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("japanese");

  useEffect(() => {
    const infoContainer = document.querySelector('.info-container');
    if (infoContainer && info) {
      infoContainer.classList.add('animate');
    }
  }, [info]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const generateJapaneseMatches = () => {

    if (!json) {
      console.log("CSV data not loaded yet.");
      return;
    }

    const kanji = document.getElementById("input-character").value;

    if (!kanji) {
      throw new Error("Where is the kanji?");
    }

    try {
      const result = json.data;
      const matchingRow = result.find(row => row[0] === kanji);

      if (matchingRow) {
        const simplified = matchingRow[1] ? matchingRow[1] : "n/a";
        const traditional = matchingRow[2] ? matchingRow[2] : "n/a";
        return { kanji, simplified, traditional };
      }

    } catch (error) {
      console.log(error);
      throw new Error("Something bad happened.")
    }
  };

  const handleMatchClick = () => {
    setError();

    if (language === "japanese") {
      try {
        const { kanji, simplified, traditional } = generateJapaneseMatches(json);
        setResult({ kanji, simplified, traditional });
        setInfo("");

      } catch (e) {
        setError("Character missing");
        setInfo("");
        setResult({});
      }

    } else {
      console.log("not implemented yet");
      setError("No Chinese conversion yet!")
      setInfo("");
      setResult({});
    }
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
    <div className="page">
      <div className="main-content">
        <h1>Kanji & Hanzi (Simplified & Traditional)</h1>

        <p> Input character to see what its equivalents are in kanji or simplified/traditional characters. </p>
        <p> No need to differentiate between simple and traditional characters </p>

        {error && <p className="error-message">{error}</p>}

        <div className="input-container">

          <label htmlFor="input-language">Select Language:</label>
          <select id="input-language" onChange={handleLanguageChange}>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
          </select>

          <div className="input">
            <input type="text" id="input-character" maxLength={1}></input>
            <button onClick={handleMatchClick}>Match</button>
          </div>
        </div>

        {result.kanji && result.simplified && result.traditional &&
          <div className="results">
            <div className="kanji-container" onClick={() => handleContainerClick('kanji')}>
              <h2>Kanji</h2>
              <p id="kanji">{result.kanji}</p>
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
    </div>
  );
}

export default Converter;
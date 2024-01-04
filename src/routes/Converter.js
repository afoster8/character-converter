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

  const generateJapaneseMatches = (kanji) => {

    if (!json) {
      console.log("CSV data not loaded yet.");
      return;
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

  const generateChineseMatches = (hanzi) => {

    if (!json) {
      console.log("CSV data not loaded yet.");
      return;
    }

    try {
      console.log("not implemented yet");
      return {};

    } catch (error) {
      console.log(error);
      throw new Error("Something bad happened.")
    }
  };


  const handleMatchClick = () => {
    setError("");

    try {
      const character = document.getElementById("input-character").value;

      if (!character) {
        setError("No character entered! Please try again.")
        throw new Error("No character found");
      }

      if (language === "japanese") {
        try {
          const { kanji, simplified, traditional } = generateJapaneseMatches(character);
          setResult({ kanji, simplified, traditional });
          setInfo("");

        } catch (e) {
          setError("Character not found in Japanese dictionary.");
          setInfo("");
          setResult({});
        }

      } else if (language === "chinese") {

        try {
          // const { kanji, simplified, traditional } = generateChineseMatches();
          // setResult({ kanji, simplified, traditional });
          setResult(generateChineseMatches());
          setError("Chinese mode not implemented yet!");
          setInfo("");

        } catch (e) {
          setError("Character not found in Chinese dictionary.");
          setInfo("");
          setResult({});
        }

      } else {
        setError("What did you do...?")
        setInfo("");
        setResult({});
      }

    } catch (error) {
      console.log(error);
      setError("You didn't enter anything!");
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
        <h1>Kanji ⇿ Hanzi (Simplified & Traditional)</h1>

        <p> Input character to see what its equivalents are in kanji or simplified/traditional characters. </p>
        <p> No need to differentiate between simplified and traditional characters. </p>

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

      <div className="footer">
      <p>Uses <a href="https://lotus.kuee.kyoto-u.ac.jp/~chu/pubdb/LREC2012/kanji_mapping_table.txt">this resource from Dr. Chen Chu </a> 
      for mappings between character classes. </p>
      </div>
    </div>
  );
}

export default Converter;
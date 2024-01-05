import React, { useState } from 'react';
import japn_json from "../conversion/kanji_conversion.json"
import trad_json from "../conversion/traditional_conversion.json"
import simp_json from "../conversion/simplified_conversion.json"
import "./Converter.css"

const Converter = () => {

  const [showKanjiInfo, setShowKanjiInfo] = useState(false);
  const [showTraditionalInfo, setShowTraditionalInfo] = useState(false);
  const [showSimplifiedInfo, setShowSimplifiedInfo] = useState(false);

  const [result, setResult] = useState({
    kanji: "",
    simplified: "",
    traditional: "",
  });

  const [error, setError] = useState("");
  const [language, setLanguage] = useState("japanese");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const handleContainerClick = (container) => {
    switch (container) {
      case 'kanji':
        setShowKanjiInfo(!showKanjiInfo);
        break;
      case 'traditional':
        setShowTraditionalInfo(!showTraditionalInfo);
        break;
      case 'simplified':
        setShowSimplifiedInfo(!showSimplifiedInfo);
        break;
      default:
        setShowKanjiInfo(false);
        setShowTraditionalInfo(false);
        setShowSimplifiedInfo(false);
    }
  };

  const generateJapaneseMatches = (kanji) => {

    if (!japn_json) {
      throw new Error("Japanese dictionary is gone!")
    }

    try {
      const result = japn_json.data;
      const matchingRow = result.find(row => row[0] === kanji);

      if (matchingRow) {
        const simplified = matchingRow[2] ? matchingRow[2] : "n/a";
        const traditional = matchingRow[1] ? matchingRow[1] : "n/a";
        return { kanji, simplified, traditional };

      } else {
        throw new Error(`${kanji} not found in Japanese dictionary`)
      }

    } catch (error) {
      throw new Error(error)
    }
  };

  const generateChineseMatches = (hanzi) => {

    if (!trad_json || !simp_json) {
      throw new Error("Chinese dictionary is gone!")
    }

    try {
      const result = simp_json.data;
      const matchingRow = result.find(row => row[0] === hanzi)

      if (matchingRow) {
        const kanji = matchingRow[1] ? matchingRow[1] : "n/a";
        const traditional = matchingRow[2] ? matchingRow[2] : "n/a";
        console.log("within function: " + hanzi)
        return { kanji, simplified: hanzi, traditional };

      } else {
        const result = trad_json.data;
        const matchingRow = result.find(row => row[0] === hanzi)

        if (matchingRow) {
          const kanji = matchingRow[1] ? matchingRow[1] : "n/a";
          const simplified = matchingRow[2] ? matchingRow[2] : "n/a";
          return { kanji, simplified, traditional: hanzi };

        } else {
          throw new Error(`${hanzi} not found in dictionary`)
        }
      }

    } catch (error) {
      throw new Error(error)
    }
  };


  const handleMatchClick = () => {
    setError("");

    try {
      const character = document.getElementById("input-character").value;

      if (!character) {
        throw new Error("You didn't enter anything!");
      }

      if (language === "japanese") {
        try {
          const { kanji, simplified, traditional } = generateJapaneseMatches(character);
          setResult({ kanji, simplified, traditional });

        } catch (error) {
          throw new Error(error)
        }

      } else if (language === "chinese") {

        try {
          const { kanji, simplified, traditional } = generateChineseMatches(character);
          setResult({ kanji, simplified, traditional });

        } catch (error) {
          throw new Error(error)
        }

      }

    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong")
      }
    }
  };

  const renderChineseCharacterInfo = (character) => {
    return (
      <div className="character-info">
        <h3>{character}</h3>
        <p>Strokes: </p>
        <p>Meanings: </p>
        <div className="readings">
          <p>Readings: </p>
          <div className="readings-info">
            <p>Zhuyin: </p>
            <p>Pinyin: </p>
            <p>IPA: </p>
          </div>
        </div>
      </div>
    );
  };

  const renderJapaneseCharacterInfo = (character) => {
    return (
      <div className="character-info">
        <h3>{character}</h3>
        <p>Strokes: </p>
        <p>Meanings: </p>
        <div className="readings">
          <p>Readings: </p>
          <div className="readings-info">
            <p>On: </p>
            <p>Kun: </p>
            <p>IPA: </p>
          </div>
        </div>
      </div>
    );
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

        {(result.kanji || result.simplified || result.traditional) && (
          <div className="results">

            <div className="japanese-column">
              <div className="kanji-container">
                <h2>Kanji</h2>
                <div className="kanji-types-container" onClick={() => handleContainerClick('kanji')}>
                  <p id="kanji">{result.kanji}</p>
                </div>
              </div>

              <div className={`information ${showKanjiInfo ? 'active' : ''}`}>
                {result.kanji.length === 1 ? (
                  renderJapaneseCharacterInfo(result.kanji)
                ) : (
                  result.kanji.split(', ').map((char, index) => (
                    <div key={index}>
                      {renderJapaneseCharacterInfo(char)}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="chinese-column">
              <div className="hanzi-container">
                <h2>Hanzi</h2>
                <div className="hanzi-types-container">
                  <div className="traditional-container" onClick={() => handleContainerClick('traditional')}>
                    <h3>Traditional</h3>
                    <p id="traditional">{result.traditional}</p>
                  </div>

                  <div className="simplified-container" onClick={() => handleContainerClick('simplified')}>
                    <h3>Simplified</h3>
                    <p id="simplified">{result.simplified}</p>
                  </div>
                </div>
              </div>

              <div className="sub-chinese-column">
                <div className={`information ${showTraditionalInfo ? 'active' : ''}`}>
                  {result.traditional.length === 1 ? (
                    renderChineseCharacterInfo(result.traditional)
                  ) : (
                    result.traditional.split(', ').map((char, index) => (
                      <div key={index}>
                        {renderChineseCharacterInfo(char)}
                      </div>
                    ))
                  )}
                </div>

                <div className={`information ${showSimplifiedInfo ? 'active' : ''}`}>
                  {result.simplified.length === 1 ? (
                    renderJapaneseCharacterInfo(result.simplified)
                  ) : (
                    result.simplified.split(', ').map((char, index) => (
                      <div key={index}>
                        {renderChineseCharacterInfo(char)}
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      <div className="footer">
        <p>Uses <a href="https://lotus.kuee.kyoto-u.ac.jp/~chu/pubdb/LREC2012/kanji_mapping_table.txt">this resource from Dr. Chen Chu </a>
          for mappings between character classes. </p>
      </div>
    </div>
  );
}

export default Converter;
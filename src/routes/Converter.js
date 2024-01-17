import React, { useState } from 'react';
import japnJson from "../conversion/kanji_conversion.json"
import tradJson from "../conversion/traditional_conversion.json"
import simpJson from "../conversion/simplified_conversion.json"
import hanziJson from "../conversion/hanzi_info.json"
import kanjiJson from "../conversion/kanji_info.json"
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
    if (!japnJson) {
      throw new Error("Japanese dictionary is gone!")
    }

    try {
      const result = japnJson.data;
      const matchingRow = result.find(row => row[0] === kanji);

      if (matchingRow) {
        const simplified = matchingRow[2] ? matchingRow[2] : "n/a";
        const traditional = matchingRow[1] ? matchingRow[1] : "n/a";
        return { kanji, simplified, traditional };

      } else {
        throw new Error(`${kanji} not found in Japanese dictionary`)
      }

    } catch (error) {
      throw error;
    }
  };

  const generateChineseMatches = (hanzi) => {
    if (!tradJson || !simpJson) {
      throw new Error("Chinese dictionary is gone!")
    }

    try {
      const result = simpJson.data;
      const matchingRow = result.find(row => row[0] === hanzi)

      if (matchingRow) {
        const kanji = matchingRow[1] ? matchingRow[1] : "n/a";
        const traditional = matchingRow[2] ? matchingRow[2] : "n/a";

        return { kanji, simplified: hanzi, traditional };

      } else {
        const result = tradJson.data;
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
      throw error;
    }
  };


  const handleMatchClick = () => {
    setError("");
    setShowKanjiInfo(false);
    setShowSimplifiedInfo(false);
    setShowTraditionalInfo(false);

    try {
      const character = document.getElementById("input-character").value;

      if (!character) {
        throw new Error("You didn't enter anything!");
      }

      if (language === "japanese") {
        try {
          const { kanji, simplified, traditional } = generateJapaneseMatches(character);

          if (simplified === "n/a" && traditional === "n/a") {
            throw new Error("No matches found");
          }

          setResult({ kanji, simplified, traditional });

        } catch (error) {
          throw error;
        }

      } else if (language === "chinese") {

        try {
          const { kanji, simplified, traditional } = generateChineseMatches(character);

          if (kanji === "n/a" && (traditional === "n/a" || simplified === "n/a")) {
            throw new Error("No matches found");
          }

          setResult({ kanji, simplified, traditional });

        } catch (error) {
          throw error;
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

  const renderChineseCharacterInfo = (character, mode) => {
    if (character) {
      var match = hanziJson.find(entry => entry.character === character);

      if (match) {
        return (
          <div className="character-info">
            <h3>{character}</h3>
            <table>
              <tbody>
                <tr>
                  <td><strong>Strokes</strong></td>
                  <td>{match.strokes[mode]}</td>
                </tr>
                <tr>
                  <td><strong>Meanings</strong></td>
                  <td>{match.meanings.join(", ")}</td>
                </tr>
                <tr>
                  <td><strong>Pinyin</strong></td>
                  <td>{match.readings_man[mode]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      }
    }
  };

  const renderJapaneseCharacterInfo = (character) => {
    if (character) {
      var match = kanjiJson.find(entry => entry.character === character);

      if (match) {
        return (
          <div className="character-info">
            <h3>{character}</h3>
            <table>
              <tr>
                <td><strong>Strokes</strong></td>
                <td>{match.strokes}</td>
              </tr>
              <tr>
                <td><strong>Meanings</strong></td>
                <td>{match.meanings.join(", ")}</td>
              </tr>
              <tr>
                <td><strong>On</strong></td>
                <td>{match.reading_on.join(", ")}</td>
              </tr>
              <tr>
                <td><strong>Kun</strong></td>
                <td>{match.reading_kun.join(", ")}</td>
              </tr>

            </table>
          </div>
        );
      }
    }
  };


  return (
    <div className="page">
      <div className="main-content">
        <h1>Kanji ⇿ Hanzi (Simplified & Traditional)</h1>

        <p> Input one character to see its equivalents in kanji or simplified and traditional hanzi. </p><br/>
        <p> First, choose your input language. If you are inputting a Japanese character, choose Japanese. If you are inputting a Chinese character, choose Chinese. </p><br/>
        <p> Then type exactly one character in the input box. </p>

        {error && <p className="error-message">{error}</p>}

        <div className="input-container">

          <label htmlFor="input-language">Select Input Language:</label>
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
                    renderChineseCharacterInfo(result.traditional, "zh-Hant")
                  ) : (
                    result.traditional.split(', ').map((char, index) => (
                      <div key={index}>
                        {renderChineseCharacterInfo(char, "zh-Hant")}
                      </div>
                    ))
                  )}
                </div>

                <div className={`information ${showSimplifiedInfo ? 'active' : ''}`}>
                  {result.simplified.length === 1 ? (
                    renderChineseCharacterInfo(result.simplified, "zh-Hans")
                  ) : (
                    result.simplified.split(', ').map((char, index) => (
                      <div key={index}>
                        {renderChineseCharacterInfo(char, "zh-Hans")}
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
import React, { useState } from 'react';
import "./JapaneseIpa.css"
import { convertToIpa, convertToKana } from "../conversion/converterutils/kana_converter.js";
import json from "../conversion/japanese_ipa_conversion.json";

const JapaneseIpa = () => {
  const [error, setError] = useState("");
  const [ipaResult, setIpaResult] = useState("");
  const [kanaResult, setKanaResult] = useState("");
  const [ipaInput, setIpaInput] = useState("");
  const [kanaInput, setKanaInput] = useState("");

  const handleConvertClick = (selection) => {
    var result = "";
    setError("");

    try {

      switch (selection) {
        case "kana-input":
          result = convertToIpa(json);
          setKanaInput(document.getElementById("kana-input").value);
          setIpaResult(result);
          break;

        case "ipa-input":
          result = convertToKana(json);
          setIpaInput(document.getElementById("ipa-input").value);
          setKanaResult(result);
          break;

        default:
          break;
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page">
      <div className="main-content">

        <h1>Kana ⇿ IPA</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Kana, output IPA! </h2>
            <div className="mode-info">
              <p> A work in progress! </p>
            </div>

            <div className="input-container-conversion">
              <input type="text" id="kana-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("kana-input")}>Convert</button>
            </div>

            {ipaResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{kanaInput}</p>
                </div>

                <div className="user-output">
                  <p id="ipa-output">{ipaResult}</p>
                </div>
              </div>
            }
          </div>


          <div className="modes">
            <h2> Input Ipa, output Kana! </h2>
            <div className="mode-info">
              <p> A work in progress! </p>
            </div>


            <div className="input-container-conversion">
              <input type="text" id="ipa-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("ipa-input")}>Convert</button>
            </div>

            {kanaResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{ipaInput}</p>
                </div>

                <div className="user-output">
                  <p id="output">{kanaResult}</p>
                </div>
              </div>
            }
          </div>

        </div>

      </div>
      <div className="footer">
        <p>Creator of these tools is intermediate at Japanesr at best. Use at your own peril.</p>
        <br />
        <p>Sources for kana/romaji/IPA were a collection of the creator's own knowledge and  mapping can be found
          <a href="https://wiktionary.org">Wiktionary</a>.</p>
      </div >
    </div>
  );
}

export default JapaneseIpa;
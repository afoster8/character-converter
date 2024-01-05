import React, { useState } from 'react';
import "./PinyinIpa.css"
import { convertToIpa, convertToPinyin } from "../conversion/converterutils/pinyin_converter.js";
import json from "../conversion/chinese_ipa_conversion.json";

const PinyinIpa = () => {
  const [error, setError] = useState("");
  const [ipaResult, setIpaResult] = useState("");
  const [pinyinResult, setPinyinResult] = useState("");
  const [ipaInput, setIpaInput] = useState("");
  const [pinyinInput, setPinyinInput] = useState("");

  const handleConvertClick = (selection) => {
    var result = "";
    setError("");

    try {
      var input = "";

      switch (selection) {
        case "pinyin-input":

          input = document.getElementById("pinyin-input").value.trim();

          if (!input) {
            throw new Error("You haven't entered anything!");
          }

          result = convertToIpa(json);
          setPinyinInput(input);
          setIpaResult(result);
          break;

        case "ipa-input":

          input = document.getElementById("ipa-input").value.trim();

          if (!input) {
            throw new Error("You haven't entered anything!");
          }

          result = convertToPinyin(json);
          setIpaInput(input);
          setPinyinResult(result);
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

        <h1>Pinyin ⇿ IPA for Mandarin Chinese</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Pinyin, output IPA! </h2>
            <div className="mode-info">
              <p><a href="https://en.wikipedia.org/wiki/Pinyin">Pinyin</a> is a Chinese transliteration and writing system for Mandarin Chinese.</p>
              <p> Pinyin should have spaces between syllables (not just words!) and are expected to have tone markings where appropriate. If you're missing the tone markings, everything will return as tone 5. </p>
              <p> If you don't have a keyboard that can generate tone markings, you can find a copy-paste tool <a href="https://www.lexilogos.com/keyboard/chinese_pinyin.htm">here</a>.</p>
            </div>



            <div className="input-container-conversion">
              <input type="text" id="pinyin-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("pinyin-input")}>Convert</button>
            </div>

            {ipaResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{pinyinInput}</p>
                </div>

                <div className="user-output">
                  <p id="ipa-output">{ipaResult}</p>
                </div>
              </div>
            }
          </div>


          <div className="modes">
            <h2> Input IPA, output Pinyin! </h2>
            <div className="mode-info">
              <p> IPA can include diacritics or not, but all diacritics will be ignored when searching the JSON file. There is a lot of variation in what diacritics are used for each sound in Mandarin, so this simplifies the search.</p>
              <p> Syllables should have spaces between them and may or may not have tones (1-5) after each syllable. </p>
              <p> If you don't have a IPA keyboard, you can find a copy-paste tool <a href="https://ipa.typeit.org/">here</a>.</p>
            </div>


            <div className="input-container-conversion">
              <input type="text" id="ipa-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("ipa-input")}>Convert</button>
            </div>

            {pinyinResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{ipaInput}</p>
                </div>

                <div className="user-output">
                  <p id="output">{pinyinResult}</p>
                </div>
              </div>
            }
          </div>

        </div>

      </div>
      <div className="footer">
        <p>Creator of these tools has not studied Chinese at all. Use at your own peril.</p>
        <br />
        <p>Sources for pinyin/IPA mapping can be found
          <a href="https://en.wikipedia.org/wiki/Pinyin"> here</a>. Mappings were made by hand by the creator of these tools, so they may be inaccurate.</p></div>
    </div >
  );
}

export default PinyinIpa;
import React, { useState } from 'react';
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

        <p><a href="https://en.wikipedia.org/wiki/Pinyin">Pinyin</a> is a Chinese transliteration and writing system for Mandarin Chinese. 
        Input pinyin to convert to IPA, or input IPA to convert to pinyin. </p>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Pinyin, output IPA! </h2>
            <div className="mode-info">
              <p> Pinyin should have spaces between syllables (not just words!) and are expected to have tone markings where appropriate. If you're missing the tone markings, the syllable will be marked tone 5. </p>
              <p> If you don't have a keyboard that can generate tone markings, you can find a copy-paste tool <a href="https://www.lexilogos.com/keyboard/chinese_pinyin.htm">here</a>.</p>
              <p> If you are unfamiliar with Mandarin Chinese phonology, read up <a href="https://en.wikipedia.org/wiki/Standard_Chinese_phonology">here</a>. If you are unfamiliar with IPA in general, read up 
              <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"> here.</a></p>
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
              <p> IPA can include diacritics or not, but all diacritics will be ignored when matching. There is a lot of variation in transcription style, so this is the compromise we have to make. </p>
              <p> Syllables should have spaces between them and may or may not have tones (marked simply by number 1-5) after each syllable. </p>
              <p> If you don't have a IPA keyboard, you can find a copy-paste tool <a href="https://ipa.typeit.org/">here</a>.</p>
              <p> If you are unfamiliar with Mandarin Chinese phonology, read up <a href="https://en.wikipedia.org/wiki/Standard_Chinese_phonology">here</a>. If you are unfamiliar with IPA in general, read up 
              <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"> here.</a></p>
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
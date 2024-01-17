import React, { useState } from 'react';
import { convertToIpa, convertToZhuyin } from "../conversion/converterutils/zhuyin_converter.js";
import json from "../conversion/chinese_ipa_conversion.json";

const ZhuyinIpa = () => {
  const [error, setError] = useState("");
  const [ipaResult, setIpaResult] = useState("");
  const [zhuyinResult, setZhuyinResult] = useState("");
  const [ipaInput, setIpaInput] = useState("");
  const [zhuyinInput, setZhuyinInput] = useState("");

  const handleConvertClick = (selection) => {
    var result = "";
    setError("");

    try {
      var input = ""

      switch (selection) {

        case "zhuyin-input":

          input = document.getElementById("zhuyin-input").value.trim();

          if (!input) {
            throw new Error("You haven't entered anything!");
          }

          result = convertToIpa(json);
          setZhuyinInput(document.getElementById("zhuyin-input").value);
          setIpaResult(result);

          break;

        case "ipa-input":

          input = document.getElementById("ipa-input").value.trim();

          if (!input) {
            throw new Error("You haven't entered anything!");
          }

          result = convertToZhuyin(json);
          setIpaInput(document.getElementById("ipa-input").value);
          setZhuyinResult(result);
          break;

        default:
          break;
      }

    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="page">
      <div className="main-content">

        <h1> Zhuyin ⇿ IPA for Mandarin Chinese </h1>

        <p><a href="https://en.wikipedia.org/wiki/Bopomofo">Zhuyin</a>, also known as Bopomofo, is a Chinese transliteration and writing system for Mandarin Chinese, used as an alternative to pinyin.</p>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Zhuyin, output IPA! </h2>
            <div className="mode-info">
        
              <p> Zhuyin should have spaces between syllables (not just words!) and may or may not have tone markings after each syllable. A typical syllable of Zhuyin will be two (or three) characters long (initial + coda). </p>
              <p> If you don't have a Zhuyin keyboard, you can find a copy-paste tool <a href="https://www.i2bopomo.com/">here</a>.</p>
              <p> If you are unfamiliar with Mandarin Chinese phonology, read up <a href="https://en.wikipedia.org/wiki/Standard_Chinese_phonology">here</a>. If you are unfamiliar with IPA in general, read up 
              <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"> here.</a></p>
            </div>



            <div className="input-container-conversion">
              <input type="text" id="zhuyin-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("zhuyin-input")}>Convert</button>
            </div>

            {ipaResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{zhuyinInput}</p>
                </div>

                <div className="user-output">
                  <p id="ipa-output">{ipaResult}</p>
                </div>
              </div>
            }
          </div>


          <div className="modes">
            <h2>  Input IPA, output Zhuyin! </h2>
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

            {zhuyinResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{ipaInput}</p>
                </div>

                <div className="user-output">
                  <p id="output">{zhuyinResult}</p>
                </div>
              </div>
            }
          </div>

        </div>

      </div>
      <div className="footer">
        <p>Creator of these tools has not studied Chinese at all. Especially Zhuyin. It just seems like a useful transliteration system. Use at your own peril.</p>
        <br />
        <p>Sources for zhuyin/IPA mapping can be found
          <a href="https://en.wikipedia.org/wiki/Bopomofo"> here</a>. Mappings were made by hand by the creator of these tools, so they may be inaccurate.</p>
      </div >
    </div>
  );
}

export default ZhuyinIpa;
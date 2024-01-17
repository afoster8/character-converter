import React, { useState } from 'react';
import { convertToZhuyin, convertToPinyin } from "../conversion/converterutils/pz_converter.js";
import json from "../conversion/chinese_ipa_conversion.json";

const PinyinZhuyin = () => {
  const [error, setError] = useState("");
  const [zhuyinResult, setZhuyinResult] = useState("");
  const [pinyinResult, setPinyinResult] = useState("");
  const [zhuyinInput, setZhuyinInput] = useState("");
  const [pinyinInput, setPinyinInput] = useState("");

  const handleConvertClick = (selection) => {
    var result = "";
    setError("");

    try {

      switch (selection) {
        case "pinyin-input":
          result = convertToZhuyin(json);
          setPinyinInput(document.getElementById("pinyin-input").value);
          setZhuyinResult(result);
          break;

        case "zhuyin-input":
          result = convertToPinyin(json);
          setZhuyinInput(document.getElementById("zhuyin-input").value);
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

        <h1>Pinyin ⇿ Zhuyin for Mandarin Chinese</h1>

        <p> <a href="https://en.wikipedia.org/wiki/Bopomofo">Zhuyin</a> and <a href="https://en.wikipedia.org/wiki/Pinyin">Pinyin </a>
          are models of transcribing Mandarin Chinese into an orthography that does not require knowledge of hanzi. These transcription systems are commonly
          used in educational materials for Mandarin Chinese, but may also be used for texting and typing. </p>
        <br />
        <p> Pinyin is broadly used in mainland China and in most educational materials, while Zhuyin is more commonly used in Taiwan and with Taiwanese educational materials.  </p>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Pinyin, output Zhuyin! </h2>
            <div className="mode-info">
            <p> Pinyin should have spaces between syllables (not just words!) and are expected to have tone markings where appropriate. If you're missing the tone markings, the syllable will be marked tone 5. </p>
              <p> If you don't have a keyboard that can generate tone markings, you can find a copy-paste tool <a href="https://www.lexilogos.com/keyboard/chinese_pinyin.htm">here</a>.</p>
            </div>



            <div className="input-container-conversion">
              <input type="text" id="pinyin-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("pinyin-input")}>Convert</button>
            </div>

            {zhuyinResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{pinyinInput}</p>
                </div>

                <div className="user-output">
                  <p id="zhuyin-output">{zhuyinResult}</p>
                </div>
              </div>
            }
          </div>


          <div className="modes">
            <h2> Input Zhuyin, output Pinyin! </h2>
            <div className="mode-info">
              <p> Zhuyin should have spaces between syllables (not just words!) and may or may not have tone markings after each syllable. A typical syllable of Zhuyin will be two (or three) characters long (initial + coda). </p>
              <p> If you don't have a Zhuyin keyboard, you can find a copy-paste tool <a href="https://www.i2bopomo.com/">here</a>.</p>
            </div>


            <div className="input-container-conversion">
              <input type="text" id="zhuyin-input" maxLength={20}></input>
              <button onClick={() => handleConvertClick("zhuyin-input")}>Convert</button>
            </div>

            {pinyinResult &&
              <div className="output-container-conversion">
                <div className="user-input">
                  <p id="user-input">{zhuyinInput}</p>
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
        <p>Sources for pinyin/zhuyin mapping can be found
          <a href="https://en.wikipedia.org/wiki/Bopomofo"> here</a>.</p>
      </div >
    </div>
  );
}

export default PinyinZhuyin;
import React, { useState } from 'react';
import "./PinyinZhuyin.css"
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

        <h1>Pinyin ⇿ Zhuyin</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Pinyin, output Zhuyin! </h2>
            <div className="mode-info">
              <p> A work in progress! </p>
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
              <p> A work in progress! </p>
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
          <a href="https://google.com"> here</a>.</p>
      </div >
    </div>
  );
}

export default PinyinZhuyin;
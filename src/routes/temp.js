import React, { useState } from 'react';
import "./PinyinIpa.css"
import { convertToIpa, convertToPinyin } from "../conversion/converterutils/pinyin_converter.js";
import json from "../conversion/chinese_ipa_conversion.json";

const PinyinIpa = () => {

  return (
    <div className="page">
      <div className="main-content">

        <h1> </h1>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> </h2>
            <div className="mode-info">

            </div>



            <div className="input-container-conversion">
              <input type="text" id="input-pinyin" maxLength={20}></input>
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
            <h2>  </h2>
            <div className="mode-info">

            </div>


            <div className="input-container-conversion">
              <input type="text" id="input-zhuyin" maxLength={20}></input>
              <button onClick={() => handleConvertClick("input-zhuyin")}>Convert</button>
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

    </div >
    </div>
  );
}

export default PinyinIpa;
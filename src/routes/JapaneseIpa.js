import React, { useState } from 'react';
import { convertToIpa } from "../conversion/converterutils/kana_converter.js";
import json from "../conversion/japanese_ipa_conversion.json";

const JapaneseIpa = () => {
  const [error, setError] = useState("");
  const [ipaResult, setIpaResult] = useState("");
  const [kanaInput, setKanaInput] = useState("");

  const handleConvertClick = () => {
    var result = "";
    setError("");

    try {
      result = convertToIpa(json);
      setKanaInput(document.getElementById("kana-input").value);
      setIpaResult(result);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page">
      <div className="main-content">

        <h1>Kana → IPA for Japanese </h1>

        <p> <a href="https://en.wikipedia.org/wiki/Kana">Kana</a> are the two Japanese syllabaries, used for writing grammatical elements, native Japanese words, and foreign loanwords.
         There are two syllabaries -- hiragana and katakana. This tool primarily expects hiragana input, but will accept katakana. </p>

        {error && <p className="error-message">{error}</p>}

        <div className="big-container">

          <div className="modes">
            <h2> Input Kana, output IPA! </h2>
            <div className="mode-info">
              <p> Kana can be a mix of hiragana and katakana, but no kanji or numbers. Punctuation will be removed. </p>
              <p> Output will have no spaces, just like the input. This may be harder to read, but it is more reflective of real speech. It is also much easier to generate without
                 a NLP model. </p>
              <p> If you do not have a Kana keyboard, you can find a copy-paste tool <a href="https://languagekeyboard.net/japanese">here</a>.</p>
              <p> If you are unfamiliar with Japanese phonology, read up <a href="https://en.wikipedia.org/wiki/Japanese_phonology">here</a>. If you are unfamiliar with IPA in general, read up 
              <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"> here.</a></p>
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

        </div>

      </div>
      <div className="footer">
        <p>Creator of these tools is at the intermediate level in Japanese at best. Use at your own peril.</p>
        <br />
        <p>Sources for kana/romaji/IPA were a collection of the creator's own knowledge and some help from
          <a href="https://wiktionary.org"> Wiktionary</a>.</p>
      </div >
    </div>
  );
}

export default JapaneseIpa;
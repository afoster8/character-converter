import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className="page">
      <div className="main-content">

        <h1>Japanese and Chinese Conversion Tools</h1>
        <p> Here are a collection of tools that allow conversion between orthographies of Japanese and Mandarin Chinese. </p>

        <div className="modes-container">

          <Link to="/character-converter/converter">
            <div className="card">
              <h2 id="link-name">Convert kanji ⇿ hanzi</h2>
            </div>
          </Link>

          <Link to="/character-converter/pinyin-to-ipa">
            <div className="card">
              <h2 id="link-name">Convert pinyin ⇿ IPA</h2>
            </div>
          </Link>

          <Link to="/character-converter/zhuyin-to-ipa">
            <div className="card">
              <h2 id="link-name">Convert zhuyin ⇿ IPA</h2>
            </div>
          </Link>

          <Link to="/character-converter/some-other-page">
            <div className="card">
              <h2 id="link-name">Convert kana → IPA</h2>
            </div>
          </Link>

          <Link to="/character-converter/zhuyin-to-pinyin">
            <div className="card">
              <h2 id="link-name">Convert zhuyin ⇿ pinyin</h2>
            </div>
          </Link>

        </div>
        <div className="mode-info">

          <p> Please read the following disclaimers: </p>
          <ul>
            <li> The creator of these tools is not fluent in Chinese or Japanese. I am familiar with IPA and have
              some limited Japanese linguistics knowledge, but these tools are by no means perfect. 
            </li><br />
            <li> As such, conversion between orthography and IPA is limited by the resources available. I am not an expert in any language, and
              as such, I am reliant on the resources I have found. At the footer of each converter, I have provided the resources I used.
            </li><br />
            <li> Conversion between zhuyin and pinyin is more straightforward, but there may be some limitations that I am unaware of due to
              my limited knowledge of Mandarin Chinese.
            </li><br />
            <li> Converting from IPA to any orthography is pretty imprecise, due to homophones and variance in diacritic usage or conventions of
              transcription. All of the IPA-to-orthography converters on this page are thus necessarily imprecise. Hopefully in the future, I will
              be able to use techniques to narrow down potential homophones based on context.
            </li><br />
            <li> Testing on each of these tools has been limited. I hope to do more thorough testing in the future as I use them for my own learning.
            </li><br />
          </ul>

        </div>

      </div>
      <div className="footer">
        <p>Sources can be found
          <a href="https://github.com/afoster8/character-converter/tree/main?tab=readme-ov-file#sources"> here</a>.</p></div>
    </div >
  );
};

export default Home;

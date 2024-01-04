import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className="page">
      <div className="main-content">

        <div className="big-container">

          <Link to="/character-converter/converter">
            <div className="card">
              <h2 id="link-name">Convert Kanji/Simplified/Traditional</h2>
            </div>
          </Link>
        </div>

        <div className="smaller-container">

        <Link to="/character-converter/pinyin-to-ipa">
          <div className="card">
            <h2 id="link-name">Convert pinyin ⇿ IPA.</h2>
          </div>
        </Link>

          <Link to="/character-converter/zhuyin-to-ipa">
            <div className="card">
              <h2 id="link-name">Convert zhuyin ⇿ IPA.</h2>
            </div>
          </Link>

          <Link to="/character-converter/zhuyin-to-pinyin">
            <div className="card">
              <h2 id="link-name">Convert zhuyin ⇿ pinyin.</h2>
            </div>
          </Link>

          <Link to="/character-converter/some-other-page">
            <div className="card">
              <h2 id="link-name">Convert something ⇿ something!</h2>
            </div>
          </Link>
        </div>

      </div>
    </div >
  );
};

export default Home;

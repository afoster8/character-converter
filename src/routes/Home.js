import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className="page">
      <div className="main-content">

        <div className="big-container">

          <Link to="/converter">
            <div className="card">
              <h2 id="link-name">Convert Kanji/Simplified/Traditional</h2>
            </div>
          </Link>
        </div>

        <div className="smaller-container">

        <Link to="/pinyin-to-ipa">
          <div className="card">
            <h2 id="link-name">Convert pinyin to IPA.</h2>
          </div>
        </Link>

          <Link to="/zhuyin-to-ipa">
            <div className="card">
              <h2 id="link-name">Convert zhuyin to IPA.</h2>
            </div>
          </Link>

          <Link to="/zhuyin-to-pinyin">
            <div className="card">
              <h2 id="link-name">Convert zhuyin to pinyin.</h2>
            </div>
          </Link>

          <Link to="/some-other-page">
            <div className="card">
              <h2 id="link-name">Convert something to something!</h2>
            </div>
          </Link>
        </div>

      </div>
    </div >
  );
};

export default Home;

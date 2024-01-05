import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./routes/Navbar";
import Home from "./routes/Home";
import Converter from "./routes/Converter"; 
import NoPage from "./routes/NoPage"; 
import JapaneseIpa from "./routes/JapaneseIpa";
import ZhuyinIpa from "./routes/ZhuyinIpa";
import PinyinIpa from "./routes/PinyinIpa";
import PinyinZhuyin from "./routes/PinyinZhuyin";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/character-converter" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/character-converter/converter" element={<Converter />} />
          <Route path="/character-converter/pinyin-to-ipa" element={<PinyinIpa />} />
          <Route path="/character-converter/zhuyin-to-ipa" element={<ZhuyinIpa />} />
          <Route path="/character-converter/japanese-to-ipa" element={<JapaneseIpa />} />
          <Route path="/character-converter/pinyin-to-zhuyin" element={<PinyinZhuyin />} />
          <Route path="/character-converter/*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar-container">
          <Link to="/character-converter">Home</Link>
          <Link to="/character-converter/converter">Kanji ⇿ Hanzi</Link>
          <Link to="/character-converter/pinyin-to-ipa">Pinyin ⇿ IPA</Link>
          <Link to="/character-converter/zhuyin-to-ipa">Zhuyin ⇿ IPA</Link>
          <Link to="/character-converter/japanese-to-ipa">Japanese → IPA</Link>
          <Link to="/character-converter/pinyin-to-zhuyin">Pinyin ⇿ Zhuyin</Link>
        </div>
      </nav>

      <Outlet />
    </>
  )
}
export default Navbar;
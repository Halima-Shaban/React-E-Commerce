import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../Utils/Context";
import Cart from "../Cart/Cart";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for token

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { cartCount, showCart, setShowCart } = useContext(Context);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/shop")}>SHOP</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            STORE.
          </div>
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            <FaHeart onClick={() => navigate("/favorites")} />

            {/* Check if user is signed in before navigating to MyAccount */}
            <IoPerson
              onClick={() => {
                if (token) {
                  navigate("/MyAccount"); // Go to account page if logged in
                } else {
                  navigate("/login"); // Redirect to login if not logged in
                }
              }}
            />

            {/* Cart icon with a conditional check for token */}
            <span className="cart-icon" onClick={setShowCart}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart />}
    </>
  );
};

export default Header;

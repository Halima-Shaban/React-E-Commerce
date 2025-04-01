import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import AppContext from "./Utils/Context";
import Category from "./components/Category/Category";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Utils/userProvider";
import Login from "./components/Login/Login.jsx"; // Make sure this matches the actual file
import Shop from "./components/Shop/Shop.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import { Toaster } from "react-hot-toast";
import MyAccount from "./components/MyAccount/MyAccount.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import About from "./components/About/About.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContext>
          <Header />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppContext>

        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

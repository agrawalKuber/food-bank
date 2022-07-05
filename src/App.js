import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Campaign from "./components/Campaign";
import CartScreen from "./components/CartScreen";
import { ProductState } from "./state/productstate";

function App() {
  return (
    <>
      <ProductState>
        <Router>
          <Navbar />
          <div className="container entryPage">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/CartScreen" element={<CartScreen />} />
              <Route exact path="/campaigns" element={<Campaign />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </ProductState>
    </>
  );
}

export default App;

import React, { createContext, useState, useEffect } from "react";
const axios = require("axios");

const ProductContext = createContext();

const cartfromlocalstorage = JSON.parse(localStorage.getItem("cart") || "[]");

const ProductState = (props) => {
  const [cartproducts, setCartProduct] = useState(cartfromlocalstorage);
  const [loginConstant, setloginConstant] = useState(false);
  const [products, setProducts] = useState([]);
  const [drives, setDrvies] = useState([]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartproducts));
  }, [cartproducts]);

  useEffect(() => {
    getProducts();
    getCampaigns();
  }, []);

  const addToCart = (product) => {
    const exist = cartproducts.find((x) => x._id === product._id);
    if (exist) {
      setCartProduct(
        cartproducts.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartProduct([...cartproducts, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartproducts.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartProduct(cartproducts.filter((x) => x._id !== product._id));
    } else {
      setCartProduct(
        cartproducts.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const userVerification = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        `http://localhost:8080/foodbank/auth/getUser`,
        options
      );
      setloginConstant(response.data.success);
    } catch (err) {
      console.error(err);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/foodbank/data/getProducts`
      );
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getCampaigns = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/foodbank/data/getCampaigns`
      );
      setDrvies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add a Note
  /* const addNote = async (title, content) => {
    try {
      const body = {
        title,
        content,
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await axios.post(`${Host}/addnote`, body, options);
      setNotes((prevNotes) => [...prevNotes, response]);
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };*/

  // Delete a Note

  // Edit a Note

  return (
    <ProductContext.Provider
      value={{
        cartproducts,
        addToCart,
        onRemove,
        userVerification,
        loginConstant,
        setloginConstant,
        products,
        drives,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductState, ProductContext };

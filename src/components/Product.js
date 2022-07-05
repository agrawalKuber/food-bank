import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { IconButton } from "@mui/material";
import ShopIcon from "@mui/icons-material/Shop";
import { ProductContext } from "../state/productstate";

const Product = ({ product }) => {
  const context = useContext(ProductContext);
  let { addToCart } = context;

  function handleClick() {
    addToCart(product);
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img className="car-img" src={product.image} variant="top" />
      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        <div className="row">
          <h3 className="col ms-5 mt-2">₹{product.price}</h3>
          <div className="col ms-5 mb-2">
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
            >
              <ShopIcon />
            </IconButton>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;

import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { IconButton } from "@mui/material";
import ShopIcon from "@mui/icons-material/Shop";
import CancelIcon from "@mui/icons-material/Cancel";
import { ProductContext } from "../state/productstate";

const Product = ({ product }) => {
  const context = useContext(ProductContext);
  let { addToCart, onRemove } = context;

  function handleClickAdd() {
    addToCart(product);
  }
  function handleClickRemove() {
    onRemove(product);
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img className="car-img" src={product.image} variant="top" />
      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        <div className="row">
          <h3 className="col">₹{product.price}</h3>
          <h5 className="col mt-1">Qty: {product.qty}</h5>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <IconButton
              onClick={handleClickAdd}
              size="large"
              edge="start"
              color="inherit"
            >
              <ShopIcon />
            </IconButton>
          </div>
          <div className="col ms-4">
            <IconButton
              onClick={handleClickRemove}
              size="large"
              edge="start"
              color="inherit"
            >
              <CancelIcon />
            </IconButton>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../state/productstate";
import { Row, Col } from "react-bootstrap";
import Product from "./CartProduct";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CartScreen = () => {
  const context = useContext(ProductContext);
  let { cartproducts } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const itemsPrice = cartproducts.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.05;
  const totalPrice = itemsPrice + taxPrice;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="row">
      <div className="col-8">
        {cartproducts.length === 0 && (
          <div>
            <h1 className="mt-2">
              Your Cart Is Empty Please Add Some Products
            </h1>
          </div>
        )}
        {
          <Row>
            {cartproducts.map((product) => (
              <Col key={product._id} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        }
      </div>
      <div className="col-4">
        {cartproducts.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">₹{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">₹{taxPrice.toFixed(2)}</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <Button onClick={handleClick} variant="contained">
                Checkout
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>XYZ BANK UPI ID = abc@123</Typography>
              </Popover>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartScreen;

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../state/productstate";
import { Row, Col } from "react-bootstrap";
import Product from "./Product.js";

const MainPage = () => {
  const context = useContext(ProductContext);
  let { products } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {
        <Row>
          {products.map((product) => (
            <Col key={product._id} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      }
    </div>
  );
};

export default MainPage;

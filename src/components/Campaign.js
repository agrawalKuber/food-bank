import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../state/productstate";
import { Row, Col } from "react-bootstrap";
import CampaignCard from "./campaignCard";

const Campaign = () => {
  const context = useContext(ProductContext);
  let { drives } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h3 className="mt-2">Scan And Pay For FoodDrives.</h3>
      {
        <Row>
          {drives.map((drive) => (
            <Col key={drive._id} lg={3}>
              <CampaignCard drive={drive} />
            </Col>
          ))}
        </Row>
      }
    </div>
  );
};

export default Campaign;

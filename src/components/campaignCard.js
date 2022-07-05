import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton, Stack } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

const CampaignCard = ({ drive }) => {
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
    <Card className="my-3 p-3 rounded">
      <Card.Img className="car-img" src={drive.image} variant="top" />
      <Card.Body>
        <Card.Title as="div">
          <strong>{drive.name}</strong>
        </Card.Title>
        <Stack direction="row" spacing={15}>
          <Card.Text as="h3">
            {" "}
            <Card.Text as="p"> Target: </Card.Text> ₹{drive.target}{" "}
          </Card.Text>
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
          >
            <QrCodeIcon />
          </IconButton>
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
            <Card.Img className="qrcode" src={drive.qr} variant="top" />
            <Typography sx={{ p: 2 }}>XYZ BANK UPI ID = {drive.upi}</Typography>
          </Popover>
        </Stack>
        <p className="card-text">{drive.description}</p>
      </Card.Body>
    </Card>
  );
};

export default CampaignCard;

import React, { useState } from "react";
import { Button, TextField, DialogActions, DialogTitle, DialogContent } from "@mui/material";

const AddProductComponent = ({ open, onClose }) => {
  const [productName, setProductName] = useState("");

  const handleSave = () => {
    // You can add your save logic here
    console.log("Product saved:", productName);
    onClose(); // Close the form after saving
  };

  if (!open) return null; // If open is false, don't render the component

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "20vw",  // Move the modal 20% from the left
        right: 0,
        bottom: 0,
        width: "calc(100% - 20vw)", // Make the modal take the remaining width after the 20vw offset
        height: "80vh",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        overflow: "auto",
        padding: "20px",
      }}
    >
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          type="text"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddProductComponent;

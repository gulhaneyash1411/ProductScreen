import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import AddProductComponent from "./AddProductComponent";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Product = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product; // Access the passed product from state

  const [categoryName, setCategoryName] = useState(''); // State for current input
  const [categories, setCategories] = useState([]); // State for saved categories

  const handleClickOpenCategory = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategory = () => {
    setOpenCategoryDialog(false);
    setCategoryName(''); // Reset category name on close
  };

  const handleOpenProduct = () => {
    navigate('AddProductPage', { state: { categories } }); // Pass categories as state
  };
    
  // Function to save category data
  const onSaveCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, categoryName]); // Add the category to the list
      console.log("Updated categories:", [...categories, categoryName]);
      setCategoryName(''); // Clear the input field
      setOpenCategoryDialog(false); // Close dialog after saving
    } else {
      console.log("No category name entered.");
      alert("Please enter a category name.");
    }
  };
  
  return (
    <div className="w-full p-5 box-border">
      <div className="flex items-center justify-between">
        <h1 className="flex-1 flex items-center text-xl font-bold">Product Page</h1>
        <div className="flex space-x-4">
          <Button
            variant="contained"
            onClick={handleClickOpenCategory}
            style={{
              backgroundColor: '#E1E7EB',
              color: '#1F8CD0',
            }}
          >
            Add Category
          </Button>
          <Button onClick={handleOpenProduct} variant="contained" color="primary">
            Add Product
          </Button>
          <AddProductComponent open={false} onClose={() => {}} />
        </div>
      </div>

      {/* Product List */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-[90vh]">
        {/* Display each category */}
        {categories.map((category, index) => (
          <div key={index} className="bg-gray-100 p-5 text-left border border-gray-300 rounded-lg flex flex-col">
            <div className="items-center text-xl font-bold">{category}</div>
          </div>
        ))}
        
        {/* Display Product if it exists */}
        {product && (
          <div className="bg-gray-100 p-5 text-left border border-gray-300 rounded-lg flex flex-col">
            <div className="items-center text-xl font-bold">{product.category}</div>
            <div className="mt-2 mb-2 flex bg-white border border-gray-300 p-2 rounded-lg shadow-sm">
              <div className="w-1/3 flex justify-center">
                <img
                  src={product?.image}
                  alt="Product"
                  className="w-full h-auto border border-gray-300 rounded-lg"
                />
              </div>
              <div className="w-2/3 pl-3 flex flex-col h-full">
                <div className="flex-1 flex items-center text-xl font-bold">{product.name}</div>

<div className="flex-1 flex items-center text-lg">
  <CurrencyRupeeIcon fontSize="small" className="mr-1" /> {product.priceInr}
</div>

                <Chip label={product.brand} color="primary" size="small" className="flex-1 flex items-center text-lg" style={{ width: '80px' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Dialog */}
      <Dialog
        open={openCategoryDialog}
        onClose={handleCloseCategory}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categoryName"
              type="text"
              placeholder="Add Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          {categories.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold text-gray-700 mb-2">Saved Categories:</h3>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="text-gray-700">{category}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions style={{ paddingBottom: '20px' }}>
          <Button variant="contained" style={{ backgroundColor: '#E1E7EB', color: '#1F8CD0' }} onClick={handleCloseCategory}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSaveCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Product;

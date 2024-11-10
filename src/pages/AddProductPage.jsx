import React, { useState , useEffect} from 'react';
import { Button, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Card, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';  
import DeleteIcon from '@mui/icons-material/Delete';
import { TagsInput } from "react-tag-input-component";
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom'; // To access the passed state
import { useNavigate } from 'react-router-dom';

function AddProductPage({categoryName}) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isSwitchOn, setIsSwitchOn] = useState(new Array(0).fill(false)); // Initialize empty array
    const [alignment, setAlignment] = useState('percent'); // Set initial alignment to 'percent'
    const [image, setImage] = useState(null);  // State to store the uploaded image
    const [tags, setTags] = useState([]);
    const [skuValues, setSkuValues] = useState({});

    const [options, setOptions] = useState([
        { categoryName: '', values: [], tagInputValue: '' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [validationError, setValidationError] = useState(false);
    const navigate = useNavigate();

      const location = useLocation();
      const categories = location.state?.categories || []; // Get the categories passed from the Product component
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
        const handleAlignmentChange = (event, newAlignment) => {
            if (newAlignment !== null) { // Prevent deselecting both options
                setAlignment(newAlignment);
            }
        };
        const [product, setProduct] = useState({
          name: '',
          category: '',
          brand: '',
          image: '',
          variants: [
            { name: 'Size', values: ['M', 'L'] },
            { name: 'Color', values: ['Black', 'Red'] },
          ],
          combinations: {
            a: { name: 'M/Black', sku: 'ABC12', quantity: 4, inStock: false },
            b: { name: 'L/Red', sku: 'ABC12', quantity: null, inStock: true },
          },
          priceInr: 500,
          discount: { method: 'pct', value: 12 },
        });
          
        const handleInputChange = (event) => {
          const { id, value } = event.target;
          setFormData({ ...formData, [id]: value });
        };
      
        const [formData, setFormData] = useState({
          productName: '',
          category: '',
          brandName: '',
          image: null,
          price: 0,
          discountValue: 0,
        });
      
      // Handle image change
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          setFormData((prev) => ({ ...prev, image: blobUrl }));
          setProduct((prevProduct) => ({ ...prevProduct, image: blobUrl }));
        }
      };
        const handleOptionChange = (index, field, value) => {
          const updatedOptions = [...options];
          updatedOptions[index][field] = value;
          setOptions(updatedOptions);
      
          // Sync variants with the updated options
          const updatedVariants = updatedOptions.map(option => ({
            name: option.categoryName,
            values: option.values,
          }));
          setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants,
          }));
        };
          // Event handler function to set the product structure on button click
          const handleConfirmClick = () => {
            const updatedProduct = {
              ...product,
              name: formData.productName,
              category: formData.category,
              brand: formData.brandName,
              priceInr: formData.price,
              discount: {
                method: alignment === 'percent' ? 'pct' : 'flat',
                value: formData.discountValue,
              },
            };
          
            // Updating product state
            setProduct(updatedProduct);
          
            // Log the updated product structure
            console.log("updatedProduct",updatedProduct);
          
            // Navigate to AddProductPage and pass updatedProduct data
            navigate('/product', { state: { product: updatedProduct } });
          };
      
        
    const addTag = (index) => {
    if (options[index].tagInputValue.trim() !== '') {
        const updatedOptions = [...options];
        updatedOptions[index].values.push(options[index].tagInputValue.trim());
        updatedOptions[index].tagInputValue = ''; // Clear the tag input after adding
        setOptions(updatedOptions);
    }
    };
    const removeTag = (optionIndex, tagIndex) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].values.splice(tagIndex, 1);
    setOptions(updatedOptions);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission on Enter
        addTag();
        }
    };
    const handleSwitchChange = (index) => {
        const updatedSwitches = [...isSwitchOn];
        updatedSwitches[index] = !updatedSwitches[index]; // Toggle the specific switch
        setIsSwitchOn(updatedSwitches);
    };
      const addCategory = () => {
        setOptions([...options, { categoryName: '', values: [], tagInputValue: '' }]);
      };
      
      const updateCategory = (index, field, value) => {
        const updatedOptions = options.map((option, i) =>
          i === index ? { ...option, [field]: value } : option
        );
        setOptions(updatedOptions);
      };
      const handleBreadcrumbClick = (index) => {
        setSelectedTab(index);
        const tagPairs = [];
        
        options.forEach((option1, i) => {
          if (!option1.values || option1.values.length === 0) return;
          
          options.forEach((option2, j) => {
            if (i !== j && option2.values && option2.values.length > 0) {
              option1.values.forEach(tag1 => {
                option2.values.forEach(tag2 => {
                  tagPairs.push(`${tag1}/${tag2}`);
                });
              });
            }
          });
        });
        
        // Create combinations dynamically from tagPairs
        const combinations = tagPairs.reduce((acc, tagPair, idx) => {
          const [size, color] = tagPair.split('/');  // Split the tagPair into size and color
          acc[String.fromCharCode(97 + idx)] = {  // Create a new key based on the index (e.g., a, b, c, ...)
            name: tagPair,
            sku: `ABC${idx + 1}`, // Example SKU based on index
            quantity: null, // You can set default values for quantity or set dynamically
            inStock: false, // Set stock status dynamically
          };
          return acc;
        }, {});

        // Now update the product state with dynamically generated combinations
        setProduct(prevProduct => ({
          ...prevProduct,
          combinations: combinations,
        }));
    };


    const handleChange = (e, index, field) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = e.target.value;
        setOptions(updatedOptions);

        // Clear validation error if the user starts typing
        if (validationError) setValidationError(false);
    };


    // Handle Enter key to add tag
    const handleTagInput = (e, index) => {
    if (e.key === 'Enter' && options[index].tagInputValue.trim()) {
        e.preventDefault();
        addTag(index);
    }
    };


      // Generate pairwise combinations of categories
      const generateCombinations = () => {
        let pairs = [];
        for (let i = 0; i < options.length; i += 2) {
          if (options[i + 1]) {
            // Create combinations for each pair
            options[i].values.forEach((value1) => {
              options[i + 1].values.forEach((value2) => {
                pairs.push(`${value1} / ${value2}`);
              });
            });
          }
        }
        return pairs;
      };
      useEffect(() => {
        // Recalculate combinations whenever options change
        const combinations = generateCombinations();
        setIsSwitchOn(new Array(combinations.length).fill(false)); // Reinitialize isSwitchOn state based on combinations length
      }, [options]); // Depend on options state
      
      const handleSkuChange = (index, value) => {
        const updatedSkuValues = { ...skuValues, [index]: value };
        setSkuValues(updatedSkuValues);
    
        // Check if the entered SKU value is unique
        const skuEntries = Object.values(updatedSkuValues);
        if (skuEntries.filter(sku => sku === value).length > 1) {
          setValidationError(true); // Show validation error if duplicate SKU is found
        } else {
          setValidationError(false); // Clear validation error if no duplicates
        }
      };
      
      const combinations = generateCombinations();

    // Add a new option with validation check
    const handleAddOption = () => {
        if (validateFields()) {
            // Add new option only if validation passes
            setOptions([...options, { categoryName: '', values: [], tagInputValue: '' }]);
            setValidationError(false); // Reset error after successful addition
        }
    };
    // Handle delete option
    // Delete an option
    const handleDeleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    };


    // Validate fields to check if required fields are filled
    const validateFields = () => {
        const hasError = options.some(option => !option.categoryName.trim() || !option.values.length);
        setValidationError(hasError);
        return !hasError;
    };
        
    const renderButtons = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#E1E7EB',
                                color: '#1F8CD0',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleBreadcrumbClick(1)}>
                            Next
                        </Button>
                    </>
                );
            case 1:
            case 2:
                return (
                    <>
                        <Button  
                        variant="contained"
                            style={{
                                backgroundColor: '#E1E7EB',
                                color: '#1F8CD0',
                            }}onClick={() => handleBreadcrumbClick(selectedTab - 1)}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleBreadcrumbClick(selectedTab + 1)}>
                            Next
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button  
                        variant="contained"
                            style={{
                                backgroundColor: '#E1E7EB',
                                color: '#1F8CD0',
                            }} color="primary" onClick={() => handleBreadcrumbClick(selectedTab - 1)}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleConfirmClick}>
            Confirm
          </Button>
                    </>
                );
            default:
                return null;
        }
    };

    const breadcrumbs = [
        {label: "Description", 
            content: (
              <Card variant="outlined" sx={{ width: '40%', boxShadow: 3, borderRadius: 2 }}>
              <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
                <Typography variant="body1">
                  <label className="block text-gray-700 text-lg font-bold mb-5" htmlFor="descriptionName">
                    Description
                  </label>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                      Product name *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      id="productName"
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    />
                    
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                      Category *
                    </label>
                    <select
                      id="category"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">{categories.length ? 'Choose a category' : 'No categories available'}</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandName">
                      Brand *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      id="brandName"
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    />
                    
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                      }}
                    >
                      Upload image
                      <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                    </Button>
        
                    {formData.image && (
                      <div>
                        <h3>Uploaded Image:</h3>
                        <img src={formData.image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                      </div>
                    )}
                  </div>
                </Typography>
              </Box>
            </Card>
        ),
        },
        
        
        { label: "Variants", 
            content: (
              <Card variant="outlined" sx={{ width: '40%', boxShadow: 3, borderRadius: 2 }}>
  <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
    <Typography variant="body1">
      <label className="block text-gray-700 text-lg font-bold mb-5" htmlFor="variants">
        Variants
      </label>

      {/* Title for Category Name and Values */}
      <div className="flex mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-lg font-medium">Option</label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-lg font-medium">Values</label>
        </div>
      </div>

      {/* Option Fields */}
      {options.map((option, index) => (
        <div className="flex items-center mb-4" key={index}>
          <div className="w-1/2 pr-2">
            {/* Category Name Input */}
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                validationError && !option.categoryName.trim() ? 'border-red-500' : ''
              }`}
              id={`categoryName${index}`}
              type="text"
              value={option.categoryName}
              onChange={(e) => handleOptionChange(index, 'categoryName', e.target.value)}
              placeholder="Add Option"
            />
            {validationError && !option.categoryName.trim() && (
              <p className="text-red-500 text-xs italic">Option is required.</p>
            )}
          </div>

          <div className="w-1/2 pl-2">
            {/* Values Tags Input */}
            <TagsInput
              value={option.values}
              onChange={(newValues) => handleOptionChange(index, 'values', newValues)}
              placeHolder="Add Values"
            />
            {validationError && option.values.length === 0 && (
              <p className="text-red-500 text-xs italic">At least one value is required.</p>
            )}
          </div>

          <div className="pl-2">
            <DeleteIcon
              className="cursor-pointer text-red-500"
              onClick={() => {
                const updatedOptions = [...options];
                updatedOptions.splice(index, 1);
                setOptions(updatedOptions);
              }}
            />
          </div>
        </div>
      ))}

      {/* Add Option Button */}
      <button
        onClick={() => {
          // Check if the last option has an empty field
          const lastOption = options[options.length - 1];
          if (!lastOption.categoryName.trim() || lastOption.values.length === 0) {
            setValidationError(true); // Enable validation if fields are empty
          } else {
            setValidationError(false); // Clear validation if fields are not empty
            const updatedOptions = [...options, { categoryName: '', values: [] }];
            setOptions(updatedOptions);
          }
        }}
        className="bg-transparent text-[#1F8CD0] pb-2 px-4 rounded mt-4"
      >
        + Add Options
      </button>
    </Typography>
  </Box>
</Card>


            ),
        },      
        
        
        { label: "Combinations", 
            content: (
              <Card variant="outlined" sx={{ width: '40%', boxShadow: 3, borderRadius: 2 }}>
              <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
                <Typography variant="body1">
                  <label className="block text-gray-700 text-lg font-bold mb-5" htmlFor="priceInfo">
                    Combinations
                  </label>
                </Typography>
        
                {/* Table Header */}
                <Box display="flex" fontWeight="bold" mt={3}>
                  <Box width="15%" p={1}></Box>
                  <Box width="35%" p={1}>SKU *</Box>
                  <Box width="15%" p={1}>In Stock</Box>
                  <Box width="35%" p={1}>Quantity</Box>
                </Box>
        
                {/* Displaying the generated combinations in rows */}
                {combinations.map((combination, index) => (
                  <Box display="flex" key={index} alignItems="center" p={1} borderBottom={1} borderColor="grey.300">
                    <Box width="15%" p={1}>{combination}</Box>
                    <Box width="35%" p={1}>
                      <TextField
                        size="small"
                        variant="outlined"
                        placeholder="SKU"
                        value={skuValues[index] || ""}
                        onChange={(e) => handleSkuChange(index, e.target.value)}
                        error={validationError && Object.values(skuValues).filter(sku => sku === skuValues[index]).length > 1}
                        helperText={validationError && Object.values(skuValues).filter(sku => sku === skuValues[index]).length > 1 ? "Duplicate SKU" : ""}
                      />
                    </Box>
                    <Box width="15%" display="flex" justifyContent="center" alignItems="center">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={isSwitchOn[index] || false}
                              onChange={() => handleSwitchChange(index)}
                            />
                          }
                          label=""
                        />
                      </FormGroup>
                    </Box>
                    <Box width="35%" p={1}>
                      <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Quantity"
                        disabled={!isSwitchOn[index]}
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: !isSwitchOn[index] ? 'transparent' : 'initial', // Keeps background transparent when disabled
                            color: !isSwitchOn[index] ? 'gray' : 'initial', // Adjust text color when disabled
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
              

            
            ),
        },
        
        
        { label: "Price info", 
            content: (
                <Card variant="outlined" sx={{ width: '40%', boxShadow: 3, borderRadius: 2 }}>
        <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="body1">
            <label className="block text-gray-700 text-lg font-bold mb-5" htmlFor="priceInfo">
              Price Info
            </label>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price *
              </label>
              <div className="relative w-full mb-4">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">₹</span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="text"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountValue">
                Discount
              </label>
              <div className="flex items-center mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="discountValue"
                  type="text"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                />

                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignmentChange}
                  aria-label="Discount Type"
                  className="ml-4 flex items-center h-10"
                >
                  <ToggleButton
                    value="percent"
                    className={`h-full ${alignment === 'percent' ? 'bg-blue-500 text-white' : ''}`}
                    aria-label="Percent"
                  >
                    <PercentIcon />
                  </ToggleButton>
                  <ToggleButton
                    value="money"
                    className={`h-full ${alignment === 'money' ? 'bg-blue-500 text-white' : ''}`}
                    aria-label="Money"
                  >
                    <AttachMoneyIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>

          </Typography>
        </Box>
            </Card>
        ), }
        
        
    ];



    return (
        <div className="w-full p-5 box-border">
            <div className="flex items-center justify-between pb-4">
                <h1>Add Product</h1>
                <div className="flex space-x-4">
                    {renderButtons()}
                </div>
            </div>

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb, index) => (
                    <Button
                        key={breadcrumb.label}
                        onClick={() => handleBreadcrumbClick(index)}
                        style={{
                            textTransform: 'none',
                            color: selectedTab === index ? '#1F8CD0' : 'inherit',
                            backgroundColor: selectedTab === index ? '#DAEDF9' : 'transparent',
                            borderRadius: '8px',
                        }}
                    >
                        {breadcrumb.label}
                    </Button>
                ))}
            </Breadcrumbs>

            <div className="mt-5">
                {breadcrumbs[selectedTab].content}
            </div>
        </div>
    );
    }

export default AddProductPage;
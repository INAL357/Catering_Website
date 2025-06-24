import React, { useState } from 'react';
import axios from 'axios'
import "./CreateDishes.css"
import { useNavigate } from 'react-router';
const CreateDishes = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: '',
    dishPhoto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      dishPhoto: e.target.files[0]
    }));
  };
  const navigate=useNavigate()
    const handleBackBtn =async ()=>{
        navigate(-1);
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('type', formData.type);
    data.append('price', formData.price);
    if (formData.dishPhoto) {
      data.append('dishPhoto', formData.dishPhoto);
    }

    try {
      const response = await axios.post('/api/admin/create', data, {
        headers: {
          'x-admin-key': 'NewAdminFor014@9845', 
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Dish created successfully!');
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        type: '',
        price: '',
        dishPhoto: null
      });
    } catch (error) {
      console.error('Error creating dish:', error);
      alert('Failed to create dish: ' + error.message);
    }
  };

  return (
   
     <div className="mainAdminContainer">
  <div className="DishContainer">
    <form onSubmit={handleSubmit} className="form">

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter the name of the dish"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Add Description!"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Upload Photo:</label>
        <input
          type="file"
          name="dishPhoto"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <div className="form-group">
        <label>Select Category:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Enter the price (Optional)"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className='button-row'>

      <button type="submit" className="submit-btn">Create Dish</button>
      <button onClick={handleBackBtn} className="Back-btn">Back</button>
      </div>
    </form>
  </div>
</div>

  );
};

export default CreateDishes;
import React, { useState } from 'react';
import axios from 'axios';

const UploadWork = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    video: null
  });
  const [preview, setPreview] = useState({
    image: null,
    video: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          ...preview,
          [e.target.name]: reader.result
        });
      };
      reader.readAsDataURL(file);
      
      setFormData({
        ...formData,
        [e.target.name]: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage('');
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);
      if (formData.video) data.append('video', formData.video);

      const response = await axios.post('/api/uploads', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Upload successful!');
      console.log('Upload response:', response.data);
      
      // Reset form after successful upload
      setFormData({
        name: '',
        description: '',
        image: null,
        video: null
      });
      setPreview({
        image: null,
        video: null
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Your Work</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Image (optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview.image && (
            <div className="preview">
              <img src={preview.image} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="video">Video (optional)</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
          />
          {preview.video && (
            <div className="preview">
              <video controls style={{ maxWidth: '200px', maxHeight: '200px' }}>
                <source src={preview.video} type={formData.video?.type} />
              </video>
            </div>
          )}
        </div>
        
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default UploadWork;
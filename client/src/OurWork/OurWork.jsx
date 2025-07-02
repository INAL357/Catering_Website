import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OurWork = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get('/api/uploads');
        setUploads(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching uploads:', err);
      }
    };

    fetchUploads();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="our-work-container">
      <h1>Our Work</h1>
      
      <div className="uploads-grid">
        {uploads.length > 0 ? (
          uploads.map((upload) => (
            <div key={upload._id} className="upload-item">
              <h3>{upload.name}</h3>
              {upload.description && <p>{upload.description}</p>}
              
              <div className="media-container">
                {upload.imageUrl && (
                  <div className="image-item">
                    <img 
                      src={upload.imageUrl} 
                      alt={upload.name} 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                
                {upload.videoUrl && (
                  <div className="video-item">
                    <video 
                      controls 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    >
                      <source src={upload.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No work has been uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default OurWork;
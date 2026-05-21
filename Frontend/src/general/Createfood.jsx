import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Auth.css';

const Createfood = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('description', e.target.description.value);
    formData.append('video', e.target.video.files[0]);

    try {
      const response = await axios.post("http://localhost:3000/api/food", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert(response.data.message || "Food uploaded successfully!");
      setIsModalOpen(false);
      setPreview(null);
      e.target.reset(); // Reset form
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during upload");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen relative p-6 sm:p-10" style={{ backgroundColor: 'var(--bg-color)' }}>
      
      {/* Top Header / Profile Link */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Partner Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your restaurant content</p>
        </div>
        
        <Link 
          to="/partnerprofile" 
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold transition shadow-sm hover:scale-105"
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="hidden sm:inline">My Profile</span>
        </Link>
      </div>

      {/* Main Dashboard Empty State/Content */}
      <div className="flex flex-col items-center justify-center mt-24 text-center">
        <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center opacity-70" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12" style={{ color: 'var(--text-secondary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Share Your Delicious Creations</h2>
        <p className="max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Upload engaging short videos of your food items to attract more customers to your restaurant.
        </p>
      </div>

      {/* Floating Action Button (Bottom Left) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-40 active:scale-95"
        style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {/* Upload Modal Lightbox */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex py-10 px-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-md auth-card relative m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button 
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/10 transition"
              onClick={() => setIsModalOpen(false)}
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="auth-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span className="role-badge">New Reel</span>
              <h1>Create Post</h1>
              <p>Upload a video to showcase your dish.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              
              <div className="form-group">
                <label htmlFor="name">Dish Name</label>
                <input type="text" id="name" name="name" placeholder="E.g. Spicy Chicken Pasta" required />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe your dish..." 
                  rows="3"
                  className="w-full focus:ring-0"
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--input-border)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="video">Upload Video (MP4)</label>
                <div 
                  className="w-full relative rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer transition"
                  style={{ borderColor: 'var(--input-border)', backgroundColor: 'var(--input-bg)' }}
                >
                  <input 
                    type="file" 
                    id="video" 
                    name="video" 
                    accept="video/*" 
                    required 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {preview ? (
                    <video src={preview} className="w-full h-32 object-cover rounded-lg mb-3 shadow-md" autoPlay loop muted />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-3" style={{ color: 'var(--text-secondary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  )}
                  <span style={{ color: 'var(--text-primary)' }} className="text-sm font-semibold text-center">
                    {preview ? "Click to change video" : "Tap to browse files"}
                  </span>
                  {!preview && <span style={{ color: 'var(--text-secondary)' }} className="text-xs mt-1">MP4, WebM up to 50MB</span>}
                </div>
              </div>
              
              <button type="submit" className="auth-btn mt-3 flex justify-center items-center gap-2 shadow-lg" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Post Reel"
                )}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createfood;
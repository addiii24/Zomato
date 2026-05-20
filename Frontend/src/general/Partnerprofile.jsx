import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Auth.css';

const Partnerprofile = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState({
    businessName: "Business Name",
    address: "Address"
  });

  useEffect(() => {
    // Fetch videos to populate the grid
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then(res => {
        setVideos(res.data);
        if (res.data.length > 0 && res.data[0].foodpartner) {
           setPartnerInfo({
             businessName: res.data[0].foodpartner.buissnessname || res.data[0].foodpartner.ownername || "Business Name",
             address: res.data[0].foodpartner.address || "Address"
           });
        }
      })
      .catch(err => console.error(err));
  }, []);



  return (
    <div className="min-h-screen flex justify-center p-4 sm:p-8" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Profile Card Container matching the layout shape */}
      <div 
        className="w-full max-w-md rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        
        {/* Top Header Section */}
        <div className="p-6 pb-4">
          
          {/* Avatar and Info Blocks */}
          <div className="flex items-center gap-6 mb-8 mt-2">
            
            {/* Circular Avatar */}
            <div 
              className="w-24 h-24 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)' }}
            ></div>
            
            {/* Info Badges */}
            <div className="flex flex-col gap-3 flex-grow">
              <div 
                className="px-4 py-2 rounded-lg font-semibold text-center truncate shadow-sm"
                style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
              >
                {partnerInfo.businessName}
              </div>
              <div 
                className="px-4 py-2 rounded-lg font-semibold text-center truncate shadow-sm"
                style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
              >
                {partnerInfo.address}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around text-center mb-4">
            <div className="flex flex-col gap-1">
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium tracking-wide">total meals</span>
              <span style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">43</span>
            </div>
            <div className="flex flex-col gap-1">
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium tracking-wide">customer serve</span>
              <span style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">15K</span>
            </div>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--input-border)', margin: '0 -1.5rem' }} className="border-t" />
        </div>

        {/* 3-Column Video Grid */}
        <div className="grid grid-cols-3 gap-[2px] bg-transparent flex-grow auto-rows-max">
          {videos.length > 0 ? (
            videos.map((video, idx) => (
              <div 
                key={idx} 
                className="aspect-[9/16] relative flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--input-bg)' }}
                onClick={() => setSelectedVideo(video)}
              >
                <video 
                  src={video.video} 
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10" style={{ color: 'var(--text-secondary)' }}>
              No videos uploaded yet.
            </div>
          )}
        </div>

      </div>

      {/* Video Modal / Lightbox */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl cursor-default animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
          >
            <video 
              src={selectedVideo.video} 
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
            />
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              onClick={() => setSelectedVideo(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      </div>
  );
}

export default Partnerprofile;
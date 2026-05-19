import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Reel = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play video only when it is visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch((err) => console.log("Autoplay prevented:", err));
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 } // Triggers when 60% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-[100dvh] w-full snap-start bg-black flex justify-center items-center">
      <video
        ref={videoRef}
        src={reel.video} // From backend DB
        className="h-full w-full object-cover cursor-pointer"
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      
      {/* Overlay Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        <div className="text-white max-w-md pointer-events-auto pl-2">
          {/* Dynamically display the uploader's business name or owner name */}
          <h3 className="font-bold text-lg mb-2">
            @{reel.foodpartner?.buissnessname || reel.foodpartner?.ownername || 'Restaurant'}
          </h3>
          
          {/* Truncated Description to 2 lines max */}
          <p className="text-sm mb-4 line-clamp-2 leading-relaxed text-gray-200">
            {reel.description}
          </p>
          
          <button className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition active:scale-95 shadow-lg">
            Visit Store
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Corrected the URL from /api/auth/food to /api/food
    axios.get("http://localhost:3000/api/food", {
      withCredentials: true 
    }).then(response => {
      // The backend returns the array directly, so it's response.data
      setVideos(response.data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div 
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Hides the scrollbar for webkit browsers to make it look clean like an app */}
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      
      {videos.length > 0 ? (
        videos.map((reel) => (
          <Reel key={reel._id} reel={reel} />
        ))
      ) : (
        <div className="h-[100dvh] w-full snap-start bg-black flex justify-center items-center text-white">
          No reels found in the database.
        </div>
      )}

      {/* "End of Feed" Screen Effect */}
      {videos.length > 0 && (
        <div className="h-[100dvh] w-full snap-start bg-black flex flex-col justify-center items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-semibold text-white">You're all caught up!</p>
          <p className="text-sm mt-2">No more videos to play in the database.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
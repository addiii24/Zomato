import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const Reel = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

 useEffect(() => {
  const videoElement = videoRef.current;

  if (!videoElement) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        videoElement
          .play()
          .catch((err) => console.log("Autoplay prevented:", err));

        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(videoElement);

  return () => {
    observer.unobserve(videoElement);
    observer.disconnect();
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
            @{reel.foodpartner?.ownername || 'Restaurant'}
          </h3>
          
          {/* Expandable Description */}
          <div 
            className="mb-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <p 
              className={`text-sm leading-relaxed text-gray-200 transition-all duration-300 ${
                isExpanded ? "max-h-[30vh] overflow-y-auto pr-2" : "line-clamp-2"
              }`}
              style={{ scrollbarWidth: 'thin' }} // Adds a thin scrollbar when expanded
            >
              {reel.description}
            </p>
            {reel.description && reel.description.length > 80 && (
              <span className="text-xs text-gray-400 font-semibold mt-1 inline-block hover:text-white">
                {isExpanded ? "less" : "...more"}
              </span>
            )}
          </div>
          
          <Link to="/partnerprofile" className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition active:scale-95 shadow-lg">
            Visit Store
          </Link>
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
          <p className="text-sm mt-2">No more videos to play.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
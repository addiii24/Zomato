import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

// ─── Helper: relative time ───
const timeAgo = (dateStr) => {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// ─── Comment Drawer ───
const CommentDrawer = ({ foodId, isOpen, onClose, commentCount, setCommentCount }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${foodId}`, {
        withCredentials: true
      });
      setComments(res.data.comments);
      setCommentCount(res.data.totalComments);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments/${foodId}`,
        { text: newComment.trim() },
        { withCredentials: true }
      );
      setComments(prev => [res.data.comment, ...prev]);
      setCommentCount(res.data.totalComments);
      setNewComment('');
      // Scroll to top to show new comment
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentId}`,
        { withCredentials: true }
      );
      setComments(prev => prev.filter(c => c._id !== commentId));
      setCommentCount(res.data.totalComments);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="relative w-full max-w-lg bg-[#1a1a2e] rounded-t-3xl overflow-hidden"
        style={{
          maxHeight: '65vh',
          animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-white font-bold text-lg tracking-tight">
            Comments
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({commentCount})
            </span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comment List */}
        <div
          ref={listRef}
          className="overflow-y-auto px-5 py-3"
          style={{
            maxHeight: 'calc(65vh - 140px)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.15) transparent'
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-400"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-3 opacity-40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1 text-gray-600">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-3 py-3 border-b border-white/5 last:border-0 group"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold uppercase">
                  {comment.user?.fullname?.[0] || '?'}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold truncate">
                      {comment.user?.fullname || 'User'}
                    </span>
                    <span className="text-gray-500 text-xs flex-shrink-0">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-0.5 break-words leading-relaxed">
                    {comment.text}
                  </p>
                </div>
                {/* Delete button (visible on hover) */}
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1 text-gray-500 hover:text-red-400 flex-shrink-0"
                  title="Delete comment"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-[#151528]"
        >
          <input
            ref={inputRef}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            maxLength={500}
            className="flex-1 bg-white/10 text-white text-sm rounded-full px-4 py-2.5 outline-none placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 transition"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition active:scale-90"
          >
            {submitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0.5; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ─── Action Sidebar ───
const ActionSidebar = ({ reel }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [animatingHeart, setAnimatingHeart] = useState(false);

  useEffect(() => {
    // Fetch initial like status
    axios.get(`${import.meta.env.VITE_API_URL}/api/likes/${reel._id}/status`, {
      withCredentials: true
    }).then(res => {
      setLiked(res.data.liked);
      setLikeCount(res.data.totalLikes);
    }).catch(err => console.log(err));

    // Fetch initial comment count
    axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${reel._id}`, {
      withCredentials: true
    }).then(res => {
      setCommentCount(res.data.totalComments);
    }).catch(err => console.log(err));
  }, [reel._id]);

  const handleLike = async () => {
    // Optimistic update
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setAnimatingHeart(true);
    setTimeout(() => setAnimatingHeart(false), 400);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/likes/${reel._id}/toggle`,
        {},
        { withCredentials: true }
      );
      setLiked(res.data.liked);
      setLikeCount(res.data.totalLikes);
    } catch (err) {
      // Revert on error
      setLiked(liked);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);
      console.log(err);
    }
  };

  return (
    <>
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all group-hover:bg-black/50 group-active:scale-90"
            style={animatingHeart ? { animation: 'heartPop 0.4s ease' } : {}}
          >
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-lg">
            {likeCount > 0 ? likeCount : ''}
          </span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all group-hover:bg-black/50 group-active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-lg">
            {commentCount > 0 ? commentCount : ''}
          </span>
        </button>
      </div>

      {/* Comment Drawer */}
      <CommentDrawer
        foodId={reel._id}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />

      {/* Keyframe for heart pop */}
      <style>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          30% { transform: scale(1.35); }
          60% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

// ─── Reel Component ───
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

      {/* Action Sidebar — Like & Comment */}
      <ActionSidebar reel={reel} />
      
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
          
          <Link to={`/partnerprofile/${reel.foodpartner?._id}`} className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition active:scale-95 shadow-lg">
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
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/logout`, {}, {
        withCredentials: true
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Corrected the URL from /api/auth/food to /api/food
    axios.get(`${import.meta.env.VITE_API_URL}/api/food`, {
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
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-sm font-medium hover:bg-red-500/80 hover:border-red-400/50 transition-all duration-300 active:scale-95 shadow-lg"
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Logout
      </button>
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
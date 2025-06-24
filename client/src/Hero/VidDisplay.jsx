import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import vid1 from "../assets/Video/vid1.mp4";
import vid2 from "../assets/Video/vid2.mp4";
import vid3 from "../assets/Video/vid3.mp4";
import "./VidDisplay.css";

const videos = [vid1, vid2, vid3];

const VidDisplay = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fade, setFade] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleBookNow = () => {
    setShowDialog(true);
  };

  const confirmBooking = () => {
    setShowDialog(false);
    navigate("/BookNowPage", { state: { showBookingDialog: true } });
  };

  const nextVideo = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setFade(false);
    }, 500);
  };

  const prevVideo = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
      setFade(false);
    }, 500);
  };

  useEffect(() => {
    const nextVideoIndex = (currentVideo + 1) % videos.length;
    const videoElement = document.createElement("video");
    videoElement.src = videos[nextVideoIndex];
    videoElement.load();
  }, [currentVideo]);

  return (
    <div className="heroContainer">
      <video
        ref={videoRef}
        src={videos[currentVideo]}
        autoPlay
        loop={false}
        muted
        onEnded={nextVideo}
        className={fade ? "fade-out" : "fade-in"}
      />

      <div className="overlay">
        <h1>Let's Cater for Your Special Event</h1>
        <p>Experience our catering services.</p>
        <button className="cta-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {showDialog && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Proceed to Booking?</h3>
            <p>Do you want to continue to the booking page?</p>
            <div className="dialog-buttons">
              <button className="yes-button" onClick={confirmBooking}>
                Yes
              </button>
              <button className="cancel-button" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="arrow left-arrow" onClick={prevVideo} aria-label="Previous Video">
        <FaArrowLeft />
      </button>
      <button className="arrow right-arrow" onClick={nextVideo} aria-label="Next Video">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default VidDisplay;
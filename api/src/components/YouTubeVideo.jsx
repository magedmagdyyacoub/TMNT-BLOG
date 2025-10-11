// components/YouTubeVideo.jsx
import React from "react";
import "../styles/YouTubeVideo.css";

const YouTubeVideo = ({ title = "TMNT Clip" }) => {
  return (
    <div className="video-wrapper">
      <div className="glow-frame">
        <iframe
          src="https://www.youtube.com/embed/LNXDORibqkE"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeVideo;

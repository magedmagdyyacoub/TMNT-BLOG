import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/fanart.css";

export default function FanArtWall() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  return (
    <section className="fan-art-wall">
      <h2>🎨 حائط المعجبين</h2>
      <p>شاركنا تصميماتك أو رسوماتك المستوحاة من عالم TMNT!</p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="upload-input"
      />

      <div className="art-gallery">
        {images.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            alt={`fan-art-${idx}`}
            whileHover={{ scale: 1.05 }}
            className="art-thumbnail"
          />
        ))}
      </div>
    </section>
  );
}

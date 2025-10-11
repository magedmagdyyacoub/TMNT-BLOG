// components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} TMNT Fanverse. All rights reserved.</p>
        <p>
          Made with 🐢 by <span className="dev-name">Maged</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-4 right-4 text-white/20 text-xs tracking-widest uppercase">
      <div className="footer-content">
        <h3>Made by Ajay</h3>
        <div className="social-links">
          <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:ajaykumarreddykrishnaredddygari@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

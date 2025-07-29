import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Save A Life Foundation. All rights reserved.</p>
        <div className="social-icons">
          {['facebook', 'twitter', 'instagram'].map((platform) => (
            <motion.a
              key={platform}
              href="#"
              className={`icon icon-${platform}`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <i className={`fab fa-${platform}`} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}

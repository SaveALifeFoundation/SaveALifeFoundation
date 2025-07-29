import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';
import logoPlaceholder from '../../assets/images/logo-placeholder.jpg'; // your logo

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Donate', 'Contact'];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 12 }}
    >
      <div className="header-content">
        {/* Logo */}
        <motion.div
          className="logo-container"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img src={logoPlaceholder} alt="Save A Life Logo" className="logo" />
        </motion.div>

        {/* Site Title */}
        <motion.h1
          className="site-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Save A Life Foundation
        </motion.h1>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <motion.div
            className={`bar ${isMenuOpen ? 'open' : ''}`}
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
          />
          <motion.div
            className={`bar ${isMenuOpen ? 'open' : ''}`}
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.div
            className={`bar ${isMenuOpen ? 'open' : ''}`}
            animate={{ rotate: isMenuOpen ? -45 : 0 }}
          />
        </div>

        {/* Dropdown Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="dropdown-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="nav-link"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

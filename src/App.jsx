import React, { useState, useEffect, useCallback } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check if mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 480);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobileView && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileView, isMobileMenuOpen]);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileView && isMobileMenuOpen) {
        const nav = document.querySelector('.navigation');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav && toggle && !nav.contains(event.target) && !toggle.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileView, isMobileMenuOpen]);

  useEffect(() => {
    // Apply the class to html and body
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Function to determine which section is in view
  const updateActiveSection = useCallback(() => {
    const sections = ['home', 'designs', 'projects', 'about'];
    const scrollPosition = window.scrollY + 100; // Adding offset for better UX

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const { offsetTop, offsetHeight } = section;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    // Initial check
    updateActiveSection();

    // Add scroll listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (isMobileView) {
      setIsMobileMenuOpen(false);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app">
      {/* Mobile Menu Toggle (Hamburger) */}
      {isMobileView && (
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Navigation */}
      <nav className={`navigation ${isMobileView ? (isMobileMenuOpen ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
        <button
          onClick={() => scrollToSection('home')}
          className={activeSection === 'home' ? 'active' : ''}
          data-short="H"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('designs')}
          className={activeSection === 'designs' ? 'active' : ''}
          data-short="D"
        >
          Designs
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className={activeSection === 'projects' ? 'active' : ''}
          data-short="P"
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={activeSection === 'about' ? 'active' : ''}
          data-short="A"
        >
          About
        </button>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="theme-nav-button"
          aria-label="Toggle theme"
        >
          {isLightMode ? (
            // Moon icon for dark mode
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            // Sun icon for light mode
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </nav>

      <div id="home">
        <Page1 />
      </div>
      <div id="designs">
        <Page2 />
      </div>
      <div id="projects">
        <Page3 />
      </div>
      <div id="about">
        <Page4 />
      </div>
    </div>
  );
}
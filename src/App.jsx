import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 480);
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    const sections = ['home', 'designs', 'projects', 'about'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px', // Triggers when section hits the upper middle
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    if (isMobileView) setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {isMobileView && (
        <button className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span><span></span><span></span>
        </button>
      )}

      <nav className={`navigation ${isMobileView ? (isMobileMenuOpen ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
        <button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button>
        <button onClick={() => scrollToSection('designs')} className={activeSection === 'designs' ? 'active' : ''}>Designs</button>
        <button onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button>
        <button onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button>
        <button onClick={() => setIsLightMode(!isLightMode)} className="theme-nav-button">
          {isLightMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
          )}
        </button>
      </nav>

      <div id="home"><Page1 /></div>
      <div id="designs"><Page2 /></div>
      <div id="projects"><Page3 /></div>
      <div id="about"><Page4 /></div>
    </div>
  );
}
import React, { useState } from 'react';
import './Page4.css';

export default function Page4() {
  const [showEmail, setShowEmail] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "lyrieleb@email.com"; 
  
  const handleEmailClick = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };
  
  const qualifications = [
    {
      icon: 'education',
      title: 'Education',
      items: [
        { name: 'Global Studies', institution: 'University of California Santa Barbara', year: '2021-2023' },
      ]
    },
    {
      icon: 'experience',
      title: 'Experience',
      items: [
        { name: 'French Tutor', institution: 'Superprof', year: '2025-Present' },
      ]
    },
    {
      icon: 'certification',
      title: 'Certifications',
      items: [
        { name: 'Computer Programming: C__ Certificate of Achievement', institution: 'San Francisco City College', year: '2025' },
        { name: 'Computer Programming: Java Certificate of Achievement', institution: 'San Francisco City College', year: '2026' },

      ]
    },
  ];
  
  const skills = [
    'Three.js', 'React', 'Blender', 'Node.js', 'WebGL',
    'JavaScript', 'Python', '3D Modeling', 'Animation', 'UI/UX', 'C++', 'SQL'
  ];
  
  const getIcon = (iconType) => {
    switch(iconType) {
      case 'education':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        );
      case 'experience':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'certification':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="page4-container">
      <div className="page4-content">
        {/* About Me Section */}
        <div className="page4-about">
          <h2 className="page4-main-title">About Me</h2>
          <div className="page4-about-wrapper">
            <div className="page4-profile-image">
              <img
                src="/unnamed.jpg"
                alt="Profile"
              />
            </div>
            <div className="page4-about-text">
              <p className="page4-bio">
                Hi, I'm a digital artist and creative developer who studied Global studies at 
                UC Santa Barbara, During the pandemic, I started coding on my own time for fun, 
                I started with C++ and JavaScript and started experimenting with building my own 
                websites. Eventually, I wanted to bring more depth to my projects, so I picked up 
                Blender to create my own visuals. What started as a way to enhance my sites quickly 
                turned into a passion for 3D modeling, short animations, and digital art. Over the last 
                few years, I’ve continued learning new languages and focusing on the intersection 
                of the two: turning my ideas into functional websites and art that actually feels fun to 
                interact with.
              </p>
              <p className="page4-bio">
                Multilingual, curious, and inspired by new places and ideas.              </p>
              
              {/* Social Links */}
              <div className="page4-social">
                <div 
                  className="page4-social-button page4-email-button" 
                  onClick={handleEmailClick}
                  onMouseEnter={() => setShowEmail(true)}
                  onMouseLeave={() => setShowEmail(false)}
                  aria-label="Email"
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {showEmail && (
                    <div className="page4-email-tooltip">
                      {emailCopied ? 'Copied!' : email}
                    </div>
                  )}
                </div>
                <a href="https://www.linkedin.com/in/lyriele-blanchard-2b513717a/" target="_blank" rel="noopener noreferrer" className="page4-social-button" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/Lyriele" target="_blank" rel="noopener noreferrer" className="page4-social-button" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="page4-social-button" aria-label="Resume">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Qualifications Section */}
        <div className="page4-qualifications">
          <h2 className="page4-section-title">Qualifications</h2>
          <div className="page4-qual-grid">
            {qualifications.map((section, index) => (
              <div key={index} className="page4-qual-card">
                <div className="page4-qual-header">
                  <div className="page4-qual-icon">{getIcon(section.icon)}</div>
                  <h3 className="page4-qual-title">{section.title}</h3>
                </div>
                {section.items.map((item, idx) => (
                  <div key={idx} className="page4-qual-item">
                    <h4 className="page4-qual-name">{item.name}</h4>
                    <p className="page4-qual-institution">{item.institution}</p>
                    <p className="page4-qual-year">{item.year}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="page4-skills">
          <h2 className="page4-section-title">Skills & Technologies</h2>
          <div className="page4-skills-wrapper">
            {skills.map((skill, index) => (
              <span key={index} className={`page4-skill page4-skill-${index % 12}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
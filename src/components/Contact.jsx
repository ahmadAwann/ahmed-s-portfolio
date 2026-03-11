import { useState } from 'react';

const Contact = ({ onClose }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const contactLinks = [
    {
      id: 'email',
      title: 'Email',
      value: 'ahmadmuniro280@gmail.com',
      url: 'mailto:ahmadmuniro280@gmail.com',
      icon: 'bi-envelope-fill',
      color: '#ec4899'
    },
    {
      id: 'github',
      title: 'GitHub',
      value: 'ahmadAwann',
      url: 'https://github.com/ahmadAwann',
      icon: 'bi-github',
      color: '#c084fc'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      value: 'Ahmad Munir',
      url: 'https://www.linkedin.com/in/ahmad-05346a2aa/',
      icon: 'bi-linkedin',
      color: '#06b6d4',
      isLinkedIn: true
    }
  ];

  const handleLinkClick = (e, link) => {
    if (link.isLinkedIn) {
      e.preventDefault();
      // Open in new window with specific features to try to get public view
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 99,
          backdropFilter: 'blur(5px)',
          cursor: 'pointer'
        }}
        onClick={onClose}
      />

      {/* Contact Card */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
        border: '2px solid rgba(168, 85, 247, 0.4)',
        borderRadius: '16px',
        padding: '30px',
        color: '#fff',
        fontFamily: "'Courier New', monospace",
        zIndex: 100,
        maxWidth: '450px',
        width: '85%',
        boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)',
        backdropFilter: 'blur(10px)',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, -40%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#a855f7',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{
            color: '#a855f7',
            fontSize: '1.6rem',
            margin: '0 0 8px 0',
            textShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
          }}>
            Get In Touch
          </h3>
          <p style={{
            color: '#e9d5ff',
            fontSize: '0.9rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Reach out through any channel below.
          </p>
        </div>

        {/* Contact Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '12px'
        }}>
          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: hoveredLink === link.id ? `${link.color}15` : 'rgba(168, 85, 247, 0.1)',
                border: `2px solid ${hoveredLink === link.id ? link.color : 'rgba(168, 85, 247, 0.2)'}`,
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                transform: hoveredLink === link.id ? 'translateX(6px)' : 'translateX(0)'
              }}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Icon */}
              <div style={{
                fontSize: '1.4rem',
                color: link.color,
                textShadow: hoveredLink === link.id ? `0 0 15px ${link.color}80` : 'none',
                transition: 'all 0.3s ease',
                minWidth: '30px',
                textAlign: 'center'
              }}>
                <i className={`bi ${link.icon}`}></i>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  color: link.color,
                  fontSize: '0.9rem',
                  margin: '0 0 2px 0',
                  fontWeight: 'bold'
                }}>
                  {link.title}
                </h4>
                <p style={{
                  color: '#c084fc',
                  fontSize: '0.8rem',
                  margin: 0,
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {link.value}
                </p>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: '1rem',
                color: link.color,
                opacity: hoveredLink === link.id ? 1 : 0.5,
                transition: 'all 0.3s ease',
                transform: hoveredLink === link.id ? 'translateX(5px)' : 'translateX(0)',
                flexShrink: 0
              }}>
                <i className="bi bi-arrow-right"></i>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          textAlign: 'center',
          color: '#aaa',
          fontSize: '0.8rem'
        }}>
          <p style={{ margin: 0 }}>
            Looking forward to connecting! 🚀
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;

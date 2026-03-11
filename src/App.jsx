import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showContact, setShowContact] = useState(false);

  const renderSection = () => {
    switch(currentSection) {
      case 'about': return <About />;
      case 'journey': return <Journey onNavigate={setCurrentSection} />;
      case 'projects': return <Projects onNavigate={setCurrentSection} />;
      case 'skills': return <Skills onNavigate={setCurrentSection} />;
      default: return null;
    }
  };

  return (
    <div className="App" style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <Hero onNavigate={setCurrentSection} currentSection={currentSection} onShowContact={() => setShowContact(true)} />
      {currentSection !== 'home' && (
        <div style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
          {renderSection()}
          <Footer />
        </div>
      )}
      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </div>
  );
}

export default App;

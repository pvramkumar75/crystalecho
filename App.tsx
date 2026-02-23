
import React, { useState } from 'react';
import { AppState } from './types';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import { HomePage } from './components/HomePage';
import OraclePage from './components/OraclePage';
import CrystalScanner from './components/CrystalScanner';
import CollectionPage from './components/CollectionPage';
import MethodsPage from './components/MethodsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('home');

  return (
    <div className="min-h-screen flex flex-col cosmic-bg">
      <Starfield />
      <Navbar active={currentPage} onChange={setCurrentPage} />

      <main className="flex-grow relative">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'oracle' && <OraclePage />}
        {currentPage === 'scanner' && <CrystalScanner />}
        {currentPage === 'collection' && <CollectionPage />}
        {currentPage === 'methods' && <MethodsPage />}
      </main>

      <footer className="footer-section pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl"
                  style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>✦</div>
                <span className="text-white text-3xl font-black font-serif">CrystalEcho</span>
              </div>
              <p className="max-w-md text-gray-500 text-lg leading-relaxed font-serif italic">
                Elevating human consciousness through the silent, eternal wisdom of the mineral kingdom. A companion for the modern soul.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <h5 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Protocols</h5>
                <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                  <li><button onClick={() => setCurrentPage('oracle')} className="hover:text-purple-400 transition-colors">The Oracle</button></li>
                  <li><button onClick={() => setCurrentPage('scanner')} className="hover:text-purple-400 transition-colors">Alchemist Lens</button></li>
                  <li><button onClick={() => setCurrentPage('collection')} className="hover:text-purple-400 transition-colors">Crystal Codex</button></li>
                  <li><button onClick={() => setCurrentPage('methods')} className="hover:text-purple-400 transition-colors">Sacred Rituals</button></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Knowledge</h5>
                <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                  <li><span className="hover:text-purple-400 transition-colors cursor-default">Vedic Gems</span></li>
                  <li><span className="hover:text-purple-400 transition-colors cursor-default">Vibrations</span></li>
                  <li><span className="hover:text-purple-400 transition-colors cursor-default">Chakra Science</span></li>
                  <li><span className="hover:text-purple-400 transition-colors cursor-default">Ethics</span></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Connect</h5>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">Powered by Gemini AI for crystal healing wisdom.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Energy Updates"
                    className="rounded-xl px-4 py-2.5 text-xs w-full outline-none text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                  <button className="px-4 py-2.5 rounded-xl text-white text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>✦</button>
                </div>
              </div>
            </div>
          </div>
          <div className="section-divider mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              &copy; 2026 CrystalEcho Labs — Powered by Gemini AI
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Resonance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

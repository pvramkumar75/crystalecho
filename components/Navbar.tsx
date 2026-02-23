
import React, { useState } from 'react';
import { AppState } from '../types';

const Navbar: React.FC<{ active: AppState; onChange: (s: AppState) => void }> = ({ active, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const items: { id: AppState; label: string; icon: string }[] = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'oracle', label: 'The Oracle', icon: '✨' },
        { id: 'scanner', label: 'Alchemist Lens', icon: '🔮' },
        { id: 'collection', label: 'Crystal Codex', icon: '💎' },
        { id: 'methods', label: 'Sacred Rituals', icon: '🕯️' },
    ];

    return (
        <nav className="nav-glass sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange('home')}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-purple-900/30 group-hover:rotate-12 transition-transform duration-500"
                        style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                        ✦
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-white font-serif">CrystalEcho</h1>
                </div>

                <div className="hidden lg:flex gap-1.5">
                    {items.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onChange(item.id)}
                            className={`nav-item ${active === item.id ? 'active' : ''}`}
                        >
                            <span className="mr-1.5">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M12 12h8m-12 6h12" />
                        )}
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden animate-slide-down" style={{ background: 'rgba(10,10,15,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="p-4 space-y-2">
                        {items.map(item => (
                            <button
                                key={item.id}
                                onClick={() => { onChange(item.id); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-4 rounded-2xl text-base font-bold flex items-center gap-3 transition-all ${active === item.id
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                style={active === item.id ? { background: 'linear-gradient(135deg, #9b59ff, #6366f1)' } : { background: 'rgba(255,255,255,0.03)' }}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

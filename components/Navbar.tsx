
import React, { useState, useRef, useEffect } from 'react';
import { AppState } from '../types';
import { AIProvider, AI_PROVIDERS, getProvider, setProvider } from '../geminiService';

const Navbar: React.FC<{ active: AppState; onChange: (s: AppState) => void }> = ({ active, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);
    const [currentAI, setCurrentAI] = useState<AIProvider>(getProvider());
    const dropdownRef = useRef<HTMLDivElement>(null);

    const items: { id: AppState; label: string; icon: string }[] = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'oracle', label: 'The Oracle', icon: '✨' },
        { id: 'scanner', label: 'Alchemist Lens', icon: '🔮' },
        { id: 'collection', label: 'Crystal Codex', icon: '💎' },
        { id: 'methods', label: 'Sacred Rituals', icon: '🕯️' },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProviderOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleProviderChange = (p: AIProvider) => {
        setProvider(p);
        setCurrentAI(p);
        setProviderOpen(false);
    };

    const providerInfo = AI_PROVIDERS[currentAI];

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

                <div className="flex items-center gap-3">
                    {/* AI Provider Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setProviderOpen(!providerOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:brightness-110"
                            style={{
                                background: 'rgba(155,89,255,0.12)',
                                border: '1px solid rgba(155,89,255,0.25)',
                            }}
                        >
                            <span className="text-base">{providerInfo.icon}</span>
                            <span className="text-purple-300 hidden sm:inline">{providerInfo.name}</span>
                            <svg className={`w-3 h-3 text-purple-400 transition-transform ${providerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {providerOpen && (
                            <div className="absolute right-0 top-full mt-2 w-72 animate-slide-down" style={{
                                background: 'rgba(15,15,22,0.98)',
                                border: '1px solid rgba(155,89,255,0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                overflow: 'hidden'
                            }}>
                                <div className="p-3">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 px-3 pt-2 pb-3">Select AI Engine</p>
                                    {(Object.keys(AI_PROVIDERS) as AIProvider[]).map(key => {
                                        const p = AI_PROVIDERS[key];
                                        const isActive = currentAI === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => handleProviderChange(key)}
                                                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all"
                                                style={isActive ? {
                                                    background: 'linear-gradient(135deg, rgba(155,89,255,0.2), rgba(99,102,241,0.15))',
                                                    border: '1px solid rgba(155,89,255,0.3)',
                                                } : {
                                                    background: 'transparent',
                                                    border: '1px solid transparent',
                                                }}
                                            >
                                                <span className="text-2xl w-8 text-center shrink-0">{p.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <span className={`text-sm font-black block ${isActive ? 'text-white' : 'text-gray-300'}`}>{p.name}</span>
                                                    <span className="text-[10px] text-gray-500 block">{p.description}</span>
                                                </div>
                                                {isActive && (
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
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
                        {/* Mobile AI selector */}
                        <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 px-3 py-2">AI Engine</p>
                            {(Object.keys(AI_PROVIDERS) as AIProvider[]).map(key => {
                                const p = AI_PROVIDERS[key];
                                const isActive = currentAI === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => { handleProviderChange(key); setIsOpen(false); }}
                                        className={`w-full text-left px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all mb-1 ${isActive ? 'text-white' : 'text-gray-500'}`}
                                        style={isActive ? { background: 'rgba(155,89,255,0.15)' } : { background: 'rgba(255,255,255,0.02)' }}
                                    >
                                        <span className="text-lg">{p.icon}</span>
                                        {p.name}
                                        {isActive && <span className="ml-auto text-purple-400 text-xs">Active</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

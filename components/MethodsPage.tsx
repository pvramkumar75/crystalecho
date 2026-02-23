
import React from 'react';
import { METHODS } from '../constants';

const MethodsPage: React.FC = () => (
    <div className="max-w-7xl mx-auto py-16 px-6 relative z-10 animate-fade-in">
        <div className="text-center mb-12">
            <div className="mystic-badge mx-auto mb-6"><span>🕯️</span> Ancient Wisdom</div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif italic tracking-tight">
                Sacred <span className="text-gradient">Rituals</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-serif italic">
                Time-honored techniques to cleanse, charge, and maintain the vibrational integrity of your crystals.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODS.map(m => (
                <div key={m.id} className="glass-card p-8 group relative overflow-hidden" style={{ borderRadius: '32px' }}>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-4xl">{m.icon}</div>
                            <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Ritual</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-3 font-serif italic group-hover:text-purple-300 transition-colors">
                            {m.title}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed text-sm">{m.description}</p>
                        <div className="space-y-4">
                            {m.howTo.map((step, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-purple-400 shrink-0"
                                        style={{ background: 'rgba(155,89,255,0.1)' }}>
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-300 text-sm font-serif leading-relaxed pt-0.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'rgba(155,89,255,0.05)' }}></div>
                </div>
            ))}
        </div>
    </div>
);

export default MethodsPage;

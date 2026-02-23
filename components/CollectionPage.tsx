
import React, { useState } from 'react';
import { CRYSTALS } from '../constants';
import { Crystal } from '../types';

const CrystalDetail: React.FC<{ crystal: Crystal; onClose: () => void }> = ({ crystal, onClose }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}></div>
        <div className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto prescription-card p-0 animate-slide-up" onClick={e => e.stopPropagation()} style={{ scrollbarWidth: 'thin' }}>
            <div className="h-56 overflow-hidden relative">
                <img src={crystal.image} alt={crystal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 60%)' }}></div>
                <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>✕</button>
            </div>
            <div className="p-8 -mt-16 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                        {crystal.chakra} Chakra
                    </span>
                    <span className="text-gray-500 text-xs">Element: {crystal.element}</span>
                    <span className="text-gray-500 text-xs">Color: {crystal.color}</span>
                </div>
                <h3 className="text-4xl font-black text-white font-serif italic mb-1">{crystal.name}</h3>
                <div className="flex flex-col gap-0.5 mb-6">
                    <span className="text-purple-300 text-sm font-serif italic">🇮🇳 Hindi: {crystal.hindiName}</span>
                    <span className="text-purple-300 text-sm font-serif italic">🇮🇳 Telugu: {crystal.teluguName}</span>
                </div>

                <p className="text-gray-300 font-serif italic leading-relaxed mb-6">{crystal.description}</p>

                {/* Vedic Info */}
                <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(155,89,255,0.06)', border: '1px solid rgba(155,89,255,0.15)' }}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">📿 Vedic & Indian Gemology</h4>
                    <p className="text-gray-200 font-serif italic leading-relaxed">{crystal.vedicInfo}</p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Healing Properties</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(155,89,255,0.15)' }}></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {crystal.properties.map(p => (
                        <span key={p} className="px-4 py-2 rounded-full text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const CollectionPage: React.FC = () => {
    const [selected, setSelected] = useState<Crystal | null>(null);
    const [filter, setFilter] = useState<string>('All');
    const chakras = ['All', 'Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];
    const filtered = filter === 'All' ? CRYSTALS : CRYSTALS.filter(c => c.chakra === filter);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 relative z-10 animate-fade-in">
            <div className="text-center mb-12">
                <div className="mystic-badge mx-auto mb-6"><span>💎</span> Crystal Codex</div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif italic tracking-tight">
                    Mineral <span className="text-gradient">Collection</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-serif italic">Ancient stones catalogued for the modern seeker. Tap any crystal to reveal its full knowledge.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {chakras.map(ch => (
                    <button key={ch} onClick={() => setFilter(ch)}
                        className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === ch ? 'text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                        style={filter === ch ? { background: 'linear-gradient(135deg, #9b59ff, #6366f1)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {ch}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map(c => (
                    <div key={c.id} className="crystal-grid-card cursor-pointer" onClick={() => setSelected(c)}>
                        <div className="overflow-hidden">
                            <img src={c.image} alt={c.name} />
                        </div>
                        <div className="p-4">
                            <h4 className="font-black text-white text-sm mb-0.5">{c.name}</h4>
                            <p className="text-purple-300 text-[9px] font-serif italic mb-1.5 leading-tight">
                                {c.hindiName.split('(')[0].trim()} • {c.teluguName.split('(')[0].trim()}
                            </p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">{c.chakra} • {c.element}</p>
                            <div className="flex flex-wrap gap-1">
                                {c.properties.slice(0, 2).map(p => (
                                    <span key={p} className="text-[9px] px-2 py-0.5 rounded-full text-gray-400" style={{ background: 'rgba(255,255,255,0.04)' }}>{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selected && <CrystalDetail crystal={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default CollectionPage;


import React, { useState } from 'react';
import { STONE_LOOKUP, CRYSTALS } from '../constants';

interface StonePopupProps {
    isOpen: boolean;
    stoneName: string;
    onClose: () => void;
}

const StonePopup: React.FC<StonePopupProps> = ({ isOpen, stoneName, onClose }) => {
    if (!isOpen) return null;
    const key = stoneName.toLowerCase();
    const data = STONE_LOOKUP[key];
    const crystal = CRYSTALS.find(c => c.name.toLowerCase() === key);

    if (!data) {
        return (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}></div>
                <div className="relative max-w-md w-full glass-card p-8 animate-slide-up" style={{ borderRadius: '32px' }} onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
                    <h3 className="text-2xl font-black text-white font-serif italic mb-4">{stoneName}</h3>
                    <p className="text-gray-400 font-serif italic">No detailed information available for this stone yet. Ask the Oracle for more details!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}></div>
            <div className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto prescription-card animate-slide-up" onClick={e => e.stopPropagation()} style={{ scrollbarWidth: 'thin' }}>
                {/* Image header */}
                {(crystal?.image || data.image) && (
                    <div className="h-48 overflow-hidden relative" style={{ borderRadius: '48px 48px 0 0' }}>
                        <img src={crystal?.image || data.image} alt={stoneName} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 60%)' }}></div>
                    </div>
                )}
                <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm z-20" style={{ background: 'rgba(0,0,0,0.5)' }}>✕</button>

                <div className="p-8 -mt-12 relative z-10">
                    {/* Name badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {data.chakra && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                                {data.chakra} Chakra
                            </span>
                        )}
                        {data.element && <span className="text-gray-500 text-xs">Element: {data.element}</span>}
                    </div>

                    <h3 className="text-4xl font-black text-white font-serif italic mb-1">{stoneName}</h3>
                    <div className="flex flex-col gap-0.5 mb-6">
                        <span className="text-purple-300 text-sm font-serif italic">Hindi: {data.hindiName}</span>
                        <span className="text-purple-300 text-sm font-serif italic">Telugu: {data.teluguName}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 font-serif italic leading-relaxed mb-6">{data.description}</p>

                    {/* Vedic Info */}
                    {data.vedicInfo && (
                        <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(155,89,255,0.06)', border: '1px solid rgba(155,89,255,0.15)' }}>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">📿 Vedic & Indian Knowledge</h4>
                            <p className="text-gray-200 font-serif italic leading-relaxed">{data.vedicInfo}</p>
                        </div>
                    )}

                    {/* Properties */}
                    <div className="mb-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Healing Properties</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.properties.map(p => (
                                <span key={p} className="px-4 py-2 rounded-full text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Interactive stone name component — renders stone names as clickable links
export const InteractiveStoneName: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const [showPopup, setShowPopup] = useState(false);
    const key = name.toLowerCase();
    const data = STONE_LOOKUP[key];

    return (
        <>
            <button
                onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}
                className={`inline-flex items-center gap-1 text-purple-300 hover:text-purple-100 underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400 transition-all cursor-pointer font-serif italic ${className || ''}`}
                title={data ? `${name} — ${data.hindiName} / ${data.teluguName}` : name}
            >
                {name}
                {data && <span className="text-gray-500 text-[0.75em] no-underline"> ({data.hindiName.split('(')[0].trim()})</span>}
            </button>
            <StonePopup isOpen={showPopup} stoneName={name} onClose={() => setShowPopup(false)} />
        </>
    );
};

// Utility: Parse text and make stone names interactive
export const parseStoneNames = (text: string): React.ReactNode[] => {
    const allStones = Object.keys(STONE_LOOKUP);
    // Sort by length descending so longer names match first
    allStones.sort((a, b) => b.length - a.length);

    const regex = new RegExp(`\\b(${allStones.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const matchedName = match[0];
        // Find proper cased name
        const proper = allStones.find(s => s.toLowerCase() === matchedName.toLowerCase()) || matchedName;
        const displayName = proper.charAt(0).toUpperCase() + proper.slice(1);
        parts.push(<InteractiveStoneName key={key++} name={displayName} />);
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
};

export default StonePopup;

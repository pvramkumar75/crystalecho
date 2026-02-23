
import React, { useState, useRef } from 'react';
import { IdentificationResult } from '../types';
import { identifyCrystal } from '../geminiService';

const CrystalScanner: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IdentificationResult | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        setResult(null);

        const reader = new FileReader();
        reader.onload = async () => {
            const dataUrl = reader.result as string;
            setPreview(dataUrl);
            const base64 = dataUrl.split(',')[1];
            try {
                const data = await identifyCrystal(base64);
                setResult(data);
            } catch {
                alert("The energy was too clouded to identify. Try a clearer photo.");
            } finally {
                setLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="max-w-6xl mx-auto py-16 px-6 relative z-10 animate-fade-in">
            <div className="text-center mb-12">
                <div className="mystic-badge mx-auto mb-6">
                    <span>🔮</span> Vision Active
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif italic tracking-tight">
                    Alchemist's <span className="text-gradient">Lens</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-serif italic">
                    Harness computer vision to decode the atomic vibration of mysterious minerals.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Area */}
                <div className="space-y-6">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="scanner-dropzone aspect-square flex flex-col items-center justify-center overflow-hidden relative"
                    >
                        {preview && !loading ? (
                            <img src={preview} alt="Crystal preview" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                        ) : null}
                        {loading ? (
                            <div className="text-center relative z-10">
                                <div className="mystic-spinner mx-auto mb-6"></div>
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Analyzing Crystal Resonance...</p>
                            </div>
                        ) : (
                            <div className="text-center relative z-10">
                                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto"
                                    style={{ background: 'rgba(155,89,255,0.1)', border: '1px solid rgba(155,89,255,0.2)' }}>
                                    <svg className="w-10 h-10" style={{ color: '#9b59ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-white font-black text-xl mb-1">{preview ? 'Scan Another' : 'Begin the Scan'}</p>
                                <p className="text-gray-500 text-sm">Capture the mineral's geometric record</p>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[{ icon: '✨', label: 'Clear Clarity' }, { icon: '📸', label: 'Direct Focus' }, { icon: '🌞', label: 'Natural Light' }].map(tip => (
                            <div key={tip.label} className="glass-card p-4 text-center" style={{ borderRadius: '16px' }}>
                                <span className="block text-xl mb-1">{tip.icon}</span>
                                <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">{tip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Result */}
                <div className="flex flex-col">
                    {result ? (
                        <div className="prescription-card p-10 flex-grow animate-slide-up">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-2">Resonant Match</span>
                                    <h3 className="text-4xl font-black text-white font-serif italic mb-2">{result.name}</h3>
                                    <div className="flex gap-4">
                                        <span className="text-gray-400 text-sm font-serif italic">Hindi: {result.hindiName}</span>
                                        <span className="text-gray-400 text-sm font-serif italic">Telugu: {result.teluguName}</span>
                                    </div>
                                </div>
                                <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                                    style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                                    {result.confidence}
                                </div>
                            </div>
                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Core Frequency</h4>
                                    <p className="text-gray-200 text-xl font-serif italic leading-relaxed">{result.primaryProperty}</p>
                                </section>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass-card p-5" style={{ borderRadius: '20px' }}>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">Chakra</span>
                                        <span className="text-white font-black">{result.chakra}</span>
                                    </div>
                                    <div className="glass-card p-5" style={{ borderRadius: '20px' }}>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">Nature</span>
                                        <span className="text-white font-black font-serif italic">Earth Memory</span>
                                    </div>
                                </div>
                                <section>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Historical Record</h4>
                                    <p className="text-gray-400 text-lg font-serif italic leading-relaxed">{result.history}</p>
                                </section>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-center p-16 glass-card" style={{ borderRadius: '48px' }}>
                            <div className="max-w-xs">
                                <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl" style={{ background: 'rgba(155,89,255,0.05)' }}>
                                    💎
                                </div>
                                <h4 className="text-gray-400 font-black text-xl mb-2 font-serif italic">Waiting for Transmission</h4>
                                <p className="text-gray-600 text-sm">Upload a crystal photo to unlock its energetic profile and ancient lineage.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CrystalScanner;

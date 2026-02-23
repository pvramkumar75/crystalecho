
import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { CRYSTALS, ZODIAC_CRYSTALS, ZODIAC_SYMBOLS, DAILY_AFFIRMATIONS, MOON_PHASES } from '../constants';
import { InteractiveStoneName, parseStoneNames } from './StonePopup';

// --- Section Title ---
const SectionTitle: React.FC<{ title: string; subtitle?: string; gradient?: boolean }> = ({ title, subtitle, gradient }) => (
    <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif italic leading-tight tracking-tight">
            {gradient ? <span className="text-gradient">{title}</span> : title}
        </h2>
        {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto font-serif italic">{subtitle}</p>}
    </div>
);

// --- Chakra Section ---
const CHAKRAS = [
    { name: 'Root', color: '#ef4444', focus: 'Stability & Security', sanskrit: 'मूलाधार / Muladhara', hindi: 'मूल चक्र', telugu: 'మూల చక్రం' },
    { name: 'Sacral', color: '#f97316', focus: 'Creativity & Emotion', sanskrit: 'स्वाधिष्ठान / Svadhisthana', hindi: 'स्वाधिष्ठान चक्र', telugu: 'స్వాధిష్ఠాన చక్రం' },
    { name: 'Solar Plexus', color: '#eab308', focus: 'Willpower & Confidence', sanskrit: 'मणिपूर / Manipura', hindi: 'मणिपूर चक्र', telugu: 'మణిపూర చక్రం' },
    { name: 'Heart', color: '#22c55e', focus: 'Love & Compassion', sanskrit: 'अनाहत / Anahata', hindi: 'हृदय चक्र', telugu: 'హృదయ చక్రం' },
    { name: 'Throat', color: '#3b82f6', focus: 'Communication & Truth', sanskrit: 'विशुद्ध / Vishuddha', hindi: 'विशुद्धि चक्र', telugu: 'విశుద్ధ చక్రం' },
    { name: 'Third Eye', color: '#6366f1', focus: 'Intuition & Foresight', sanskrit: 'आज्ञा / Ajna', hindi: 'आज्ञा चक्र', telugu: 'ఆజ్ఞా చక్రం' },
    { name: 'Crown', color: '#a855f7', focus: 'Spirituality & Connection', sanskrit: 'सहस्रार / Sahasrara', hindi: 'सहस्रार चक्र', telugu: 'సహస్రార చక్రం' }
];

const ChakraSection: React.FC = () => (
    <section className="py-16">
        <SectionTitle title="Seven Energy Centers" subtitle="The vibrational architecture of the human spirit." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CHAKRAS.map((c) => (
                <div key={c.name} className="chakra-card group">
                    <div className="chakra-orb" style={{ backgroundColor: c.color, boxShadow: `0 0 20px ${c.color}40` }}></div>
                    <h4 className="font-black text-white text-sm mb-1">{c.name}</h4>
                    <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider leading-tight mb-2">{c.focus}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                        <p className="text-[8px] text-purple-400 font-serif italic">{c.sanskrit}</p>
                        <p className="text-[7px] text-gray-500 mt-0.5">{c.hindi} • {c.telugu}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

// --- Moon Dashboard with Hindi/Telugu ---
const MoonDashboard: React.FC = () => {
    const [phase, setPhase] = useState('Waxing Gibbous');
    const [illumination, setIllumination] = useState(82);

    useEffect(() => {
        const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
        const synodic = 29.53059;
        const known = new Date(2000, 0, 6, 18, 14);
        const now = new Date();
        const diff = (now.getTime() - known.getTime()) / (1000 * 60 * 60 * 24);
        const cycle = diff % synodic;
        const idx = Math.floor((cycle / synodic) * 8) % 8;
        setPhase(phases[idx]);
        const ill = idx <= 4 ? Math.round((cycle / synodic) * 200) : Math.round(200 - (cycle / synodic) * 200);
        setIllumination(Math.min(100, Math.max(0, ill)));
    }, []);

    const moonData = MOON_PHASES[phase];

    return (
        <div className="moon-section p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative shrink-0" style={{ width: 160, height: 160 }}>
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: 'rgba(155,89,255,0.05)' }}></div>
                    <div className="moon-orb absolute inset-2"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-full" style={{ background: 'rgba(10,10,15,0.7)', clipPath: `inset(0 ${100 - illumination}% 0 0)` }}></div>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-3">Celestial Alignment</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif italic">{phase}</h3>
                    {moonData && (
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="text-sm text-purple-300 font-serif italic">{moonData.hindi}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-sm text-purple-300 font-serif italic">{moonData.telugu}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                            {illumination}% Illuminated
                        </span>
                    </div>
                    <div className="glass-card p-5" style={{ borderRadius: '20px' }}>
                        <p className="text-gray-300 font-serif italic leading-relaxed">
                            {moonData ? parseStoneNames(moonData.advice) : 'Loading celestial data...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Daily Crystal ---
const DailyCrystal: React.FC = () => {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % CRYSTALS.length;
    const crystal = CRYSTALS[dayIndex];
    const affirmation = DAILY_AFFIRMATIONS[today.getDate() % DAILY_AFFIRMATIONS.length];

    return (
        <div className="daily-crystal-banner p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-28 h-28 rounded-3xl overflow-hidden shrink-0 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(155,89,255,0.2)' }}>
                    <img src={crystal.image} alt={crystal.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Today's Crystal</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[10px] text-gray-500 font-bold">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white font-serif italic mb-1">
                        <InteractiveStoneName name={crystal.name} />
                    </h3>
                    <p className="text-purple-300 text-xs font-serif italic mb-3">
                        {crystal.hindiName} • {crystal.teluguName}
                    </p>
                    <p className="text-gray-400 font-serif italic mb-4 leading-relaxed">{crystal.description}</p>
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)' }}>
                        <p className="text-emerald-300 font-serif italic text-sm">✦ "{affirmation}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Zodiac Section with Interactive Stones ---
const ZodiacWheel: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const signs = Object.keys(ZODIAC_CRYSTALS);

    return (
        <section className="py-12">
            <SectionTitle title="Zodiac Resonance" subtitle="Discover the crystals aligned with your cosmic birth signature." />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
                {signs.map(sign => (
                    <button
                        key={sign}
                        onClick={() => setSelected(selected === sign ? null : sign)}
                        className={`glass-card p-4 text-center transition-all cursor-pointer ${selected === sign ? 'border-purple-500/40' : ''}`}
                        style={selected === sign ? { background: 'rgba(155,89,255,0.08)', borderColor: 'rgba(155,89,255,0.3)', borderRadius: '20px' } : { borderRadius: '20px' }}
                    >
                        <span className="text-3xl block mb-2">{ZODIAC_SYMBOLS[sign]}</span>
                        <span className="text-xs font-black text-white">{sign}</span>
                        <span className="text-[9px] text-gray-500 block mt-1">{ZODIAC_CRYSTALS[sign].element}</span>
                    </button>
                ))}
            </div>
            {selected && (
                <div className="prescription-card p-8 animate-slide-up">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{ZODIAC_SYMBOLS[selected]}</span>
                        <div>
                            <h3 className="text-2xl font-black text-white font-serif italic">{selected}</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{ZODIAC_CRYSTALS[selected].element} • {ZODIAC_CRYSTALS[selected].quality}</p>
                        </div>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4">Power Stones</h4>
                    <div className="flex flex-wrap gap-3">
                        {ZODIAC_CRYSTALS[selected].stones.map(s => (
                            <div key={s} className="px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: 'rgba(155,89,255,0.15)', border: '1px solid rgba(155,89,255,0.25)' }}>
                                💎 <InteractiveStoneName name={s} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

// --- Home Page ---
const HomePage: React.FC<{ onNavigate: (page: AppState) => void }> = ({ onNavigate }) => (
    <div className="animate-fade-in relative z-10">
        {/* Hero */}
        <section className="max-w-7xl mx-auto pt-20 pb-12 px-6 text-center">
            <div className="mystic-badge mx-auto mb-8">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#9b59ff' }}></span>
                Earth Memory Live
            </div>
            <h2 className="hero-title text-7xl md:text-[8rem] font-black text-white mb-8 leading-[0.85] tracking-tighter font-serif">
                Seek the Silent <br />
                <span className="text-gradient italic">Vibration.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-serif italic">
                A digital conduit for mineral wisdom. Decode the energetic lattice of the Earth to harmonize your modern experience.
            </p>
            <button onClick={() => onNavigate('oracle')} className="oracle-button px-12 py-5 text-lg font-black inline-flex items-center gap-3">
                <span className="text-2xl">✨</span> Consult the Oracle
            </button>
        </section>

        {/* Definition */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="section-divider mb-20"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-4">
                    <span className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-3 block">The Science of Stone</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white font-serif italic leading-tight mb-6">What is<br />Lithotherapy?</h3>
                    <div className="w-16 h-0.5" style={{ background: '#9b59ff' }}></div>
                </div>
                <div className="lg:col-span-8">
                    <p className="text-2xl text-gray-300 font-serif leading-relaxed mb-6">
                        Derived from the Greek <span className="italic font-bold text-white">lithos</span> (stone) and <span className="italic font-bold text-white">therapeia</span> (care), Lithotherapy utilizes the <span className="text-purple-400 font-bold">unique vibrational frequencies</span> of minerals and crystals to harmonize the human bio-field.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
                        <p className="font-serif italic leading-relaxed">Every crystal possesses a specific, stable geometric lattice that emits a constant frequency. Through resonance, these frequencies interact with our energy centers.</p>
                        <p className="font-serif italic leading-relaxed">It is a dialogue between the Earth's oldest records and our modern spirits — a bridge between geology and the soul's journey toward equilibrium.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Daily Crystal */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
            <DailyCrystal />
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div onClick={() => onNavigate('oracle')} className="glass-card p-10 cursor-pointer group" style={{ borderRadius: '32px' }}>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(155,89,255,0.1)' }}>✨</div>
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Priority</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 font-serif italic">The Sacred Oracle</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">AI-powered crystal prescription engine. Describe your intention to receive a complete healing mineral blueprint with follow-up Q&A.</p>
                    <span className="text-purple-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 inline-block transition-transform">Consult Now →</span>
                </div>
                <div onClick={() => onNavigate('scanner')} className="glass-card p-10 cursor-pointer group" style={{ borderRadius: '32px' }}>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(34,211,238,0.1)' }}>🔮</div>
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Tool</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 font-serif italic">Alchemist's Lens</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">Upload crystal photos for instant AI identification. Reveal hidden properties, history, and vibrational profiles.</p>
                    <span className="text-cyan-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 inline-block transition-transform">Initialize Scanner →</span>
                </div>
            </div>
            <MoonDashboard />
        </section>

        {/* Chakra & Zodiac */}
        <section className="max-w-7xl mx-auto px-6 py-12">
            <ChakraSection />
            <ZodiacWheel />
        </section>

        {/* Crystal Collection Preview */}
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-2">Crystal Codex</span>
                    <h3 className="text-3xl font-black text-white font-serif italic">Mineral Collection</h3>
                </div>
                <button onClick={() => onNavigate('collection')} className="text-purple-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                    View All →
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CRYSTALS.slice(0, 4).map(c => (
                    <div key={c.id} className="crystal-grid-card cursor-pointer" onClick={() => onNavigate('collection')}>
                        <div className="overflow-hidden">
                            <img src={c.image} alt={c.name} />
                        </div>
                        <div className="p-4">
                            <h4 className="font-black text-white text-sm mb-0.5">{c.name}</h4>
                            <p className="text-purple-300 text-[9px] font-serif italic mb-1">{c.hindiName} • {c.teluguName}</p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{c.chakra} Chakra</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

export { HomePage, ChakraSection, MoonDashboard, DailyCrystal, ZodiacWheel, SectionTitle };

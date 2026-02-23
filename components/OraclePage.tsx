
import React, { useState, useRef } from 'react';
import { Prescription, OracleMessage } from '../types';
import { getLithotherapyAdvice, getOracleFollowUp } from '../geminiService';
import { STONE_LOOKUP, SUGGESTED_FOLLOWUPS } from '../constants';
import { parseStoneNames, InteractiveStoneName } from './StonePopup';

const OraclePage: React.FC = () => {
    const [issue, setIssue] = useState('');
    const [loading, setLoading] = useState(false);
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [messages, setMessages] = useState<OracleMessage[]>([]);
    const [followUp, setFollowUp] = useState('');
    const [followUpLoading, setFollowUpLoading] = useState(false);
    const [originalQuery, setOriginalQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    // Get 4 random suggested questions
    const getSuggestedQuestions = () => {
        const shuffled = [...SUGGESTED_FOLLOWUPS].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!issue.trim()) return;
        const userMsg: OracleMessage = { id: Date.now().toString(), role: 'user', content: issue, timestamp: Date.now() };
        setMessages([userMsg]);
        setOriginalQuery(issue);
        setLoading(true);
        setPrescription(null);
        try {
            const res = await getLithotherapyAdvice(issue);
            setPrescription(res);
            const oracleMsg: OracleMessage = {
                id: (Date.now() + 1).toString(), role: 'oracle',
                content: `The stars align with **${res.stoneName}** (${res.hindiName} / ${res.teluguName}) for your journey.`,
                timestamp: Date.now(), prescription: res
            };
            setMessages(prev => [...prev, oracleMsg]);
            scrollToBottom();
        } catch (err) {
            console.error('Oracle API Error:', err);
            const errorDetail = err instanceof Error ? err.message : 'Unknown error';
            const errMsg: OracleMessage = { id: (Date.now() + 1).toString(), role: 'oracle', content: `The cosmic frequencies encountered a disruption: ${errorDetail}`, timestamp: Date.now() };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setLoading(false);
            setIssue('');
        }
    };

    const handleFollowUp = async (e: React.FormEvent | null, directQuestion?: string) => {
        if (e) e.preventDefault();
        const question = directQuestion || followUp;
        if (!question.trim() || !prescription) return;
        const userMsg: OracleMessage = { id: Date.now().toString(), role: 'user', content: question, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setFollowUpLoading(true);
        setFollowUp('');
        try {
            const response = await getOracleFollowUp(originalQuery, prescription, question);
            const oracleMsg: OracleMessage = { id: (Date.now() + 1).toString(), role: 'oracle', content: response, timestamp: Date.now() };
            setMessages(prev => [...prev, oracleMsg]);
            scrollToBottom();
        } catch (err) {
            console.error('Oracle Follow-up Error:', err);
            const errorDetail = err instanceof Error ? err.message : 'Unknown error';
            const errMsg: OracleMessage = { id: (Date.now() + 1).toString(), role: 'oracle', content: `The vision has clouded: ${errorDetail}`, timestamp: Date.now() };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setFollowUpLoading(false);
        }
    };

    const getStoneImage = (name: string): string | null => {
        const key = name.toLowerCase();
        const data = STONE_LOOKUP[key];
        return data?.image || null;
    };

    return (
        <div className="max-w-5xl mx-auto py-16 px-6 relative z-10 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="mystic-badge mx-auto mb-6">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#9b59ff' }}></span>
                    Oracle Active
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif italic leading-tight tracking-tight">
                    The Sacred <span className="text-gradient">Oracle</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-serif italic">
                    Express your energetic state, intention, or blockage. The Oracle will prescribe the perfect mineral alignment for your journey.
                </p>
            </div>

            {/* Oracle Container */}
            <div className="oracle-container p-8 md:p-12">
                {/* Intro */}
                {messages.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="text-6xl mb-6">🔮</div>
                        <p className="text-gray-500 text-xl font-serif italic max-w-lg mx-auto leading-relaxed">
                            "Close your eyes, ground your energy into the earth below, and breathe. Describe the resonance you wish to invite or the blockage you wish to clear."
                        </p>
                    </div>
                )}

                {/* Messages */}
                {messages.length > 0 && (
                    <div className="space-y-6 mb-8 max-h-[65vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                                <div className={`max-w-[90%] rounded-3xl p-6 ${msg.role === 'user'
                                        ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 text-purple-100'
                                        : 'glass-card text-gray-200'
                                    }`}>
                                    {msg.role === 'oracle' && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm">✨</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Oracle Speaks</span>
                                        </div>
                                    )}
                                    {/* Render text with interactive stone names */}
                                    <p className="font-serif italic text-lg leading-relaxed whitespace-pre-wrap">
                                        {msg.role === 'oracle' ? parseStoneNames(msg.content) : msg.content}
                                    </p>

                                    {/* Prescription Card */}
                                    {msg.prescription && (
                                        <div className="prescription-card p-6 md:p-8 mt-6">
                                            {/* Stone Image + Name */}
                                            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                                                {getStoneImage(msg.prescription.stoneName) && (
                                                    <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(155,89,255,0.2)' }}>
                                                        <img src={getStoneImage(msg.prescription.stoneName)!} alt={msg.prescription.stoneName} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-2">Divine Alignment</span>
                                                    <h3 className="text-3xl md:text-4xl font-black text-white font-serif italic">
                                                        <InteractiveStoneName name={msg.prescription.stoneName} />
                                                    </h3>
                                                    <div className="flex flex-col gap-0.5 mt-2">
                                                        <span className="text-purple-300 text-sm font-serif italic">🇮🇳 Hindi: {msg.prescription.hindiName}</span>
                                                        <span className="text-purple-300 text-sm font-serif italic">🇮🇳 Telugu: {msg.prescription.teluguName}</span>
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col gap-3">
                                                    <div className="rounded-2xl px-5 py-3 text-center" style={{ background: 'rgba(155,89,255,0.15)', border: '1px solid rgba(155,89,255,0.2)' }}>
                                                        <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest block mb-1">Color</span>
                                                        <span className="font-black text-sm text-white">{msg.prescription.color}</span>
                                                    </div>
                                                    <div className="rounded-2xl px-5 py-3 text-center" style={{ background: 'linear-gradient(135deg, #9b59ff, #6366f1)' }}>
                                                        <span className="text-[9px] font-black uppercase text-white/60 tracking-widest block mb-1">Weight</span>
                                                        <span className="font-black text-sm text-white">{msg.prescription.weight}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">✨ Healing Properties</h4>
                                                    <p className="text-gray-300 font-serif italic leading-relaxed">{parseStoneNames(msg.prescription.healingProperties)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">💍 Wearing Instructions</h4>
                                                    <p className="text-gray-300 font-serif italic leading-relaxed">{parseStoneNames(msg.prescription.wearingInstructions)}</p>
                                                </div>
                                                <div className="rounded-2xl p-5" style={{ background: 'rgba(155,89,255,0.06)', border: '1px solid rgba(155,89,255,0.1)' }}>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">🔮 Oracle Message</h4>
                                                    <p className="text-white font-serif italic text-lg leading-relaxed">"{msg.prescription.advice}"</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">🧹 Cleansing Ritual</h4>
                                                    <p className="text-gray-400 font-serif italic leading-relaxed">{parseStoneNames(msg.prescription.cleansingMethod)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Suggested Follow-up Questions */}
                        {prescription && !loading && !followUpLoading && messages.length >= 2 && (
                            <div className="animate-slide-up">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 ml-1">💡 Suggested Questions</p>
                                <div className="flex flex-wrap gap-2">
                                    {getSuggestedQuestions().map((q, i) => (
                                        <button key={i} onClick={() => handleFollowUp(null, q)}
                                            className="px-4 py-2 rounded-full text-xs text-purple-300 hover:text-white transition-all cursor-pointer"
                                            style={{ background: 'rgba(155,89,255,0.08)', border: '1px solid rgba(155,89,255,0.15)' }}>
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(loading || followUpLoading) && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="glass-card p-6 flex items-center gap-4">
                                    <div className="mystic-spinner" style={{ width: 24, height: 24, borderWidth: 2 }}></div>
                                    <span className="text-gray-400 text-sm font-serif italic">The Oracle is aligning frequencies...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Input Area */}
                {!prescription ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            className="oracle-input w-full h-36 p-8 text-xl"
                            placeholder="I seek clarity in my heart space and protection from external chaos..."
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                        />
                        <button disabled={loading || !issue.trim()} className="oracle-button w-full py-6 text-xl font-black flex items-center justify-center gap-3">
                            {loading ? (
                                <><div className="mystic-spinner" style={{ width: 24, height: 24, borderWidth: 2 }}></div> Aligning Frequencies...</>
                            ) : (
                                <><span className="text-2xl">✨</span> Consult the Oracle</>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={(e) => handleFollowUp(e)} className="flex gap-3">
                        <input
                            type="text"
                            className="oracle-input flex-1 px-6 py-4 text-base"
                            style={{ borderRadius: '20px', fontStyle: 'italic' }}
                            placeholder="Ask a follow-up question about the prescribed stone..."
                            value={followUp}
                            onChange={(e) => setFollowUp(e.target.value)}
                        />
                        <button disabled={followUpLoading || !followUp.trim()} className="oracle-button px-8 py-4 text-sm font-black" style={{ borderRadius: '20px' }}>
                            {followUpLoading ? '...' : 'Ask ✦'}
                        </button>
                    </form>
                )}

                {/* New Consultation */}
                {prescription && (
                    <button
                        onClick={() => { setPrescription(null); setMessages([]); setOriginalQuery(''); }}
                        className="mt-4 w-full py-3 text-center text-gray-500 text-xs font-black uppercase tracking-widest hover:text-purple-400 transition-colors"
                    >
                        ✦ Begin New Consultation ✦
                    </button>
                )}
            </div>
        </div>
    );
};

export default OraclePage;

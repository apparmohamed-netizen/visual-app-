/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Copy, Repeat, Zap, Dna, GitMerge } from 'lucide-react';

// --- MUTATION MECHANISMS DIAGRAM ---
export const MutationDiagram: React.FC = () => {
  const originalSequence = ['A', 'T', 'G', 'C', 'A', 'T', 'G'];
  const [sequence, setSequence] = useState(originalSequence);
  const [mode, setMode] = useState<'normal' | 'substitution' | 'insertion' | 'deletion'>('normal');

  const handleReset = () => {
    setSequence(originalSequence);
    setMode('normal');
  };

  const applyMutation = (type: string) => {
    const newSeq = [...originalSequence];
    if (type === 'substitution') {
        // Substitute G with T at index 2
        newSeq[2] = 'T'; 
        setMode('substitution');
    } else if (type === 'insertion') {
        // Insert A at index 3
        newSeq.splice(3, 0, 'A');
        setMode('insertion');
    } else if (type === 'deletion') {
        // Delete C at index 3
        newSeq.splice(3, 1);
        setMode('deletion');
    }
    setSequence(newSeq);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Genotypic Mechanisms: Mutation</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Explore how sequence alterations affect the genome. These changes are heritable and irreversible.
      </p>
      
      <div className="flex gap-2 mb-8 items-center justify-center bg-stone-50 p-6 rounded-lg border border-stone-100 min-h-[100px]">
        <AnimatePresence mode='popLayout'>
            {sequence.map((base, i) => (
                <motion.div
                    key={`${base}-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: -10 }}
                    className={`w-10 h-14 rounded-md flex items-center justify-center font-bold text-lg shadow-sm border-b-4 ${
                        mode !== 'normal' && i === (mode === 'insertion' ? 3 : mode === 'deletion' ? -1 : 2)
                        ? 'bg-red-50 text-red-600 border-red-200' 
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                >
                    {base}
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-md">
          <button onClick={() => applyMutation('substitution')} className={`p-3 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${mode === 'substitution' ? 'bg-stone-800 text-white' : 'bg-white hover:bg-stone-50'}`}>
             Substitution
          </button>
          <button onClick={() => applyMutation('insertion')} className={`p-3 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${mode === 'insertion' ? 'bg-stone-800 text-white' : 'bg-white hover:bg-stone-50'}`}>
             Insertion
          </button>
          <button onClick={() => applyMutation('deletion')} className={`p-3 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${mode === 'deletion' ? 'bg-stone-800 text-white' : 'bg-white hover:bg-stone-50'}`}>
             Deletion
          </button>
          <button onClick={handleReset} className="p-3 text-xs font-bold uppercase tracking-wider rounded border border-stone-200 text-stone-500 hover:text-stone-900">
             Reset
          </button>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {mode === 'normal' && "Original DNA Sequence."}
        {mode === 'substitution' && "Base Substitution: Transition or Transversion."}
        {mode === 'insertion' && "Frame-shift: Integration of new base."}
        {mode === 'deletion' && "Frame-shift: Loss of base pair."}
      </div>
    </div>
  );
};

// --- GENE TRANSFER (CONJUGATION) DIAGRAM ---
export const GeneTransferDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Conjugation: Gene Transfer</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        Transfer of genetic material (F-plasmid) via direct cell contact (Sex pilus).
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-16 p-4">
        
        {/* Donor Cell F+ */}
        <div className="relative w-24 h-32 bg-green-100 rounded-full border-2 border-green-300 flex flex-col items-center justify-center">
             <span className="absolute -top-6 text-xs font-bold text-green-700">Donor (F+)</span>
             {/* Chromosome */}
             <div className="w-16 h-16 border border-green-400 opacity-30 rounded-full animate-spin-slow absolute"></div>
             
             {/* Plasmid (The thing moving) */}
             <div className="w-8 h-8 rounded-full border-2 border-nobel-gold absolute top-8 left-8 flex items-center justify-center">
                <div className="w-1 h-1 bg-nobel-gold rounded-full"></div>
             </div>
        </div>

        {/* Pilus Bridge */}
        <motion.div 
            className="absolute h-2 bg-stone-300 origin-left"
            style={{ left: 'calc(50% - 20px)', width: '40px' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
        />

        {/* Transferring Plasmid Copy */}
         {step >= 2 && (
            <motion.div 
                className="absolute w-4 h-4 rounded-full border-2 border-nobel-gold bg-white z-10"
                initial={{ left: '35%' }}
                animate={{ left: step === 2 ? '50%' : '65%' }}
                transition={{ duration: 1 }}
            />
         )}

        {/* Recipient Cell F- */}
        <div className={`relative w-24 h-32 rounded-full border-2 flex flex-col items-center justify-center transition-colors duration-1000 ${step === 3 ? 'bg-green-50 border-green-300' : 'bg-stone-50 border-stone-300'}`}>
             <span className="absolute -top-6 text-xs font-bold text-stone-500">Recipient ({step === 3 ? 'F+' : 'F-'})</span>
             {/* Chromosome */}
             <div className="w-16 h-16 border border-stone-300 opacity-30 rounded-full absolute"></div>
             
             {/* Received Plasmid */}
             <motion.div 
                className="w-8 h-8 rounded-full border-2 border-nobel-gold absolute top-8 left-8 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: step === 3 ? 1 : 0, scale: step === 3 ? 1 : 0 }}
             >
             </motion.div>
        </div>

      </div>

      <div className="flex gap-2">
          {['Contact', 'Pilus Formation', 'Transfer', 'Complete'].map((label, s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                 <div className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-12 bg-nobel-gold' : 'w-4 bg-stone-300'}`}></div>
                 {step === s && <span className="text-[10px] uppercase font-bold text-stone-500">{label}</span>}
              </div>
          ))}
      </div>
    </div>
  );
};

// --- RECOMBINANT DNA DIAGRAM ---
export const RecombinantDNADiagram: React.FC = () => {
    const [phase, setPhase] = useState(0); // 0: Vector, 1: Cut, 2: Insert, 3: Ligate, 4: Host

    const phases = [
        { title: "Vector Prep", desc: "Plasmid vector and Target Gene are isolated." },
        { title: "Restriction", desc: "Endonuclease cuts plasmid at specific site." },
        { title: "Annealing", desc: "Target gene pairs with plasmid sticky ends." },
        { title: "Ligation", desc: "DNA Ligase seals the gaps. Recombinant DNA formed." },
        { title: "Transformation", desc: "Vector introduced to Host (E. coli) for amplification." }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">Recombinant DNA Technology</h3>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                    Genetic Engineering allows the isolation and joining of genes from different species (e.g., Bacteria + Human Insulin Gene).
                </p>
                
                <div className="space-y-3">
                    {phases.map((p, i) => (
                        <button 
                            key={i}
                            onClick={() => setPhase(i)}
                            className={`w-full text-left p-3 rounded text-sm transition-all flex items-center justify-between ${phase === i ? 'bg-stone-800 border-l-4 border-nobel-gold text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                        >
                            <span><span className="font-mono text-xs opacity-50 mr-2">0{i+1}.</span>{p.title}</span>
                            {phase === i && <ArrowRight size={14} />}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="relative w-72 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex items-center justify-center overflow-hidden">
                {/* Visual Logic based on Phase */}
                <div className="relative w-40 h-40">
                    
                    {/* Plasmid Circle */}
                    <motion.svg 
                        viewBox="0 0 100 100" 
                        className="w-full h-full absolute inset-0"
                        animate={{ rotate: phase === 4 ? 360 : 0 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        {/* The Plasmid Ring */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2A9D8F" strokeWidth="6" strokeOpacity={phase >= 1 ? 0.3 : 1} />
                        
                        {/* The 'Cut' open ring */}
                        {phase >= 1 && (
                            <path d="M 50 10 A 40 40 0 1 1 55 10.5" fill="none" stroke="#2A9D8F" strokeWidth="6" strokeLinecap="round" />
                        )}

                        {/* The Insert Gene */}
                        <motion.path 
                            d="M 50 10 A 40 40 0 0 1 85 28" 
                            fill="none" 
                            stroke="#E76F51" 
                            strokeWidth="8" 
                            strokeLinecap="round"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: phase >= 2 ? 1 : 0, pathLength: phase >= 2 ? 1 : 0 }}
                        />
                    </motion.svg>
                    
                    {/* Icons/Particles overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            {phase === 1 && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Scissors className="text-stone-400" size={32} />
                                </motion.div>
                            )}
                            {phase === 2 && (
                                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                                    <GitMerge className="text-stone-400" size={32} />
                                </motion.div>
                            )}
                            {phase === 3 && (
                                <motion.div initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                    <Zap className="text-nobel-gold" fill="currentColor" size={32} />
                                </motion.div>
                            )}
                             {phase === 4 && (
                                <motion.div className="flex flex-col items-center">
                                    <span className="text-xs font-mono text-stone-500">E. COLI HOST</span>
                                    <Copy className="text-stone-400 mt-1" size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Host Cell Container for Phase 4 */}
                {phase === 4 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-stone-500"
                    />
                )}
            </div>
            
            <div className="absolute bottom-6 left-8 right-8 text-xs text-stone-400 text-center font-mono">
                {phases[phase].desc}
            </div>
        </div>
    )
}
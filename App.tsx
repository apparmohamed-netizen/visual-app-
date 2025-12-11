
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { MutationDiagram, GeneTransferDiagram, RecombinantDNADiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, Dna } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">G</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              GENETICS <span className="font-normal text-stone-500">RESEARCH</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Variation</a>
            <a href="#transfer" onClick={scrollToSection('transfer')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Transfer</a>
            <a href="#recombinant" onClick={scrollToSection('recombinant')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Recombinant DNA</a>
            <a href="#pioneers" onClick={scrollToSection('pioneers')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Pioneers</a>
            <span className="px-5 py-2 bg-stone-900 text-white rounded-full text-xs cursor-default">
              v1.0
            </span>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Variation</a>
            <a href="#transfer" onClick={scrollToSection('transfer')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Transfer</a>
            <a href="#recombinant" onClick={scrollToSection('recombinant')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Recombinant DNA</a>
            <a href="#pioneers" onClick={scrollToSection('pioneers')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Pioneers</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Microbiology & Genetics
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Bacterial <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Variation & Recombination</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Exploring the mechanisms of heredity, mutation, and gene transfer that drive microbial evolution.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>START LEARNING</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction: Phenotypic vs Genotypic */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Fundamentals</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Types of Variation</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              <p className="text-stone-600 mb-4">
                  Bacterial populations change via two main pathways. Understanding the distinction is crucial for genetics.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                  <h3 className="font-serif text-2xl mb-2 text-stone-800">Phenotypic Variation</h3>
                  <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-1 rounded">Reversible</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-200 px-2 py-1 rounded">Non-Heritable</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                      Induced by the environment. Examples include the loss of flagella due to phenol exposure or the transition from smooth to rough colonies.
                  </p>
               </div>
               <div className="bg-stone-900 p-6 rounded-lg text-white">
                  <h3 className="font-serif text-2xl mb-2 text-white">Genotypic Variation</h3>
                   <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase bg-stone-700 px-2 py-1 rounded">Irreversible</span>
                      <span className="text-[10px] font-bold uppercase bg-stone-700 px-2 py-1 rounded">Heritable</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                      Caused by changes in the genome sequence. Driven by Mutation and Gene Transfer.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* Section: Mutation */}
        <section id="mutation" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                           MECHANISMS I
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Spontaneous Mutation</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           Mutations are alterations in the nucleotide sequence. They occur spontaneously (1 in 10<sup>10</sup>) or can be induced by physical agents like UV light.
                        </p>
                        <ul className="space-y-4 text-stone-600">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-nobel-gold mt-2"></span>
                                <span><strong>Base Substitution:</strong> Transition (Purine↔Purine) or Transversion (Purine↔Pyrimidine).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-nobel-gold mt-2"></span>
                                <span><strong>Frame Shift:</strong> Caused by Insertion (transposons) or Deletion of base pairs.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <MutationDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Section: Gene Transfer */}
        <section id="transfer" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-green-900 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <GeneTransferDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            MECHANISMS II
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Intercellular Transfer</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Bacteria can exchange DNA through three primary methods, driving evolution and antibiotic resistance.
                        </p>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-serif text-xl mb-1">Transformation</h4>
                                <p className="text-sm text-stone-400">Uptake of naked DNA from the environment (e.g., from dying cells).</p>
                            </div>
                            <div>
                                <h4 className="text-white font-serif text-xl mb-1">Transduction</h4>
                                <p className="text-sm text-stone-400">Bacteriophage-mediated transfer. Can be Generalized (random fragments) or Specialized (specific genes adjacent to viral integration).</p>
                            </div>
                            <div>
                                <h4 className="text-white font-serif text-xl mb-1">Conjugation</h4>
                                <p className="text-sm text-stone-400">Direct transfer via Sex Pilus (F-plasmid). Donor (F+) attaches to Recipient (F-) and transfers a single strand of DNA.</p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Recombinant DNA */}
        <section id="recombinant" className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Genetic Engineering</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        Using restriction endonucleases (like EcoRI) and ligases to cut and paste genes into vectors (Plasmids, Cosmids, Bacteriophages). This technology enables the mass production of Insulin, Interferons, and Vaccines.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <RecombinantDNADiagram />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-2">Vectors</h4>
                        <p className="text-sm text-stone-600">Foreign DNA carriers. Plasmids (small, circular) and Cosmids (hybrid plasmid+phage) are essential for transport.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-2">Restriction Enzymes</h4>
                        <p className="text-sm text-stone-600">"Molecular Scissors" that cut DNA at specific base sequences (e.g., GAATTC for EcoRI), creating sticky ends.</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-2">Applications</h4>
                        <p className="text-sm text-stone-600">From diagnostic probes for difficult pathogens (M. leprae) to Gene Therapy using retroviral vectors.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Interactive Scene Break */}
        <section id="visual" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">
                            Visualized: Plasmid Vector with Gene Insert
                        </div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">THE PLASMID</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Extrachromosomal DNA</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Plasmids are small, circular dsDNA molecules that replicate autonomously. They are dispensable for survival but confer critical new properties.
                    </p>
                    <ul className="space-y-4 mb-8">
                         <li className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-700 font-bold">R</div>
                            <div>
                                <h5 className="font-bold text-stone-800">R-Factors</h5>
                                <p className="text-sm text-stone-500">Carry antibiotic resistance genes. Spread rapidly causing MDR strains.</p>
                            </div>
                         </li>
                         <li className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-700 font-bold">V</div>
                            <div>
                                <h5 className="font-bold text-stone-800">Virulence</h5>
                                <p className="text-sm text-stone-500">Encode toxins (E. coli enterotoxin) or adhesion factors (Fimbriae).</p>
                            </div>
                         </li>
                    </ul>
                </div>
             </div>
        </section>

        {/* Pioneers/Authors */}
        <section id="pioneers" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">HISTORY</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Pioneers of Bacterial Genetics</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">The foundational discoveries that enabled modern biotechnology.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="Frederick Griffith" 
                        role="Transformation (1928)" 
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Avery, MacLeod, McCarty" 
                        role="DNA as Genetic Material (1944)" 
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Joshua Lederberg" 
                        role="Conjugation & Transduction" 
                        delay="0.2s" 
                    />
                    <AuthorCard 
                        name="Edward Tatum" 
                        role="Conjugation Co-discoverer" 
                        delay="0.3s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Genetics Research</div>
                <p className="text-sm">Visualizing the microscopic mechanisms of life.</p>
            </div>
            <div className="flex items-center gap-2">
                 <Dna size={24} className="text-nobel-gold" />
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            Educational visualization based on standard microbiology curriculum.
        </div>
      </footer>
    </div>
  );
};

export default App;

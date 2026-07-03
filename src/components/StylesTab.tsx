import React from 'react';
import { styleCategories } from '../data/styles';
import { motion } from 'motion/react';

const renderStylePreview = (styleId: string) => {
  switch (styleId) {
    case 'classic-minimalism':
      return <div className="w-full h-full p-4 flex flex-col gap-2 bg-white"><div className="w-1/2 h-2 bg-gray-200"></div><div className="w-3/4 h-2 bg-gray-100"></div><div className="w-1/4 h-6 bg-gray-900 mt-auto"></div></div>;
    case 'hyper-minimalism':
      return <div className="w-full h-full p-4 flex items-center justify-center bg-white"><span className="text-[8px] tracking-widest uppercase text-gray-400">content</span></div>;
    case 'bento-grid':
      return <div className="w-full h-full p-3 grid grid-cols-2 grid-rows-2 gap-2 bg-gray-100"><div className="bg-white rounded-md shadow-sm"></div><div className="bg-white rounded-md shadow-sm"></div><div className="bg-white rounded-md shadow-sm col-span-2"></div></div>;
    case 'flat-design':
      return <div className="w-full h-full flex"><div className="w-1/3 bg-blue-500"></div><div className="w-2/3 bg-gray-100 p-4"><div className="w-8 h-8 rounded-full bg-red-400"></div></div></div>;
    case 'pure-brutalism':
      return <div className="w-full h-full p-4 bg-white border-4 border-black flex flex-col justify-between"><h1 className="text-xl font-bold text-blue-600 underline">LINKS</h1><div className="w-full h-4 bg-red-600"></div></div>;
    case 'neobrutalism':
      return <div className="w-full h-full p-4 bg-yellow-300 flex items-center justify-center"><div className="w-20 h-10 bg-pink-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div></div>;
    case 'acid-graphic':
      return <div className="w-full h-full p-4 bg-black overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-purple-600 opacity-80 mix-blend-color-dodge"></div><div className="w-16 h-16 rounded-full border-4 border-pink-500 blur-sm absolute -top-4 -left-4"></div><div className="text-lime-300 font-mono absolute bottom-2 right-2 text-xs">ACID</div></div>;
    case 'classic-skeuomorphism':
      return <div className="w-full h-full p-4 bg-[#e5e5e5] flex items-center justify-center"><div className="w-16 h-8 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-400 shadow-inner flex items-center p-1"><div className="w-6 h-6 rounded-full bg-gradient-to-b from-white to-gray-200 shadow-md"></div></div></div>;
    case 'neumorphism':
      return <div className="w-full h-full p-4 bg-[#e0e5ec] flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-[#e0e5ec] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff]"></div></div>;
    case 'glassmorphism':
      return <div className="w-full h-full p-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden"><div className="absolute w-20 h-20 rounded-full bg-pink-400 blur-xl top-0 left-0"></div><div className="z-10 w-24 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg"></div></div>;
    case 'claymorphism':
      return <div className="w-full h-full p-4 bg-[#f0f4f8] flex items-center justify-center"><div className="w-20 h-12 rounded-2xl bg-blue-400 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),6px_6px_12px_rgba(0,0,0,0.1)]"></div></div>;
    case 'editorial-magazine':
      return <div className="w-full h-full p-4 bg-[#F9F7F2] flex flex-col"><div className="w-full h-px bg-black/20 mb-2"></div><div className="font-serif text-lg italic leading-none mb-2">Title</div><div className="flex gap-2"><div className="w-1/2 h-12 bg-black/10"></div><div className="w-1/2 flex flex-col gap-1"><div className="h-1 bg-black/20"></div><div className="h-1 bg-black/20"></div><div className="h-1 w-2/3 bg-black/20"></div></div></div></div>;
    case 'vintage-retro':
      return <div className="w-full h-full p-4 bg-[#f4ebd0] flex items-center justify-center opacity-90 sepia-[.3]"><div className="w-20 h-20 rounded-full border-2 border-dashed border-[#8c3a3a] flex items-center justify-center p-2"><div className="w-full h-full border border-[#8c3a3a] rounded-full flex items-center justify-center"><div className="w-6 h-1 bg-[#4a5e4b]"></div></div></div></div>;
    case 'y2k':
      return <div className="w-full h-full p-4 bg-blue-900 flex flex-col items-center justify-center relative overflow-hidden"><div className="text-[10px] text-cyan-400 font-mono mb-2 shadow-cyan-400/50 drop-shadow-md z-10">W E L C O M E</div><div className="w-24 h-4 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full border border-white/50 z-10"></div><div className="absolute w-32 h-32 border-4 border-pink-500 rounded-full -bottom-10 -right-10 opacity-50 blur-sm"></div></div>;
    case 'hand-drawn':
      return <div className="w-full h-full p-4 bg-white flex items-center justify-center"><div className="w-16 h-12 border-2 border-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] flex items-center justify-center"><div className="w-6 h-1 bg-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] transform rotate-3"></div></div></div>;
    case 'corporate-memphis':
      return <div className="w-full h-full p-4 bg-blue-50 flex items-center justify-center relative overflow-hidden"><div className="w-12 h-12 rounded-full bg-yellow-400 absolute left-2 top-2"></div><div className="w-16 h-8 bg-green-500 rounded-full transform rotate-12 absolute right-2 bottom-4"></div><div className="w-8 h-8 bg-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div></div>;
    default:
      return <div className="w-12 h-px bg-[#1A1A1A] opacity-20"></div>;
  }
};

import { AppState } from '../types';
import { defaultPalettes } from '../data/palettes';
import { Check, Sparkles, ArrowRight, ArrowLeft, Palette } from 'lucide-react';

interface StylesTabProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  setActiveTab: (tab: 'styles' | 'questions' | 'builder') => void;
}

// Maps style IDs to their ideal matching palette names from palettes.ts
const PALETTE_MAPPING: Record<string, string> = {
  'classic-minimalism': 'Modern Minimal',
  'hyper-minimalism': 'Monochrome',
  'bento-grid': 'Modern Minimal',
  'flat-design': 'Vibrant Playful',
  'pure-brutalism': 'Monochrome',
  'neobrutalism': 'Neobrutalism',
  'acid-graphic': 'Cyberpunk Neon',
  'classic-skeuomorphism': 'Modern Minimal',
  'neumorphism': 'Sage Serene',
  'glassmorphism': 'Modern Minimal',
  'claymorphism': 'Vibrant Playful',
  'editorial-magazine': 'Sunset Editorial',
  'vintage-retro': 'Earthy Warm',
  'y2k': 'Cyberpunk Neon',
  'hand-drawn': 'Monochrome',
  'corporate-memphis': 'Vibrant Playful',
};

// Simple search/keyword matching algorithm
export function getRecommendedStyles(answers: Record<string, string>): { id: string; score: number; matchReason: string }[] {
  const recommendations: { id: string; score: number; matchReason: string }[] = [];
  
  const styleKeywords: { id: string; keywords: string[]; reason: string }[] = [
    {
      id: "classic-minimalism",
      keywords: ["minimale", "minimal", "pulit", "spazio", "white space", "bianco", "semplic", "essenzial", "ordine", "clean", "minimalist"],
      reason: "Matched keywords for minimalism, ample whitespace, or clean visual structure."
    },
    {
      id: "hyper-minimalism",
      keywords: ["iper", "invisibile", "estrem", "solo testo", "text", "less is more", "niente", "hyper", "extreme"],
      reason: "Matched preferences for extreme component reduction or text-first layouts."
    },
    {
      id: "bento-grid",
      keywords: ["bento", "griglia", "grid", "scomparti", "dashboard", "apple", "scatole", "organizz", "box", "structured"],
      reason: "Matched references to organized dashboard boxes or structured compartmental layouts."
    },
    {
      id: "flat-design",
      keywords: ["flat", "piatto", "2d", "senza ombre", "semplice", "vettorial", "vector"],
      reason: "Matched flat visual styling preference with solid colors and no depth."
    },
    {
      id: "pure-brutalism",
      keywords: ["brutal", "grezzo", "nudo", "anti-design", "html", "contrast", "forte", "scomod", "ribell", "provoc", "raw", "aggressive"],
      reason: "Matched themes emphasizing raw structures, heavy contrasts, or deliberate anti-design."
    },
    {
      id: "neobrutalism",
      keywords: ["neobrutal", "tratti neri", "pastello", "neon", "ombre nette", "thick", "bold", "fumetto", "comic", "borders"],
      reason: "Matched neobrutalist markers like thick black borders, flat drop-shadows, or comic vibes."
    },
    {
      id: "acid-graphic",
      keywords: ["acid", "tecnologico", "psichedelic", "gradiente", "liquido", "metal", "cyber", "futur", "neon", "gradient", "metallic", "trippy", "extreme"],
      reason: "Matched cyberpunk, iridescent metallics, neon/psychedelic gradients, or sensory massiveness."
    },
    {
      id: "classic-skeuomorphism",
      keywords: ["real", "reale", "material", "pelle", "metallo", "trama", "texture", "fisic", "smussat", "3d", "realistic", "skeuo"],
      reason: "Matched replicas of physical world elements, realistic smudged glass, or physical buttons."
    },
    {
      id: "neumorphism",
      keywords: ["neumorf", "soft", "morbido", "plastica", "shadows", "argilla", "estrus", "soft ui", "plastic", "molded"],
      reason: "Matched extruded plastic look, soft inset borders, or neumorphic clay-like surfaces."
    },
    {
      id: "glassmorphism",
      keywords: ["vetro", "glass", "satinat", "trasparente", "sfocato", "blur", "livelli", "frosted", "overlay"],
      reason: "Matched frosted glass overlays, depth blurring, or semi-transparency styles."
    },
    {
      id: "claymorphism",
      keywords: ["clay", "plastilina", "morbido", "3d", "volume", "colorato", "clayish", "rounded"],
      reason: "Matched references to soft, playful 3D shapes or squishy plasticine elements."
    },
    {
      id: "editorial-magazine",
      keywords: ["editoriale", "magazine", "rivista", "luxury", "lusso", "serif", "grazie", "elegante", "alta moda", "stampa", "fashion", "traditional"],
      reason: "Matched elegant serif fonts, luxury/high fashion grid ratios, or editorial paper print feel."
    },
    {
      id: "vintage-retro",
      keywords: ["vintage", "retro", "retrò", "70", "mid-century", "crema", "desaturato", "caldo", "terra", "grana", "rumore", "vecchio", "storia", "old-school", "analog"],
      reason: "Matched desaturated warm undertones, analog paper grain, or historic mid-century references."
    },
    {
      id: "y2k",
      keywords: ["y2k", "cyber", "2000", "90", "matrix", "pixel", "lo-fi", "cromo", "web", "iridescente", "retro-future"],
      reason: "Matched lo-fi cyber matrix patterns, pixel art grids, chrome, or iridescent aesthetics of the year 2000."
    },
    {
      id: "hand-drawn",
      keywords: ["disegnato", "mano", "doodle", "schizz", "imperfett", "organico", "stencil", "penna", "matita", "playful", "sketchy"],
      reason: "Matched organic pencil sketches, playful doodles, or handcrafted visual elements."
    },
    {
      id: "corporate-memphis",
      keywords: ["memphis", "vettorial", "illustrazion", "character", "geometrico", "colorato", "flat art", "corporate"],
      reason: "Matched geometric vector characters, friendly corporate illustrations, or bold color intersections."
    }
  ];

  const textBlob = Object.values(answers).join(" ").toLowerCase();
  if (!textBlob.trim()) return [];

  styleKeywords.forEach(style => {
    let score = 0;
    style.keywords.forEach(kw => {
      const regex = new RegExp(kw, 'gi');
      const matches = textBlob.match(regex);
      if (matches) {
        score += matches.length * 2;
      }
    });

    if (score > 0) {
      recommendations.push({
        id: style.id,
        score,
        matchReason: style.reason
      });
    }
  });

  return recommendations.sort((a, b) => b.score - a.score);
}

export default function StylesTab({ state, updateState, setActiveTab }: StylesTabProps) {
  const recommendations = getRecommendedStyles(state.answers || {});
  const topRecommendedIds = recommendations.slice(0, 3).map(r => r.id);

  const handleSelectStyle = (styleId: string) => {
    const paletteName = PALETTE_MAPPING[styleId] || 'Modern Minimal';
    const foundPalette = defaultPalettes.find(p => p.name === paletteName) || defaultPalettes[0];
    
    updateState({ 
      selectedStyle: styleId,
      palette: foundPalette
    });
  };

  const getStyleName = (id: string) => {
    for (const cat of styleCategories) {
      const sub = cat.substyles.find(s => s.id === id);
      if (sub) return sub.name;
    }
    return id;
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="w-12 h-px bg-[#1A1A1A] mx-auto mb-8"></div>
        <h1 className="text-5xl font-serif leading-tight mb-6">Visual <span className="italic text-[#E07A5F]">Aesthetics</span> & References</h1>
        <p className="text-sm leading-relaxed opacity-60 uppercase tracking-widest">
          Choose a visual foundation. Based on your Discovery answers, we suggest matching layouts and curated palettes.
        </p>
      </div>

      {/* Dynamic Recommendation Banner */}
      {recommendations.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#E07A5F] p-6 max-w-4xl mx-auto shadow-md flex flex-col md:flex-row items-center gap-6"
        >
          <div className="bg-[#E07A5F]/10 p-3 rounded-full text-[#E07A5F] shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#E07A5F]">Discovery-Based Aesthetic Match</h4>
            <p className="text-sm font-serif">
              Based on your unique brand profile, your primary visual matches are <strong className="font-sans font-bold underline decoration-[#E07A5F]">{getStyleName(topRecommendedIds[0])}</strong>
              {topRecommendedIds[1] && <>, <strong className="font-sans font-bold underline decoration-[#E07A5F]">{getStyleName(topRecommendedIds[1])}</strong></>}
              {topRecommendedIds[2] && <> and <strong className="font-sans font-bold underline decoration-[#E07A5F]">{getStyleName(topRecommendedIds[2])}</strong></>}.
            </p>
            <p className="text-xs opacity-60">
              {recommendations[0].matchReason} Click any recommendation below to apply its structures and a curated color palette.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="border border-dashed border-[#1A1A1A]/20 p-6 max-w-xl mx-auto text-center rounded bg-white/40">
          <p className="text-xs opacity-60">
            💡 Want personalized suggestions? Complete the <strong>Discovery Questionnaire</strong> first to trigger our aesthetic alignment engine!
          </p>
        </div>
      )}

      {/* Selected Style Floating/Alert Bar */}
      <div className="sticky top-16 z-40 bg-[#F9F7F2]/90 backdrop-blur-md border-y border-[#1A1A1A]/10 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 max-w-4xl mx-auto shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-800">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-50 font-bold">Selected Foundation</div>
            <div className="text-sm font-bold uppercase tracking-wider">{getStyleName(state.selectedStyle)}</div>
          </div>
        </div>

        {/* Curated Palette Quick Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#1A1A1A]/10 text-[10px] tracking-wider uppercase">
            <Palette className="w-3.5 h-3.5" />
            <span>Curated Palette: {state.palette.name}</span>
            <div className="flex items-center gap-1.5 ml-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: state.palette.primary }} />
              <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: state.palette.background }} />
              <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: state.palette.text }} />
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTab('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 text-[10px] uppercase tracking-widest font-extrabold hover:bg-black transition-colors"
          >
            <span>Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-16">
        {styleCategories.map((category, idx) => (
          <motion.div 
            key={category.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-t border-[#1A1A1A]/10 pt-12"
          >
            <div className="mb-8">
              <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-40">{category.title}</h3>
              <p className="text-sm opacity-80 max-w-2xl font-serif italic">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.substyles.map((style) => {
                const isSelected = state.selectedStyle === style.id;
                const isRecommended = topRecommendedIds.includes(style.id);
                
                return (
                  <div 
                    key={style.id} 
                    onClick={() => handleSelectStyle(style.id)}
                    className={`bg-white border relative p-6 group transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/20 shadow-xl scale-[1.01]' 
                        : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:shadow-md'
                    }`}
                  >
                    {/* Recommended Tag */}
                    {isRecommended && (
                      <span className="absolute -top-3 left-4 bg-[#E07A5F] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Recommended Match</span>
                      </span>
                    )}

                    {/* Check badge when active */}
                    {isSelected && (
                      <span className="absolute -top-3 right-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-sm">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active Foundation</span>
                      </span>
                    )}

                    <div>
                      <div className="h-40 bg-[#F3F1ED] mb-6 flex items-center justify-center overflow-hidden relative">
                        {renderStylePreview(style.id)}
                      </div>
                      <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        {style.name}
                      </h3>
                      <p className="text-xs opacity-60 leading-relaxed font-serif italic mb-6">{style.description}</p>
                    </div>

                    <div className="pt-4 border-t border-[#1A1A1A]/5 flex items-center justify-between mt-auto">
                      <span className="text-[9px] font-mono tracking-wider uppercase opacity-40">
                        Curated Palette: {PALETTE_MAPPING[style.id] || 'Modern Minimal'}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-[#E07A5F]' : 'opacity-40 group-hover:opacity-100 transition-opacity'}`}>
                        {isSelected ? 'Selected' : 'Select Style →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Back and Next navigation flows */}
      <div className="pt-12 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <button
          onClick={() => {
            setActiveTab('questions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery Questionnaire</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('builder');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1A1A1A] text-white hover:bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
        >
          <span>Open Simulator & Build Preview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

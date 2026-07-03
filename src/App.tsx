/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, Palette, FileText, Download } from 'lucide-react';
import { AppState, Palette as PaletteType, CanvasComponent } from './types';
import { defaultPalettes } from './data/palettes';
import StylesTab from './components/StylesTab';
import QuestionnaireTab from './components/QuestionnaireTab';
import BuilderTab from './components/BuilderTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'styles' | 'questions' | 'builder'>('questions');
  const [appState, setAppState] = useState<AppState>({
    brandName: 'LUMINA',
    siteName: 'Draft_01',
    palette: defaultPalettes[0],
    components: [],
    selectedStyle: 'editorial-magazine',
    answers: {},
  });

  const updateState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans flex flex-col overflow-hidden">
      <header className="bg-white border-b border-[#1A1A1A]/10 sticky top-0 z-50 h-16 flex items-center shrink-0 px-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-[0.25em] text-[#1A1A1A] uppercase">VisionBuilder</span>
          </div>
          <div className="h-4 w-px bg-[#1A1A1A]/10 hidden md:block"></div>
          
          {/* Sequential Step Indicator Navigation */}
          <nav className="flex items-center gap-1.5 ml-2 md:ml-4">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-2 text-[10px] md:text-[11px] uppercase tracking-widest transition-all border flex items-center gap-2 ${
                activeTab === 'questions' 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold' 
                  : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/10'
              }`}
            >
              <span className="opacity-40 font-mono text-[9px]">01</span> Discovery
            </button>
            
            <span className="text-[#1A1A1A]/20 text-[10px] hidden sm:inline">→</span>
            
            <button
              onClick={() => setActiveTab('styles')}
              className={`px-3 py-2 text-[10px] md:text-[11px] uppercase tracking-widest transition-all border flex items-center gap-2 ${
                activeTab === 'styles' 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold' 
                  : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/10'
              }`}
            >
              <span className="opacity-40 font-mono text-[9px]">02</span> Pick Style
            </button>
            
            <span className="text-[#1A1A1A]/20 text-[10px] hidden sm:inline">→</span>
            
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-2 text-[10px] md:text-[11px] uppercase tracking-widest transition-all border flex items-center gap-2 ${
                activeTab === 'builder' 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold' 
                  : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/10'
              }`}
            >
              <span className="opacity-40 font-mono text-[9px]">03</span> Simulator
            </button>
          </nav>
        </div>

        {/* Brand visual tag in header */}
        <div className="hidden lg:flex items-center gap-2.5 bg-[#FAF9F5] px-4 py-2 border border-[#1A1A1A]/5 rounded-sm">
          <span className="text-[9px] font-mono tracking-wider opacity-50 uppercase">Active Workspace:</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F]">{appState.brandName}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'questions' && <div className="h-full overflow-y-auto bg-[#F9F7F2]"><QuestionnaireTab state={appState} updateState={updateState} setActiveTab={setActiveTab} /></div>}
        {activeTab === 'styles' && <div className="h-full overflow-y-auto bg-[#F9F7F2]"><StylesTab state={appState} updateState={updateState} setActiveTab={setActiveTab} /></div>}
        {activeTab === 'builder' && <BuilderTab state={appState} updateState={updateState} />}
      </main>
    </div>
  );
}


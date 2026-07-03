import React, { useState } from 'react';
import { questionnaire } from '../data/questions';
import { motion } from 'motion/react';
import { Save, CheckCircle, ArrowRight } from 'lucide-react';
import { AppState } from '../types';

interface QuestionnaireTabProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  setActiveTab: (tab: 'styles' | 'questions' | 'builder') => void;
}

export default function QuestionnaireTab({ state, updateState, setActiveTab }: QuestionnaireTabProps) {
  const answers = state.answers || {};
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAnswerChange = (qId: string, value: string) => {
    updateState({
      answers: {
        ...answers,
        [qId]: value,
      }
    });
  };

  // Calculate questionnaire completion rate
  const totalQuestions = questionnaire.reduce((sum, sec) => sum + sec.questions.length, 0);
  const answeredCount = Object.values(answers).filter(val => val.trim().length > 0).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="w-12 h-px bg-[#1A1A1A] mb-8"></div>
          <h1 className="text-5xl font-serif leading-tight mb-4">Discovery <span className="italic text-[#E07A5F]">Questionnaire</span></h1>
          <p className="text-sm leading-relaxed opacity-60 uppercase tracking-widest">
            Shape the narrative of your brand. Your answers will generate custom design suggestions.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-1">Progress</div>
            <div className="text-xs font-mono font-bold">{answeredCount}/{totalQuestions} Answered ({progressPercent}%)</div>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-black transition-colors"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved' : 'Save Answers'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1A1A1A]/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#E07A5F]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-12">
        {questionnaire.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-t border-[#1A1A1A]/10 pt-8"
          >
            <h3 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">
              {section.title}
            </h3>
            <div className="space-y-8">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <label htmlFor={q.id} className="block text-sm font-bold mb-2">
                    {q.text}
                  </label>
                  {q.hint && (
                    <p className="text-xs opacity-60 mb-3 font-serif italic">{q.hint}</p>
                  )}
                  <textarea
                    id={q.id}
                    rows={3}
                    className="w-full bg-white border border-[#1A1A1A]/20 p-4 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors resize-y"
                    placeholder="Write your answer here..."
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sleek CTA Button to flow into Styles selection */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-12 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-center gap-6"
      >
        <div className="text-left">
          <h4 className="font-serif italic text-lg text-[#1A1A1A]">Finished answering?</h4>
          <p className="text-xs opacity-60">We will reflect your choices to match you with ideal visual styles next.</p>
        </div>
        <button
          onClick={() => {
            handleSave();
            setActiveTab('styles');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#E07A5F] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#c95d42] transition-colors shadow-lg shadow-[#E07A5F]/10"
        >
          <span>Continue to Choose Style</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

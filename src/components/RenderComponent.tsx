import React, { useState } from 'react';
import { AppState, CanvasComponent } from '../types';
import { motion } from 'motion/react';
import { Star, ShoppingCart, ArrowRight, Check, Sparkles, Calendar, Award, Compass, Hammer, Shield, Sliders, Eye, Sparkle } from 'lucide-react';

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Signature Series Alpha',
    price: '$189',
    originalPrice: '$249',
    rating: 4.8,
    reviews: 142,
    badge: 'Best Seller',
    description: 'Experience ultimate efficiency and performance designed to elevate your daily operational routine.',
    images: [
      'https://picsum.photos/600/600?random=101',
      'https://picsum.photos/600/600?random=102',
      'https://picsum.photos/600/600?random=103',
    ],
    colors: [
      { name: 'Cosmic Slate', value: '#121212' },
      { name: 'Platinum Mist', value: '#94A3B8' },
      { name: 'Deep Indigo', value: '#1E3A8A' },
    ],
    features: ['High Performance', 'Premium Materials', 'Certified Quality']
  },
  {
    id: 'prod-2',
    name: 'Signature Series Beta',
    price: '$299',
    originalPrice: '$349',
    rating: 4.9,
    reviews: 89,
    badge: 'New Launch',
    description: 'Engineered with absolute precision to deliver exceptional results and utility across any scenario.',
    images: [
      'https://picsum.photos/600/600?random=201',
      'https://picsum.photos/600/600?random=202',
      'https://picsum.photos/600/600?random=203',
    ],
    colors: [
      { name: 'Shadow Charcoal', value: '#334155' },
      { name: 'Alabaster Silk', value: '#F1F5F9' },
    ],
    features: ['Seamless Integration', 'Intuitive Controls', 'Enhanced Utility']
  },
  {
    id: 'prod-3',
    name: 'Signature Series Gamma',
    price: '$149',
    originalPrice: '$179',
    rating: 4.7,
    reviews: 215,
    badge: 'Limited Run',
    description: 'Meticulously optimized for tactile ergonomics, custom structural feedback, and long-term durability.',
    images: [
      'https://picsum.photos/600/600?random=301',
      'https://picsum.photos/600/600?random=302',
      'https://picsum.photos/600/600?random=303',
    ],
    colors: [
      { name: 'Core Onyx', value: '#1E293B' },
      { name: 'Aura Coral', value: '#DB2777' },
      { name: 'Classic Slate', value: '#64748B' },
    ],
    features: ['Tactile Feedback', 'Durable Build', 'Adaptive Layout']
  },
];

const ProductCard = ({ product, palette, cardStyle, buttonPrimaryStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const imageSrc = product.images[activeColorIdx % product.images.length];

  return (
    <div 
      className={`group relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-black/5 ${
        isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''
      }`}
      style={!isNeobrutalist ? cardStyle : {}}
    >
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span 
            className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-black/10 flex items-center gap-1 shadow-sm ${
              isNeobrutalist ? 'bg-amber-400 border-2 border-black font-black text-black' : 'bg-white/95 text-black'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            {product.badge}
          </span>
        </div>
      )}

      <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
        <img 
          src={imageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 fill-current ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <span className="opacity-50 text-[11px] font-semibold font-mono">({product.reviews})</span>
          </div>

          <h3 
            contentEditable 
            suppressContentEditableWarning 
            className="text-lg font-bold tracking-tight line-clamp-1" 
            style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
          >
            {brandName} {product.name}
          </h3>
          <p 
            contentEditable 
            suppressContentEditableWarning 
            className="text-xs opacity-60 line-clamp-2 leading-relaxed h-8"
            style={{ color: palette.text }}
          >
            {product.description}
          </p>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider opacity-40 font-bold">Colors:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color: any, idx: number) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setActiveColorIdx(idx)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    activeColorIdx === idx 
                      ? 'ring-2 ring-offset-2 scale-110' 
                      : 'hover:scale-105 border-black/10'
                  }`}
                  style={{ 
                    backgroundColor: color.value,
                    borderColor: activeColorIdx === idx ? palette.text : 'transparent',
                    boxShadow: activeColorIdx === idx ? `0 0 0 1px ${palette.text}40` : 'none'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[11px] opacity-40 line-through leading-none">{product.originalPrice}</span>
            <span className="text-lg font-black tracking-tight" style={{ color: palette.primary }}>{product.price}</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            style={buttonPrimaryStyle}
            className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-1.5 ${
              isAdded ? 'bg-emerald-600 text-white shadow-none border-emerald-600 scale-95' : 'hover:scale-102 active:scale-98'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductFocusShowcase = ({ palette, cardStyle, buttonPrimaryStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  const product = DEFAULT_PRODUCTS[0];
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSizeIdx, setActiveSizeIdx] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const currentImage = product.images[(activeColorIdx + activeImgIdx) % product.images.length];
  const sizes = ['Standard Edition', 'Professional Edition', 'Signature Edition'];

  return (
    <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
      <div className={`grid grid-cols-1 @4xl:grid-cols-2 gap-16 items-center p-8 @4xl:p-12 bg-white ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`} style={!isNeobrutalist ? cardStyle : {}}>
        <div className="space-y-6">
          <div 
            className={`relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center ${
              isNeobrutalist ? 'border-4 border-black' : ''
            }`}
            style={!isNeobrutalist ? cardStyle : {}}
          >
            <img 
              src={currentImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500 hover:scale-102"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 bg-black text-white rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImgIdx(i)}
                className={`w-20 aspect-square overflow-hidden bg-gray-50 border-2 transition-all ${
                  activeImgIdx === i 
                    ? 'border-black opacity-100 scale-102' 
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                }`}
                style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 block">FLAGSHIP EXPERIENCE</span>
            <h2 
              contentEditable 
              suppressContentEditableWarning 
              className="text-4xl font-extrabold tracking-tighter" 
              style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
            >
              {brandName} {product.name}
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold font-mono opacity-60">{product.rating} / 5.0 ({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 border-b border-black/5 pb-6">
            <span className="text-3xl font-black" style={{ color: palette.primary }}>{product.price}</span>
            <span className="text-lg opacity-40 line-through font-medium">{product.originalPrice}</span>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded ml-2">SAVE $60 TODAY</span>
          </div>

          <p 
            contentEditable 
            suppressContentEditableWarning 
            className="text-sm opacity-75 leading-relaxed"
            style={{ color: palette.text }}
          >
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest opacity-40 block">Selected Color: <strong className="text-black font-black opacity-100">{product.colors[activeColorIdx].name}</strong></span>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setActiveColorIdx(i);
                      setActiveImgIdx(0);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      activeColorIdx === i ? 'ring-2 ring-offset-2 scale-110' : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: c.value,
                      borderColor: activeColorIdx === i ? palette.text : 'transparent'
                    }}
                    title={c.name}
                  >
                    {activeColorIdx === i && <Check className={`w-4 h-4 ${c.name.includes('Mist') || c.name.includes('White') ? 'text-black' : 'text-white'}`} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest opacity-40 block">Select Edition:</span>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz, i) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setActiveSizeIdx(i)}
                    className={`px-4 py-2 text-xs font-bold border transition-all ${
                      activeSizeIdx === i 
                        ? 'bg-black text-white border-black shadow-sm' 
                        : 'bg-transparent border-black/10 text-black hover:border-black/40'
                    }`}
                    style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 bg-[#F8F9F9] p-6 border border-black/5" style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
            {product.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2.5 text-xs font-semibold text-gray-800">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={handleAddToCart}
              style={buttonPrimaryStyle}
              className={`flex-1 py-4 uppercase tracking-widest text-xs font-black transition-all flex items-center justify-center gap-2 ${
                isAdded ? 'bg-emerald-600 text-white shadow-none border-emerald-600 scale-95' : 'hover:scale-102 active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Successfully Added To Bag
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Secure Checkout - Add to Bag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductMinimalShowcase = ({ palette, cardStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  const [activeProdIdx, setActiveProdIdx] = useState(0);
  const activeProduct = DEFAULT_PRODUCTS[activeProdIdx];

  return (
    <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-2">LIMITED SELECTION</span>
        <h2 className={`text-4xl font-extrabold ${isEditorial ? 'font-serif italic' : 'tracking-tight'}`} style={{ color: palette.text }}>
          The Curated Collection
        </h2>
      </div>

      <div className="flex flex-col @4xl:flex-row gap-12 items-start">
        <div className="flex-1 w-full divide-y border-y border-black/5" style={{ borderColor: `${palette.text}10` }}>
          {DEFAULT_PRODUCTS.map((prod, idx) => (
            <div 
              key={prod.id}
              onClick={() => setActiveProdIdx(idx)}
              className={`py-6 flex items-center justify-between cursor-pointer transition-all ${
                activeProdIdx === idx ? 'opacity-100 scale-[1.01]' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold font-mono text-gray-400">0{idx + 1} /</span>
                  <h3 className="font-bold text-lg" style={{ color: palette.text }}>{brandName} {prod.name}</h3>
                </div>
                <p className="text-xs opacity-60 line-clamp-1 max-w-md">{prod.description}</p>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-black text-sm" style={{ color: palette.primary }}>{prod.price}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${activeProdIdx === idx ? 'bg-black' : 'bg-transparent border border-black/20'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 w-full">
          <motion.div 
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-8 bg-white ${isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''}`}
            style={!isNeobrutalist ? cardStyle : {}}
          >
            <div className={`aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-50 border relative ${isNeobrutalist ? 'border-2 border-black' : 'border-black/5'}`} style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
              <img src={activeProduct.images[0]} alt={activeProduct.name} className="w-full h-full object-cover" />
              {activeProduct.badge && (
                <span className="absolute top-3 left-3 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-black text-white">
                  {activeProduct.badge}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-extrabold text-xl" style={{ color: palette.text }}>{brandName} {activeProduct.name}</h3>
                <span className="text-xl font-black" style={{ color: palette.primary }}>{activeProduct.price}</span>
              </div>

              <p className="text-xs opacity-75 leading-relaxed">{activeProduct.description}</p>

              <div className="space-y-1.5 pt-2">
                {activeProduct.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 font-mono">Available and shipping immediately</span>
                <button 
                  type="button" 
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ color: palette.primary }}
                >
                  Configure Product <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   BRAND HISTORY SUB-COMPONENTS
   ========================================================================== */

const BRAND_MILESTONES = [
  {
    year: '2012',
    title: 'Strategic Inception',
    description: 'Our journey began with a single vision to establish a standard of excellence, crafting solutions designed to transcend expectations.'
  },
  {
    year: '2016',
    title: 'Strategic Expansion',
    description: 'Following rigorous development and key innovations, we reached new audiences, establishing our signature quality standards globally.'
  },
  {
    year: '2020',
    title: 'Sustainable Commitment',
    description: 'We committed to a fully carbon-neutral and highly efficient architecture, ensuring all creations are built for long-term endurance.'
  },
  {
    year: '2026',
    title: 'Modern Leadership',
    description: 'Now active in dozens of sectors, we remain deeply dedicated to our original core values: creating pristine systems that empower creativity.'
  }
];

export const BrandHistoryTimeline = ({ palette, cardStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  return (
    <div className="py-24 px-12 max-w-5xl mx-auto w-full">
      <div className="text-center mb-20">
        <span className="text-[10px] uppercase tracking-[0.25em] font-black opacity-40 block mb-3">OUR HERITAGE</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-4xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          Timeline of Innovation
        </h2>
        <div className="w-12 h-0.5 bg-black/10 mx-auto mt-4" style={{ backgroundColor: `${palette.primary}40` }} />
      </div>

      <div className="relative border-l-2 border-dashed pl-8 md:pl-12 ml-4 md:ml-32 space-y-16" style={{ borderColor: `${palette.primary}25` }}>
        {BRAND_MILESTONES.map((milestone) => (
          <div key={milestone.year} className="relative">
            {/* Timeline node */}
            <div 
              className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-transform hover:scale-125 ${
                isNeobrutalist ? 'border-2 border-black bg-yellow-400 shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : ''
              }`}
              style={!isNeobrutalist ? { borderColor: palette.primary, boxShadow: `0 0 0 4px ${palette.primary}15` } : {}}
            >
              <Calendar className="w-3 h-3 text-gray-500" style={!isNeobrutalist ? { color: palette.primary } : {}} />
            </div>

            {/* Left year tag (desktop only) */}
            <div className="hidden md:block absolute -left-[160px] top-1 text-right w-24">
              <span 
                className="text-2xl font-black tracking-tight" 
                style={{ color: palette.primary, fontFamily: 'var(--font-mono)' }}
              >
                {milestone.year}
              </span>
            </div>

            <div 
              className={`p-6 md:p-8 bg-white transition-all ${
                isNeobrutalist ? 'border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : 'border border-black/5 hover:border-black/10'
              }`}
              style={!isNeobrutalist ? cardStyle : {}}
            >
              <div className="md:hidden mb-2">
                <span className="text-sm font-black tracking-widest px-2.5 py-1 bg-gray-100 rounded-full" style={{ color: palette.primary, fontFamily: 'var(--font-mono)' }}>
                  {milestone.year}
                </span>
              </div>
              <h3 
                contentEditable 
                suppressContentEditableWarning
                className="text-xl font-bold tracking-tight mb-2" 
                style={{ color: palette.text }}
              >
                {milestone.title}
              </h3>
              <p 
                contentEditable 
                suppressContentEditableWarning
                className="text-sm opacity-70 leading-relaxed" 
                style={{ color: palette.text }}
              >
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BrandHistoryHeritage = ({ palette, cardStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  return (
    <div className="py-24 px-12 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-16 items-center">
        <div className="@4xl:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 block">THE STORY</span>
            <h2 
              contentEditable 
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-none" 
              style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
            >
              A Heritage of Pure Intent
            </h2>
          </div>

          <div className="border-l-4 pl-6 py-2 italic font-medium text-lg leading-relaxed text-gray-700" style={{ borderColor: palette.primary }}>
            “We measure our milestones in decades of dedication. Every creation reflects our uncompromising commitment to exceptional standards and enduring relevance.”
            <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 mt-3 font-mono">— Founder Statement</span>
          </div>

          <p 
            contentEditable 
            suppressContentEditableWarning
            className="text-sm opacity-75 leading-relaxed"
            style={{ color: palette.text }}
          >
            Our creative spaces represent a sanctuary of pristine focus. Each component is structured with absolute honesty, stripping away superficial noise to let the core visual and operational qualities shine effortlessly.
          </p>
        </div>

        <div className="@4xl:col-span-7 grid grid-cols-2 gap-6">
          <div className={`aspect-[4/5] bg-gray-100 overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''}`} style={!isNeobrutalist ? cardStyle : {}}>
            <img src="https://picsum.photos/600/800?random=88" alt="Handcrafted process" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-bold text-white/60 font-mono">STEP 01 / FORM</span>
                <p className="text-white font-extrabold text-sm mt-1">Precision Engineering</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`aspect-[4/3] bg-gray-100 overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''}`} style={!!isNeobrutalist ? {} : cardStyle}>
              <img src="https://picsum.photos/600/450?random=89" alt="Materials selection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-bold text-white/60 font-mono">STEP 02 / CALIBRATION</span>
                  <p className="text-white font-extrabold text-sm mt-1">Aesthetic Calibration</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-black/5 flex flex-col justify-center space-y-2 h-[calc(100%-12rem)]" style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
              <Award className="w-8 h-8 text-amber-500 mb-2" />
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">Excellence Certificate</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Recognized globally for setting the benchmark in professional design, efficiency, and structural elegance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BrandHistoryTimelineCompact = ({ palette, isEditorial, brandName }: any) => {
  return (
    <div className="py-16 px-12 max-w-4xl mx-auto w-full">
      <div className="mb-12">
        <span className="text-[9px] uppercase tracking-[0.25em] font-black opacity-40 block mb-1">CHRONICLE</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-2xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          {brandName} Chronicles
        </h2>
      </div>

      <div className="space-y-8 divide-y divide-black/5 animate-fade-in" style={{ borderColor: `${palette.text}10` }}>
        {BRAND_MILESTONES.map((milestone) => (
          <div key={milestone.year} className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-2">
              <span 
                className="text-xl font-black tracking-tighter" 
                style={{ color: palette.primary, fontFamily: 'var(--font-mono)' }}
              >
                {milestone.year}
              </span>
            </div>
            <div className="md:col-span-10 space-y-1">
              <h3 
                contentEditable 
                suppressContentEditableWarning
                className="font-bold text-base" 
                style={{ color: palette.text }}
              >
                {milestone.title}
              </h3>
              <p 
                contentEditable 
                suppressContentEditableWarning
                className="text-xs opacity-70 leading-relaxed max-w-2xl" 
                style={{ color: palette.text }}
              >
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BrandHistoryTimelineSimple = ({ palette, cardStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  return (
    <div className="py-16 px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="text-[9px] uppercase tracking-[0.25em] font-black opacity-40 block mb-1">JOURNEY</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-3xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          {brandName} Milestones
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BRAND_MILESTONES.map((milestone, idx) => (
          <div 
            key={milestone.year}
            className={`p-6 bg-white flex flex-col justify-between transition-all ${
              isNeobrutalist ? 'border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : 'border border-black/5 hover:border-black/10'
            }`}
            style={!isNeobrutalist ? cardStyle : {}}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-black/5 pb-2" style={{ borderColor: `${palette.text}10` }}>
                <span className="text-xl font-black font-mono" style={{ color: palette.primary }}>
                  {milestone.year}
                </span>
                <span className="text-[10px] font-mono opacity-30">0{idx + 1}</span>
              </div>
              <h3 
                contentEditable 
                suppressContentEditableWarning
                className="font-bold text-sm leading-tight" 
                style={{ color: palette.text }}
              >
                {milestone.title}
              </h3>
              <p 
                contentEditable 
                suppressContentEditableWarning
                className="text-xs opacity-60 leading-relaxed" 
                style={{ color: palette.text }}
              >
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ==========================================================================
   PRODUCT PRESENTATION (NO PRICING) SUB-COMPONENTS
   ========================================================================== */

const PRODUCT_SPECIFICATIONS = [
  { category: 'Performance', name: 'Core Output Efficiency', value: 'Optimal (exceeding standard criteria)' },
  { category: 'Performance', name: 'Response Threshold', value: 'Ultra-low variance (< 0.01%)' },
  { category: 'Performance', name: 'System Latency', value: 'Near-zero delay under active load' },
  { category: 'Materials', name: 'Structural Chassis', value: 'High-durability precision composite' },
  { category: 'Materials', name: 'External Finish', value: 'Fine-brushed protective anodization' },
  { category: 'Materials', name: 'Sustainable Elements', value: '100% bio-sourced recyclable polymer' },
  { category: 'Integration', name: 'System Interface', value: 'Universal dynamic API connectivity' },
  { category: 'Integration', name: 'Included Assets', value: 'Standard deployment documentation package' },
];

export const ProductPresentationSpecs = ({ palette, isEditorial, isNeobrutalist, brandName }: any) => {
  const [activeTab, setActiveTab] = useState('All Specs');
  const categories = ['All Specs', 'Performance', 'Materials', 'Integration'];

  const filteredSpecs = activeTab === 'All Specs' 
    ? PRODUCT_SPECIFICATIONS 
    : PRODUCT_SPECIFICATIONS.filter(s => s.category === activeTab);

  return (
    <div className="py-24 px-12 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] font-black opacity-40 block mb-3">TECHNICAL REPORT</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-4xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          {brandName} Specifications
        </h2>
        <p className="text-sm opacity-60 mt-2 max-w-md mx-auto">A rigorous breakdown of every material, component and threshold built into our signature systems.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-xs font-bold border transition-all ${
              activeTab === cat 
                ? 'bg-black text-white border-black shadow-sm' 
                : 'bg-transparent border-black/10 text-black hover:border-black/40'
            }`}
            style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={`bg-white border divide-y overflow-hidden ${
        isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] divide-y-2 divide-black' : 'border-black/10 rounded-xl'
      }`} style={{ borderRadius: isEditorial ? '0' : undefined }}>
        {filteredSpecs.map((spec, idx) => (
          <div key={`${spec.name}-${idx}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 items-center hover:bg-gray-50/50 transition-colors">
            <div className="md:col-span-3">
              <span className="text-[9px] uppercase tracking-[0.15em] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded" style={{ borderRadius: isEditorial ? '0' : '4px' }}>
                {spec.category}
              </span>
            </div>
            <div className="md:col-span-4 font-extrabold text-sm text-gray-900">
              {spec.name}
            </div>
            <div className="md:col-span-5 text-sm text-gray-600 font-mono">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ANATOMY_FEATURES = [
  {
    id: 'shell',
    title: 'Precision Architecture',
    icon: <Compass className="w-5 h-5 text-indigo-500" />,
    description: 'Crafted from the highest quality resources. Its structured design minimizes friction and ensures total stability under any conditions.',
    image: 'https://picsum.photos/800/800?random=90'
  },
  {
    id: 'diaphragm',
    title: 'Advanced Interface',
    icon: <Sparkle className="w-5 h-5 text-amber-500" />,
    description: 'Optimized user interfaces offering fast responsiveness and seamless interaction under maximum operational demand.',
    image: 'https://picsum.photos/800/800?random=91'
  },
  {
    id: 'damping',
    title: 'Adaptive Infrastructure',
    icon: <Sliders className="w-5 h-5 text-emerald-500" />,
    description: 'Features a state-of-the-art integration layer. It resolves latency anomalies before they impact the primary user experience.',
    image: 'https://picsum.photos/800/800?random=92'
  },
  {
    id: 'repairability',
    title: 'Modular Composition',
    icon: <Hammer className="w-5 h-5 text-rose-500" />,
    description: 'Assembled using accessible components. Every single aspect can be individually upgraded, serviced, or customized to your needs.',
    image: 'https://picsum.photos/800/800?random=93'
  }
];

export const ProductPresentationAnatomy = ({ palette, cardStyle, isEditorial, isNeobrutalist, brandName }: any) => {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const feat = ANATOMY_FEATURES[activeFeatureIdx];

  return (
    <div className="py-24 px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] font-black opacity-40 block mb-3">INTERNAL ANATOMY</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-4xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          Anatomy of {brandName} Designs
        </h2>
        <p className="text-sm opacity-60 mt-2 max-w-md mx-auto">Explore the custom pieces that constitute our high-fidelity, meticulously developed architecture.</p>
      </div>

      <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-12 items-center">
        {/* Clickable Feature Panels (Left) */}
        <div className="@4xl:col-span-5 space-y-4">
          {ANATOMY_FEATURES.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveFeatureIdx(idx)}
              className={`p-5 cursor-pointer border transition-all flex items-start gap-4 ${
                activeFeatureIdx === idx 
                  ? 'bg-white shadow-md scale-[1.02] border-black/10' 
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-90'
              }`}
              style={activeFeatureIdx === idx && !isNeobrutalist ? cardStyle : {}}
            >
              <div className="p-2.5 rounded-lg bg-gray-50 border border-black/5">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm" style={{ color: palette.text }}>{item.title}</h3>
                <p className="text-xs opacity-60 line-clamp-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Image & Details Showcase (Right) */}
        <div className="@4xl:col-span-7">
          <motion.div 
            key={feat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-8 bg-white ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`}
            style={!isNeobrutalist ? cardStyle : {}}
          >
            <div className={`aspect-[16/10] w-full overflow-hidden mb-6 bg-gray-50 border relative ${isNeobrutalist ? 'border-2 border-black' : 'border-black/5'}`} style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
              <img src={feat.image} alt={feat.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-4 right-4 text-[9px] font-bold font-mono px-3 py-1 bg-black text-white rounded">
                TECHNICAL DRAWING #{activeFeatureIdx + 1}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-extrabold text-2xl" style={{ color: palette.text }}>{feat.title}</h3>
              <p className="text-sm opacity-75 leading-relaxed">{feat.description}</p>
              
              <div className="pt-4 flex items-center gap-2 text-xs text-gray-500 font-bold border-t border-black/5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Full Hardware & Platform Support Guarantee Standard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const ProductPresentationLookbook = ({ palette, isEditorial, isNeobrutalist, brandName }: any) => {
  return (
    <div className="py-24 px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] font-black opacity-40 block mb-3">VISUAL ESSAY</span>
        <h2 
          contentEditable 
          suppressContentEditableWarning
          className="text-4xl font-extrabold tracking-tight" 
          style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
        >
          Form & Stillness
        </h2>
        <p className="text-sm opacity-60 mt-2 max-w-md mx-auto">A visual study exploring our flagship {brandName} design in natural architecture and quiet light.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-8 flex flex-col justify-between space-y-8">
          <div className={`aspect-[16/9] bg-gray-100 overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''}`} style={!isNeobrutalist ? { borderRadius: 'var(--radius)' } : {}}>
            <img src="https://picsum.photos/1000/560?random=94" alt="Lookbook visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-black font-mono tracking-wider opacity-40 block">01 / DYNAMIC SYSTEM</span>
              <p className="text-sm opacity-75 leading-relaxed">Our unified system respects the space around you. It dampens structural resonance, bringing total efficiency back to the core operational signal.</p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black font-mono tracking-wider opacity-40 block">02 / PREMIUM MATERIALS</span>
              <p className="text-sm opacity-75 leading-relaxed">Using protective coatings instead of standard paint allows the raw material textures of our composites to glow naturally in ambient shadows.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col justify-between space-y-8">
          <div className={`aspect-[3/4] md:aspect-auto md:flex-1 bg-gray-100 overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]' : ''}`} style={!isNeobrutalist ? { borderRadius: 'var(--radius)' } : {}}>
            <img src="https://picsum.photos/600/800?random=95" alt="Lookbook close-up" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
          </div>
          <div className="p-6 bg-gray-50 border border-black/5 text-center" style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
            <span className="text-[11px] font-bold font-mono text-gray-400 block mb-1">EDITION #01</span>
            <p className="text-xs font-extrabold text-gray-800">Designed to survive trend cycles with architectural permanence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductPresentationPremium = ({ palette, isEditorial, isNeobrutalist, cardStyle, brandName }: any) => {
  return (
    <div className="py-24 px-12 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Visual Showcase (Left) */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/30 to-rose-100/20 blur-3xl rounded-full" />
          <div 
            className={`relative overflow-hidden aspect-square bg-neutral-900 group ${
              isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : 'shadow-2xl'
            }`}
            style={!isNeobrutalist ? { ...cardStyle, borderRadius: isEditorial ? '0' : '24px' } : {}}
          >
            <img 
              src="https://picsum.photos/800/800?random=99" 
              alt="Bespoke Premium Design" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase mb-2">LIMITED ASSORTMENT</span>
              <h3 className="text-white text-2xl font-extrabold tracking-tight">The Pinnacle of {brandName} Design</h3>
              <p className="text-white/60 text-xs mt-2 max-w-md leading-relaxed">Each unit is meticulously numbered, accompanied by its respective performance curve chart validated by our lead designer.</p>
            </div>
          </div>
        </div>

        {/* Storytelling & Value Highlights (Right) */}
        <div className="lg:col-span-6 space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-black font-mono tracking-widest opacity-40 block">PREMIUM SPECIFICATION</span>
            <h2 
              contentEditable 
              suppressContentEditableWarning
              className="text-4xl md:text-5xl font-black tracking-tight" 
              style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}
            >
              Unyielding Perfection.
            </h2>
            <p className="text-sm opacity-70 leading-relaxed max-w-lg">
              Designed entirely for the discerning eye, our flagship product combines surgical materials engineering with pure design artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2 border-l-2 pl-4 py-1" style={{ borderColor: palette.primary }}>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block">MATERIALS</span>
              <h4 className="font-extrabold text-sm" style={{ color: palette.text }}>Structural Frame</h4>
              <p className="text-xs opacity-60">Surgical milling prevents structural leakage entirely.</p>
            </div>

            <div className="space-y-2 border-l-2 pl-4 py-1" style={{ borderColor: palette.primary }}>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block">CIRCUITRY</span>
              <h4 className="font-extrabold text-sm" style={{ color: palette.text }}>Optimized Coherence</h4>
              <p className="text-xs opacity-60">High purity conductors maintain absolute signal coherence.</p>
            </div>

            <div className="space-y-2 border-l-2 pl-4 py-1" style={{ borderColor: palette.primary }}>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block">INTEGRATION</span>
              <h4 className="font-extrabold text-sm" style={{ color: palette.text }}>Advanced Dampers</h4>
              <p className="text-xs opacity-60">Absorbs stray macro-vibrations before they ever impact operation.</p>
            </div>

            <div className="space-y-2 border-l-2 pl-4 py-1" style={{ borderColor: palette.primary }}>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 block">ASSEMBLY</span>
              <h4 className="font-extrabold text-sm" style={{ color: palette.text }}>Artisanal calibration</h4>
              <p className="text-xs opacity-60">Individually calibrated and signed off by artisan handmakers.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-black/5" style={{ borderColor: `${palette.text}10` }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img src="https://picsum.photos/100/100?random=111" alt="Master Craftsman" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block">HAND CALIBRATED BY</span>
                <p className="font-extrabold text-sm text-gray-900">Dr. Hans-Wilhelm Richter</p>
                <p className="text-xs text-gray-500">Chief of Acoustic Physics & Tuning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQAccordionItem = ({ question, answer, index, palette }: { question: string; answer: string; index: number; palette: any }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <div className="border-b py-5" style={{ borderColor: `${palette.text}20` }}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-left py-3 font-semibold text-lg hover:opacity-80 transition-opacity focus:outline-none"
        style={{ color: palette.text }}
      >
        <span contentEditable suppressContentEditableWarning>{question}</span>
        <span className="text-xl font-mono ml-4 select-none">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          contentEditable 
          suppressContentEditableWarning 
          className="mt-2 text-sm opacity-70 leading-relaxed pr-8" 
          style={{ color: palette.text }}
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
};

export const renderComponent = (comp: CanvasComponent, state: AppState) => {
  const { type } = comp;
  const { palette, brandName, selectedStyle } = state;

  const isEditorial = selectedStyle === 'editorial-magazine' || selectedStyle === 'vintage-retro';
  const isBrutalist = selectedStyle.includes('brutalism') || selectedStyle === 'acid-graphic';
  const isNeobrutalist = selectedStyle === 'neobrutalism';
  const isGlass = selectedStyle === 'glassmorphism';
  const isBento = selectedStyle === 'bento-grid';
  
  const cardStyle = {
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: 'var(--border)',
    backgroundColor: isGlass ? `${palette.surface}40` : palette.surface,
    backdropFilter: isGlass ? 'blur(12px)' : 'none',
  };

  const buttonPrimaryStyle = {
    backgroundColor: palette.text, 
    color: palette.background, 
    border: isNeobrutalist ? `2px solid ${palette.text}` : 'none', 
    borderRadius: isEditorial ? '0' : 'var(--radius)', 
    boxShadow: isNeobrutalist ? `4px 4px 0px 0px ${palette.text}` : 'none',
    fontFamily: 'var(--font-sans)',
  };

  const buttonSecondaryStyle = {
    backgroundColor: 'transparent',
    color: palette.text, 
    border: isNeobrutalist ? `2px solid ${palette.text}` : `1px solid ${palette.text}40`, 
    borderRadius: isEditorial ? '0' : 'var(--radius)',
    fontFamily: 'var(--font-sans)',
  };

  switch (type) {
    case 'Navbar': {
      const isMinimal = comp.variant === 'minimal';
      if (isMinimal) {
        return (
          <nav className="w-full flex flex-col items-center justify-center gap-4 px-8 py-8 mb-4 border-b border-black/5" style={{ backgroundColor: palette.surface, color: palette.text }}>
            <div contentEditable suppressContentEditableWarning className="text-3xl font-bold tracking-tighter" style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}>
              {state.brandName || 'Brand'}
            </div>
            <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-widest opacity-80 mt-2">
              <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Work</span>
              <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">About</span>
              <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Services</span>
              <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Contact</span>
            </div>
          </nav>
        );
      }
      return (
        <nav className="w-full flex items-center justify-between px-8 py-6 mb-4" style={{ backgroundColor: palette.surface, color: palette.text }}>
          <div contentEditable suppressContentEditableWarning className="text-2xl font-bold tracking-tighter" style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}>
            {state.brandName || 'Brand'}
          </div>
          <div className="hidden @md:flex items-center gap-8 text-sm font-medium opacity-80">
            <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Work</span>
            <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">About</span>
            <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Services</span>
            <span contentEditable suppressContentEditableWarning className="cursor-pointer hover:opacity-100 transition-opacity">Contact</span>
          </div>
          <button style={buttonPrimaryStyle} className="px-6 py-2 text-xs uppercase tracking-widest font-bold">
            Get Started
          </button>
        </nav>
      );
    }
    case 'Hero': {
      const isBrutalistHero = comp.variant === 'brutalist';
      const isVideoHero = comp.variant === 'video';
      
      if (isVideoHero) {
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative px-8 py-32 md:py-44 flex flex-col items-center text-center overflow-hidden mb-4 min-h-[500px] justify-center bg-black"
            style={!isNeobrutalist ? { ...cardStyle, borderRadius: isEditorial ? '0' : '24px' } : { border: '4px solid black' }}
          >
            {/* Background looping premium abstract video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none z-0"
              src="https://lorem.video/nature.mp4"
            />
            
            {/* Dark contrast overlay for supreme readability of content-editable text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 z-0" />
            
            {/* Soft background ambient glowing effects aligned with theme palette */}
            <div 
              className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[90px] z-0 animate-pulse pointer-events-none" 
              style={{ backgroundColor: `${palette.primary}30` }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[100px] z-0 animate-pulse pointer-events-none" 
              style={{ backgroundColor: `${palette.secondary}20` }}
            />

            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              
              <h1 contentEditable suppressContentEditableWarning 
                className={`text-4xl @2xl:text-6xl @4xl:text-[5rem] font-extrabold leading-tight text-white ${isEditorial ? 'font-serif' : 'font-sans'}`}
                style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)', textShadow: '0 4px 18px rgba(0,0,0,0.75)' }}
              >
                Experience {brandName} Design
              </h1>
              
              <p contentEditable suppressContentEditableWarning 
                className="max-w-2xl mx-auto text-white/80 text-sm md:text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
              >
                We build fully optimized solutions engineered for modern scale, seamless efficiency, and long-term durability.
              </p>
              
              <div className="pt-8 flex justify-center items-center">
                <button contentEditable suppressContentEditableWarning 
                  className="px-8 py-3.5 transition-all font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: palette.primary,
                    color: palette.background,
                    border: isNeobrutalist ? `2px solid ${palette.text}` : 'none',
                    borderRadius: isEditorial ? '0' : 'var(--radius)',
                    boxShadow: isNeobrutalist ? `4px 4px 0px 0px ${palette.text}` : 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Discover {brandName}
                </button>
              </div>
            </div>
            
            {/* Scroll indicator for immersive feel */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-45 z-10 text-white font-mono text-[9px] tracking-widest">
              <span>EXPLORE {brandName.toUpperCase()}</span>
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>
        );
      }

      if (isBrutalistHero) {
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative px-8 py-32 flex flex-col items-center text-center overflow-hidden mb-4 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
            style={{ backgroundColor: palette.primary, color: palette.text }}
          >
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <h1 contentEditable suppressContentEditableWarning 
                className="text-5xl @2xl:text-7xl @4xl:text-[6rem] font-black leading-none uppercase tracking-tight"
                style={{ WebkitTextStroke: `2.5px ${palette.text}`, color: palette.background, textShadow: `6px 6px 0 ${palette.text}` }}
              >
                WE BUILD THE <span style={{ color: palette.secondary, WebkitTextStroke: `2.5px ${palette.text}` }}>FUTURE</span> OF DESIGN
              </h1>
              <p contentEditable suppressContentEditableWarning 
                className="max-w-xl mx-auto text-lg font-bold bg-black text-white p-4 rotate-1 inline-block border-2 border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                High-impact creative systems built without compromises for ambitious brands.
              </p>
              <div className="pt-8 flex flex-wrap gap-6 justify-center">
                <button contentEditable suppressContentEditableWarning 
                  className="px-10 py-5 font-black uppercase tracking-wider text-xs border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] bg-white text-black"
                >
                  Inizia Ora
                </button>
              </div>
            </div>
          </motion.div>
        );
      }
      return (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative px-8 py-32 flex flex-col items-center text-center overflow-hidden mb-4 ${isNeobrutalist ? 'bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]' : ''}`}
          style={cardStyle}
        >
          {isEditorial && <div className="w-12 h-px mb-8" style={{ backgroundColor: palette.text }}></div>}
          {isGlass && <div className="absolute w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-0 left-0" style={{ backgroundColor: palette.primary }}></div>}
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h1 contentEditable suppressContentEditableWarning 
              className={`text-5xl @2xl:text-7xl @4xl:text-[6rem] ${isEditorial ? 'font-serif' : 'font-bold'} leading-tight ${isNeobrutalist ? 'uppercase' : ''}`}
              style={{ color: palette.text, fontFamily: 'var(--font-serif)', ...(isNeobrutalist && { WebkitTextStroke: `2px ${palette.text}`, color: palette.primary, textShadow: `6px 6px 0 ${palette.text}` }) }}
            >
              {isEditorial ? (
                <>Crafting <span contentEditable suppressContentEditableWarning className="italic" style={{ color: palette.primary }}>digital</span><br/>narratives for {brandName}.</>
              ) : isNeobrutalist ? (
                <>DOMINATE THE <span contentEditable suppressContentEditableWarning style={{ color: palette.background, WebkitTextStroke: `2px ${palette.text}`, textShadow: `6px 6px 0 ${palette.primary}` }}>DIGITAL</span> LANDSCAPE</>
              ) : (
                <>Welcome to <span contentEditable suppressContentEditableWarning style={{ color: palette.primary }}>{brandName}</span></>
              )}
            </h1>
            <p contentEditable suppressContentEditableWarning 
              className={`max-w-xl mx-auto mt-6 ${isEditorial ? 'text-xs uppercase tracking-widest opacity-60' : isNeobrutalist ? 'text-xl font-bold bg-black text-white p-2 inline-block' : 'text-lg opacity-80'}`}
              style={{ color: isNeobrutalist ? palette.background : palette.text, backgroundColor: isNeobrutalist ? palette.text : 'transparent', fontFamily: 'var(--font-sans)' }}
            >
              {isEditorial ? 'High-end visual communication and digital architecture for modern brands.' : 'Build the future of your brand with cutting-edge digital solutions tailored for growth.'}
            </p>
            <div className={`pt-12 flex flex-col sm:flex-row gap-4 justify-center ${isNeobrutalist ? 'gap-6' : ''}`}>
              <button contentEditable suppressContentEditableWarning 
                className={`px-8 py-4 transition-transform hover:scale-105 ${isEditorial ? 'text-[11px] uppercase tracking-widest border' : 'font-bold text-sm uppercase tracking-wider'}`} 
                style={buttonPrimaryStyle}
              >
                {isEditorial ? 'Discover' : 'Start Building'}
              </button>
              <button contentEditable suppressContentEditableWarning 
                className={`px-8 py-4 transition-colors hover:opacity-80 ${isEditorial ? 'text-[11px] uppercase tracking-widest' : 'font-bold text-sm uppercase tracking-wider'}`} 
                style={buttonSecondaryStyle}
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      );
    }
    case 'TextBlock': {
      const isSplitTextBlock = comp.variant === 'split';
      if (isSplitTextBlock) {
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`px-12 py-24 mb-4 max-w-6xl mx-auto ${isNeobrutalist ? 'border-4 border-black' : ''}`}
            style={{ ...(isGlass || isBrutalist ? cardStyle : {}), backgroundColor: isGlass ? 'transparent' : palette.surface }}
          >
            <div className="flex flex-col @3xl:flex-row gap-12 items-start">
              <div className="flex-1">
                <h2 contentEditable suppressContentEditableWarning className={`text-3xl font-bold ${isEditorial ? 'font-serif italic' : ''}`} style={{ color: palette.text, fontFamily: 'var(--font-serif)' }}>
                  Our Philosophy & Commitment at {brandName}
                </h2>
              </div>
              <div className="flex-[2] space-y-6">
                <p contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-lg font-serif' : 'text-base'} leading-relaxed opacity-90`} style={{ color: palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}>
                  We hold ourselves to a standard of absolute excellence, delivering solutions engineered to exceed expectations while respecting natural visual parameters and operational efficiency.
                </p>
                <p contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-base font-serif italic opacity-75' : 'text-sm opacity-85'} leading-relaxed`} style={{ color: palette.text }}>
                  Our dedication remains focused on delivering absolute excellence and challenging traditional design boundaries through forward-thinking architecture.
                </p>
              </div>
            </div>
          </motion.div>
        );
      }
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`px-12 py-32 max-w-4xl mx-auto text-center mb-4 ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`}
          style={{ ...(isGlass || isBrutalist ? cardStyle : {}), backgroundColor: isNeobrutalist ? palette.primary : 'transparent' }}
        >
          {isEditorial && <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: palette.primary }}></div>}
          <h2 contentEditable suppressContentEditableWarning className={`text-4xl @4xl:text-6xl ${isEditorial ? 'font-serif italic' : 'font-bold'} mb-10`} style={{ color: isNeobrutalist ? palette.background : palette.text, fontFamily: 'var(--font-serif)' }}>
            The Vision of {brandName}
          </h2>
          <p contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-lg font-serif' : 'text-xl'} leading-relaxed opacity-90`} style={{ color: isNeobrutalist ? palette.background : palette.text, fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}>
            We design products and workflows to endure, integrating meticulously verified components that serve the creative professional. Our vision is to empower long-term, focused productivity through beautiful, distraction-free design.
          </p>
        </motion.div>
      );
    }
    case 'ImageBlock': {
      const isDualImage = comp.variant === 'dual';
      if (isDualImage) {
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-12 py-16 mb-4 max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-8">
              <div 
                className={`w-full aspect-[4/3] flex items-center justify-center overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black' : ''}`}
                style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius }}
              >
                <img src="https://picsum.photos/800/600?random=11" alt="Placeholder 1" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div 
                className={`w-full aspect-[4/3] flex items-center justify-center overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black' : ''}`}
                style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius }}
              >
                <img src="https://picsum.photos/800/600?random=12" alt="Placeholder 2" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
            </div>
            {isEditorial && <div className="text-center mt-4 text-[10px] uppercase tracking-widest opacity-50" style={{ color: palette.text }}>Fig. 02 & 03 — Dual Visual Explorations</div>}
          </motion.div>
        );
      }
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-12 py-16 mb-4 max-w-7xl mx-auto"
        >
          <div 
            className={`w-full aspect-[21/9] flex items-center justify-center overflow-hidden relative group ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`}
            style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius }}
          >
            <img src="https://picsum.photos/1200/500?random=1" alt="Placeholder" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
            {isEditorial && <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest bg-white/90 px-3 py-1" style={{ color: palette.text }}>Fig. 01 — Visual Architecture</div>}
            <div className={`absolute inset-0 flex items-center justify-center tracking-widest uppercase opacity-40 ${isEditorial ? 'text-[10px] border border-black/5' : 'text-xl font-bold'}`} style={{ fontFamily: 'var(--font-sans)', color: palette.background }}>
            </div>
          </div>
        </motion.div>
      );
    }

    case 'TwoColumns':
      return (
        <div className={`px-12 py-24 mb-4 ${isNeobrutalist ? 'border-y-4 border-black' : ''}`} style={isGlass || isBento || isBrutalist ? cardStyle : { backgroundColor: palette.background }}>
          <div className="max-w-6xl mx-auto flex flex-col @2xl:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              {isEditorial && <div className="w-8 h-px mb-6" style={{ backgroundColor: palette.primary }}></div>}
              <h2 contentEditable suppressContentEditableWarning className={`text-4xl @4xl:text-5xl ${isEditorial ? 'font-serif' : 'font-bold'} ${isNeobrutalist ? 'uppercase' : ''}`} style={{ fontFamily: 'var(--font-serif)', color: palette.text, ...(isNeobrutalist && { WebkitTextStroke: `1px ${palette.text}`, color: palette.background, textShadow: `4px 4px 0 ${palette.primary}` }) }}>
                Innovation at <span contentEditable suppressContentEditableWarning className={isEditorial ? 'italic' : ''} style={{ color: palette.primary, WebkitTextStroke: '0', textShadow: 'none' }}>{brandName}</span>
              </h2>
              <p contentEditable suppressContentEditableWarning className={`opacity-80 leading-relaxed ${isEditorial ? 'text-sm font-serif italic' : isNeobrutalist ? 'font-bold' : 'text-lg'}`} style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)', color: palette.text }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Our approach transforms traditional methods into forward-thinking digital ecosystems.
              </p>
              <button contentEditable suppressContentEditableWarning 
                className={`${isEditorial ? 'text-[10px] uppercase tracking-widest border-b pb-1' : 'px-8 py-4 mt-4 font-bold text-sm uppercase tracking-wider transition-transform hover:scale-105'}`} 
                style={isEditorial ? { borderColor: palette.primary, color: palette.primary } : { ...buttonPrimaryStyle, backgroundColor: palette.secondary, color: palette.background }}
              >
                Read the Full Story
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/5] w-full max-w-sm mx-auto @2xl:ml-auto flex items-center justify-center relative overflow-hidden group" style={{ ...cardStyle, backgroundColor: isGlass ? `${palette.secondary}40` : palette.secondary, borderRadius: isEditorial ? '0' : cardStyle.borderRadius }}>
                <img src="https://picsum.photos/600/800?random=2" alt="Portrait Placeholder" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                {isNeobrutalist && <div className="absolute inset-0 border-4 border-black pointer-events-none"></div>}
              </div>
            </motion.div>
          </div>
        </div>
      );    case 'Grid':
      return (
        <div className="px-12 py-24 max-w-6xl mx-auto mb-4" style={isGlass || isBrutalist ? cardStyle : {}}>
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className={`aspect-square flex items-center justify-center p-6 text-center group ${isNeobrutalist ? 'border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-transform' : ''}`}
                style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, backgroundColor: isGlass ? 'rgba(255,255,255,0.05)' : palette.surface }}
              >
                <div>
                  <div className={`text-2xl mb-4 ${isEditorial ? 'font-serif italic' : 'font-bold'} group-hover:scale-110 transition-transform`} style={{ color: palette.primary }}>0{item}</div>
                  <h3 contentEditable suppressContentEditableWarning className={`mb-2 ${isEditorial ? 'text-[10px] uppercase tracking-widest' : 'font-bold'}`} style={{ fontFamily: 'var(--font-sans)', color: palette.text }}>Grid Item {item}</h3>
                  <p contentEditable suppressContentEditableWarning className={`opacity-60 ${isEditorial ? 'text-[10px] font-serif' : 'text-sm'}`} style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)', color: palette.text }}>Short description for this grid module highlighting specific utility.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'BentoBox':
      return (
        <div className="px-12 py-24 max-w-6xl mx-auto mb-4">
          <div className={`grid grid-cols-1 @2xl:grid-cols-3 gap-6 auto-rows-[250px] ${isNeobrutalist ? 'gap-4' : ''}`}>
            <motion.div 
              className={`@2xl:col-span-2 @2xl:row-span-2 p-10 flex flex-col justify-between relative overflow-hidden group ${isNeobrutalist ? 'border-4 border-black' : ''}`} 
              style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, backgroundColor: palette.surface }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 mix-blend-multiply opacity-20 filter blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" style={{ backgroundColor: palette.primary }}></div>
              <div>
                <span contentEditable suppressContentEditableWarning className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-black/10`} style={{ color: palette.text, borderRadius: isEditorial ? '0' : '9999px' }}>Featured</span>
              </div>
              <div className="mt-12 z-10">
                <h3 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-4 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ fontFamily: 'var(--font-serif)', color: palette.text }}>Main Bento Highlight</h3>
                <p contentEditable suppressContentEditableWarning className="opacity-70 max-w-md text-lg" style={{ color: palette.text }}>Comprehensive overview of the primary feature set displayed within the main bento grid module.</p>
              </div>
            </motion.div>
            
            <motion.div className={`p-8 flex flex-col justify-center text-center items-center group ${isNeobrutalist ? 'border-4 border-black' : ''}`} style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, backgroundColor: palette.primary }}>
              <div contentEditable suppressContentEditableWarning className="text-5xl @2xl:text-7xl font-bold mb-2 group-hover:scale-110 transition-transform duration-500" style={{ color: palette.background }}>99%</div>
              <div className="text-xs uppercase tracking-widest opacity-80" style={{ color: palette.background }}>Satisfaction</div>
            </motion.div>
            
            <motion.div className={`p-8 flex items-end relative overflow-hidden group ${isNeobrutalist ? 'border-4 border-black' : ''}`} style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, backgroundColor: palette.secondary }}>
              <img src="https://picsum.photos/400/400?random=4" alt="Bento Placeholder" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <h4 contentEditable suppressContentEditableWarning className="text-xl font-medium relative z-10" style={{ color: palette.background }}>Secondary module with extra details.</h4>
            </motion.div>
            
            <motion.div className={`@2xl:col-span-3 p-10 flex flex-col @2xl:flex-row items-center justify-between gap-8 ${isNeobrutalist ? 'border-4 border-black' : ''}`} style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, backgroundColor: palette.surface }}>
              <div className="flex-1">
                <h3 contentEditable suppressContentEditableWarning className={`text-2xl mb-2 ${isEditorial ? 'font-serif italic' : 'font-bold'}`} style={{ color: palette.text }}>Horizontal Spanner</h3>
                <p contentEditable suppressContentEditableWarning className="opacity-70 text-lg" style={{ color: palette.text }}>A wide bento box great for calls to action or newsletter signups.</p>
              </div>
              <button contentEditable suppressContentEditableWarning style={buttonPrimaryStyle} className="px-8 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105">Discover More</button>
            </motion.div>
          </div>
        </div>
      );

    case 'SplitHero':
      return (
        <div className={`flex flex-col @2xl:flex-row min-h-[80vh] w-full mb-4 ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`}>
          <div className={`flex-1 flex flex-col justify-center px-12 @4xl:px-24 py-20 ${isNeobrutalist ? 'border-b-4 @2xl:border-b-0 @2xl:border-r-4 border-black' : ''}`} style={{ backgroundColor: palette.background }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl">
              {isEditorial && <div className="text-[10px] uppercase tracking-widest mb-8 opacity-50" style={{ color: palette.text }}>Edition 01</div>}
              <h1 contentEditable suppressContentEditableWarning className={`text-5xl @4xl:text-7xl mb-8 leading-[1.1] ${isEditorial ? 'font-serif' : 'font-bold'} ${isNeobrutalist ? 'uppercase' : ''}`} style={{ color: palette.text, fontFamily: 'var(--font-serif)', ...(isNeobrutalist && { WebkitTextStroke: `2px ${palette.text}`, color: palette.primary, textShadow: `4px 4px 0 ${palette.text}` }) }}>
                Create <br /><span contentEditable suppressContentEditableWarning className={isEditorial ? 'italic' : ''} style={{ color: palette.primary, WebkitTextStroke: '0', textShadow: 'none' }}>Without</span> Limits
              </h1>
              <p contentEditable suppressContentEditableWarning className={`text-lg opacity-80 mb-10 ${isNeobrutalist ? 'font-bold p-4' : ''}`} style={{ color: isNeobrutalist ? palette.background : palette.text, backgroundColor: isNeobrutalist ? palette.text : 'transparent' }}>
                Empowering your vision through cutting-edge digital experiences and bold design choices.
              </p>
              <div className="flex gap-4">
                <button contentEditable suppressContentEditableWarning style={buttonPrimaryStyle} className="px-8 py-4 font-bold uppercase tracking-wider text-xs transition-transform hover:scale-105">Get Started</button>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative overflow-hidden group" style={{ backgroundColor: palette.surface }}>
            <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex items-center justify-center">
              <img src="https://picsum.photos/800/1000?random=3" alt="Hero Placeholder" className={`w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ${isNeobrutalist ? 'grayscale' : ''}`} />
            </motion.div>
          </div>
        </div>
      );

    case 'Features': {
      const isGridFeatures = comp.variant === 'grid';
      if (isGridFeatures) {
        return (
          <div className="px-12 py-32 mb-4" style={{ ...(isGlass || isNeobrutalist || isBento || isBrutalist ? cardStyle : {}), backgroundColor: palette.surface }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 contentEditable suppressContentEditableWarning className={`text-4xl ${isEditorial ? 'font-serif' : 'font-bold'} mb-4`} style={{ color: palette.text }}>
                  Key Capabilities
                </h2>
              </div>
              <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`p-8 bg-white/80 border border-black/5 hover:border-black/20 hover:-translate-y-1 transition-all ${isNeobrutalist ? 'border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white' : ''}`} style={!isNeobrutalist ? cardStyle : {}}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold" style={{ backgroundColor: `${palette.primary}20`, color: palette.primary }}>
                      ❖
                    </div>
                    <h3 contentEditable suppressContentEditableWarning className="text-xl font-bold mb-3" style={{ color: palette.text }}>Capability {item}</h3>
                    <p contentEditable suppressContentEditableWarning className="opacity-70 text-sm leading-relaxed" style={{ color: palette.text }}>Detailed breakdown of our core technical proficiency and delivery standard for modern applications.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="px-12 py-32 mb-4" style={{ ...(isGlass || isNeobrutalist || isBento || isBrutalist ? cardStyle : { borderTop: `1px solid ${palette.text}10`, borderBottom: `1px solid ${palette.text}10` }), backgroundColor: isGlass ? 'transparent' : palette.background }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 contentEditable suppressContentEditableWarning className={`text-4xl @4xl:text-6xl ${isEditorial ? 'font-serif' : 'font-bold'} mb-4`} style={{ fontFamily: 'var(--font-serif)', color: palette.text, ...(isNeobrutalist && { WebkitTextStroke: `1px ${palette.text}`, color: palette.background, textShadow: `4px 4px 0 ${palette.primary}` }) }}>
                Our <span contentEditable suppressContentEditableWarning className={isEditorial ? 'italic' : ''} style={{ color: palette.primary, WebkitTextStroke: '0', textShadow: 'none' }}>Strengths</span>
              </h2>
              <p contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-xs uppercase tracking-widest' : 'text-lg'} opacity-60 max-w-xl mx-auto mt-6`} style={{ fontFamily: 'var(--font-sans)', color: palette.text }}>
                The core advantages offered by {brandName} and how they elevate your daily operations.
              </p>
            </div>
            
            <div className={`grid grid-cols-1 @2xl:grid-cols-3 gap-12 ${isNeobrutalist ? 'divide-y @2xl:divide-y-0 @2xl:divide-x divide-black' : ''}`}>
              {[1, 2, 3].map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col ${isEditorial ? 'text-center' : isNeobrutalist ? 'p-8' : 'p-8 bg-black/5'}`}
                  style={!isEditorial && !isNeobrutalist ? cardStyle : {}}
                >
                  <div className={`text-5xl ${isEditorial ? 'font-serif italic opacity-20' : isNeobrutalist ? 'font-bold opacity-100' : 'font-bold opacity-30'} mb-6`} style={{ color: isNeobrutalist ? 'transparent' : palette.primary, WebkitTextStroke: isNeobrutalist ? `1px ${palette.text}` : 'none' }}>0{item}</div>
                  <h3 contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-sm font-bold uppercase tracking-widest' : 'text-2xl font-bold'} mb-4`} style={{ fontFamily: isEditorial ? 'var(--font-sans)' : 'var(--font-serif)', color: palette.text }}>
                    Key Advantage {item}
                  </h3>
                  <p contentEditable suppressContentEditableWarning className={`opacity-70 leading-relaxed ${isEditorial ? 'text-sm font-serif italic' : 'text-base'}`} style={{ fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)', color: palette.text }}>
                    A concise description of the competitive advantage and how it specifically helps the end-user reach their goals more effectively.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case 'Pricing': {
      const isSingleOffer = comp.variant === 'single';
      if (isSingleOffer) {
        return (
          <div className="py-24 px-12 max-w-4xl mx-auto mb-4 w-full">
            <div className={`p-12 relative flex flex-col @2xl:flex-row items-center gap-12 overflow-hidden ${isNeobrutalist ? 'border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]' : ''}`} style={{ ...cardStyle, backgroundColor: palette.primary }}>
              <div className="flex-1 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold bg-white/20 px-3 py-1 rounded-full text-white">LIMITED TIME ACCESS</span>
                <h3 contentEditable suppressContentEditableWarning className="text-4xl font-bold text-white leading-tight">All-In-One Full Creative Pass</h3>
                <p contentEditable suppressContentEditableWarning className="text-white/80 text-sm">Get lifetime updates, premium access to the entire builder kit, and dedicated expert support anytime.</p>
              </div>
              <div className="p-8 bg-white/10 rounded-2xl flex flex-col items-center min-w-[240px] text-center border border-white/20">
                <div className="text-xs uppercase text-white/70 tracking-widest mb-2">LIFETIME ACCESS</div>
                <div className="text-5xl font-extrabold text-white mb-6">$199</div>
                <button contentEditable suppressContentEditableWarning className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition-transform hover:scale-105" style={{ borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
                  Claim Pass
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
          <div className="text-center mb-16">
            <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-4 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Simple Pricing</h2>
            <p contentEditable suppressContentEditableWarning className="opacity-70 max-w-xl mx-auto" style={{ color: palette.text }}>Choose the plan that best fits your needs. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((plan) => (
              <div key={plan} className={`p-8 flex flex-col ${plan === 2 ? 'scale-105 shadow-2xl relative z-10' : ''}`} style={{ ...cardStyle, backgroundColor: plan === 2 ? palette.primary : palette.surface }}>
                <h3 contentEditable suppressContentEditableWarning className={`text-xl mb-2 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: plan === 2 ? palette.background : palette.text }}>Plan {plan}</h3>
                <div className="text-4xl font-bold mb-6" style={{ color: plan === 2 ? palette.background : palette.text }}>
                  <span className="text-2xl opacity-70">$</span>{plan * 29}
                  <span className="text-sm opacity-60 font-normal">/mo</span>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {[1, 2, 3, 4].map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-sm opacity-80" style={{ color: plan === 2 ? palette.background : palette.text }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: plan === 2 ? palette.background : palette.primary }}></div>
                      <span contentEditable suppressContentEditableWarning>Feature {feature} included</span>
                    </div>
                  ))}
                </div>
                <button contentEditable suppressContentEditableWarning style={plan === 2 ? buttonSecondaryStyle : buttonPrimaryStyle} className="w-full py-3 font-bold transition-opacity hover:opacity-80">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'FAQ': {
      const isSplitFAQ = comp.variant === 'split';
      if (isSplitFAQ) {
        return (
          <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
            <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-16 text-center ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-12">
              {[
                { q: `What core values define ${brandName}?`, a: `Our brand is defined by absolute commitment to precision, modular durability, and functional elegance.` },
                { q: `How are ${brandName} solutions configured?`, a: "Each system is fully customized to align with your design preferences, operating with intuitive layout structures." },
                { q: "Is customer assistance included?", a: "Yes, we provide standard hardware and platform support guarantees for all registered users." },
                { q: "Where can I view active specifications?", a: "Detailed performance indicators and composites are fully cataloged within our public documentation library." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border-b" style={{ borderColor: `${palette.text}15` }}>
                  <h3 contentEditable suppressContentEditableWarning className="text-lg font-bold mb-3" style={{ color: palette.text }}>{item.q}</h3>
                  <p contentEditable suppressContentEditableWarning className="opacity-70 text-sm leading-relaxed" style={{ color: palette.text }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="py-24 px-12 max-w-3xl mx-auto mb-4 w-full">
          <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-12 text-center ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: "How does the custom layout builder operate?", a: "The layout builder operates client-side inside standard browser layers. You can drag, drop, and customize colors instantly in real-time." },
              { q: "Can I export my finished layouts to standard code?", a: "Yes, you can click the export button to download the optimized HTML code paired with responsive Tailwind styles immediately." },
              { q: "Are custom Google Fonts fully supported in templates?", a: "Absolutely. We support Inter, Space Grotesk, Outfit, and JetBrains Mono fonts directly mapped into CSS theme layouts." },
              { q: "Is it possible to save custom palettes and styling?", a: "All changes to branding, color combinations, and components are persistently cached to standard browser memory blocks." }
            ].map((item, idx) => (
              // @ts-ignore
              <FAQAccordionItem key={idx} question={item.q} answer={item.a} index={idx} palette={palette} />
            ))}
          </div>
        </div>
      );
    }
    case 'Testimonials':
      return (
        <div className="py-24 px-12 mb-4 w-full" style={{ backgroundColor: palette.surface }}>
          <div className="max-w-6xl mx-auto">
            <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-16 text-center ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>What they say</h2>
            <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-8">
              {[1, 2, 3].map(t => (
                <div key={t} className="p-8 relative" style={{ ...cardStyle, backgroundColor: palette.background }}>
                  <div className="text-4xl font-serif italic mb-4 opacity-20" style={{ color: palette.primary }}>"</div>
                  <p contentEditable suppressContentEditableWarning className="opacity-80 mb-8 italic" style={{ color: palette.text }}>
                    "This product completely transformed our workflow. The attention to detail and design quality is unmatched."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/100/100?random=${t + 10}`} alt="Avatar" className="w-12 h-12 rounded-full object-cover grayscale mix-blend-multiply opacity-80" />
                    <div>
                      <div contentEditable suppressContentEditableWarning className="font-bold text-sm" style={{ color: palette.text }}>John Doe {t}</div>
                      <div contentEditable suppressContentEditableWarning className="text-xs opacity-60 uppercase tracking-widest mt-1" style={{ color: palette.text }}>CEO, Company</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'CallToAction':
      return (
        <div className="py-32 px-12 text-center mb-4 relative overflow-hidden" style={{ backgroundColor: palette.primary, color: palette.background }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)]"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 contentEditable suppressContentEditableWarning className={`text-5xl @2xl:text-7xl mb-6 ${isEditorial ? 'font-serif' : 'font-bold'}`}>
              Ready to begin?
            </h2>
            <p contentEditable suppressContentEditableWarning className="text-xl mb-10 opacity-90 max-w-xl mx-auto">
              Join thousands of users who are already building the future with us today.
            </p>
            <div className="flex flex-col @sm:flex-row gap-4 justify-center">
              <button contentEditable suppressContentEditableWarning className="px-8 py-4 font-bold tracking-widest uppercase text-sm transition-transform hover:scale-105" style={{ backgroundColor: palette.background, color: palette.primary, borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
                Get Started Now
              </button>
              <button contentEditable suppressContentEditableWarning className="px-8 py-4 font-bold tracking-widest uppercase text-sm transition-opacity hover:opacity-80" style={{ border: `1px solid ${palette.background}`, color: palette.background, borderRadius: isEditorial ? '0' : 'var(--radius)' }}>
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      );
    case 'Gallery':
      return (
        <div className="py-24 px-12 mb-4 w-full">
          <div className="text-center mb-16">
            <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-4 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Featured Work</h2>
            <p contentEditable suppressContentEditableWarning className="opacity-70 max-w-xl mx-auto" style={{ color: palette.text }}>A selection of our finest projects and visual explorations.</p>
          </div>
          <div className={`grid ${isBento ? 'grid-cols-2 @2xl:grid-cols-4 auto-rows-[200px]' : 'grid-cols-1 @2xl:grid-cols-3'} gap-4`}>
            {[1, 2, 3, 4, 5, 6].map((img, i) => (
              <motion.div 
                key={img} 
                className={`relative overflow-hidden group ${isBento && i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ ...cardStyle, borderRadius: isEditorial ? '0' : cardStyle.borderRadius, height: isBento ? '100%' : '300px' }}
                whileHover={{ scale: 0.98 }}
              >
                <img src={`https://picsum.photos/800/800?random=${img + 20}`} alt="Gallery image" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Project {img}</div>
                    <div className="font-bold text-lg">View Details</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'Stats':
      return (
        <div className="py-24 px-12 mb-4 w-full" style={{ backgroundColor: palette.surface }}>
          <div className="grid grid-cols-2 @4xl:grid-cols-4 gap-12 text-center divide-x divide-black/10">
            {[
              { value: '10k+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '$2M', label: 'Revenue' },
              { value: '24/7', label: 'Support' }
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-6xl mb-2 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.primary }}>
                  {stat.value}
                </div>
                <div contentEditable suppressContentEditableWarning className="text-xs @2xl:text-sm uppercase tracking-widest opacity-60 font-bold" style={{ color: palette.text }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'Team':
      return (
        <div className="py-24 px-12 mb-4 w-full">
          <div className="text-center mb-16">
            <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-4 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Our Team</h2>
            <p contentEditable suppressContentEditableWarning className="opacity-70 max-w-xl mx-auto" style={{ color: palette.text }}>The brilliant minds behind our success.</p>
          </div>
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(member => (
              <div key={member} className="group text-center">
                <div className="relative overflow-hidden mb-6 aspect-square max-w-[240px] mx-auto" style={{ ...cardStyle, borderRadius: isEditorial ? '0' : '9999px' }}>
                  <img src={`https://picsum.photos/400/400?random=${member + 30}`} alt="Team member" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 contentEditable suppressContentEditableWarning className={`text-xl mb-1 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Member Name</h3>
                <p contentEditable suppressContentEditableWarning className="text-sm uppercase tracking-widest opacity-60" style={{ color: palette.text }}>Role Description</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'Contact': {
      const isSplitContact = comp.variant === 'split';
      if (isSplitContact) {
        return (
          <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
            <div className="flex flex-col @3xl:flex-row gap-16">
              <div className="flex-1 space-y-8">
                <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Let's Create Something Great</h2>
                <p contentEditable suppressContentEditableWarning className="opacity-70 text-lg leading-relaxed" style={{ color: palette.text }}>Our design directors and structural analysts are always available to help build, inspect, and deploy your next digital masterpiece.</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">EMAIL US</h4>
                    <p contentEditable suppressContentEditableWarning className="font-bold text-sm" style={{ color: palette.text }}>directors@example.com</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">CALL US</h4>
                    <p contentEditable suppressContentEditableWarning className="font-bold text-sm" style={{ color: palette.text }}>+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-8" style={{ ...cardStyle, backgroundColor: palette.surface }}>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input type="text" className="w-full bg-transparent border-b py-3 focus:outline-none" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="Your Name" />
                  </div>
                  <div>
                    <input type="email" className="w-full bg-transparent border-b py-3 focus:outline-none" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="Email Address" />
                  </div>
                  <div>
                    <textarea className="w-full bg-transparent border-b py-3 focus:outline-none h-24 resize-none" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="Tell us about your project..." />
                  </div>
                  <button contentEditable suppressContentEditableWarning style={buttonPrimaryStyle} className="w-full py-4 text-xs font-bold uppercase tracking-widest mt-4">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="py-24 px-12 max-w-4xl mx-auto mb-4 w-full">
          <div className="flex flex-col @2xl:flex-row gap-16">
            <div className="flex-1">
              <h2 contentEditable suppressContentEditableWarning className={`text-4xl @2xl:text-5xl mb-6 ${isEditorial ? 'font-serif' : 'font-bold'}`} style={{ color: palette.text }}>Get in Touch</h2>
              <p contentEditable suppressContentEditableWarning className="opacity-70 mb-12 text-lg" style={{ color: palette.text }}>Ready to start your next project? Drop us a line and we'll get back to you shortly.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1" style={{ color: palette.text }}>Email</div>
                  <div contentEditable suppressContentEditableWarning className="font-medium text-lg" style={{ color: palette.text }}>hello@example.com</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1" style={{ color: palette.text }}>Office</div>
                  <div contentEditable suppressContentEditableWarning className="font-medium text-lg" style={{ color: palette.text }}>123 Design Street<br/>Creative City, 10001</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-8" style={{ ...cardStyle, backgroundColor: palette.surface }}>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-70 mb-2" style={{ color: palette.text }}>Name</label>
                  <input type="text" className="w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-70 mb-2" style={{ color: palette.text }}>Email</label>
                  <input type="email" className="w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-70 mb-2" style={{ color: palette.text }}>Message</label>
                  <textarea className="w-full bg-transparent border-b py-2 focus:outline-none resize-none h-24" style={{ borderColor: `${palette.text}30`, color: palette.text }} placeholder="Tell us about your project..."></textarea>
                </div>
                <button contentEditable suppressContentEditableWarning style={buttonPrimaryStyle} className="w-full py-4 font-bold tracking-widest uppercase text-xs mt-4 transition-opacity hover:opacity-80">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    case 'Footer': {
      const isDetailedFooter = comp.variant === 'columns';
      if (isDetailedFooter) {
        return (
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-12 py-24 border-t mt-4 border-[color:var(--footer-border)]"
            style={{
              backgroundColor: palette.surface,
              ...((isGlass || isNeobrutalist || isBrutalist) 
                ? cardStyle 
                : { '--footer-border': `${palette.text}10` } as any)
            }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 @2xl:grid-cols-4 gap-12 text-left">
              <div className="space-y-4">
                <h3 contentEditable suppressContentEditableWarning className={`text-2xl font-bold ${isEditorial ? 'font-serif' : ''}`} style={{ color: palette.text }}>{brandName}</h3>
                <p contentEditable suppressContentEditableWarning className="text-xs opacity-60 leading-relaxed" style={{ color: palette.text }}>High-end visual communication and digital architecture built for modern brands.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: palette.text }}>PLATFORM</h4>
                <div className="flex flex-col gap-2 text-xs font-medium">
                  <a href="#" className="opacity-70 hover:opacity-100">Overview</a>
                  <a href="#" className="opacity-70 hover:opacity-100">Features</a>
                  <a href="#" className="opacity-70 hover:opacity-100">Pricing</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: palette.text }}>RESOURCES</h4>
                <div className="flex flex-col gap-2 text-xs font-medium">
                  <a href="#" className="opacity-70 hover:opacity-100">Help Center</a>
                  <a href="#" className="opacity-70 hover:opacity-100">Developer API</a>
                  <a href="#" className="opacity-70 hover:opacity-100">Community</a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40" style={{ color: palette.text }}>NEWSLETTER</h4>
                <div className="flex border-b pb-2" style={{ borderColor: `${palette.text}20` }}>
                  <input type="email" placeholder="Your email" className="bg-transparent text-xs w-full focus:outline-none" style={{ color: palette.text }} />
                  <button className="text-xs font-bold uppercase tracking-widest ml-2">Join</button>
                </div>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-40">
              <span contentEditable suppressContentEditableWarning>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
              </div>
            </div>
          </motion.footer>
        );
      }
      return (
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`px-12 py-20 text-center ${isEditorial ? 'border-t border-[color:var(--footer-border)]' : ''}`}
          style={{
            backgroundColor: isEditorial ? palette.background : palette.surface,
            ...((isGlass || isNeobrutalist || isBrutalist) 
              ? cardStyle 
              : { '--footer-border': `${palette.text}20` } as any)
          }}
        >
          <h2 contentEditable suppressContentEditableWarning className={`text-3xl ${isEditorial ? 'font-serif' : 'font-bold'} mb-8`} style={{ fontFamily: 'var(--font-serif)', color: palette.text }}>{brandName}</h2>
          <div className={`flex flex-wrap justify-center gap-8 mb-12 ${isEditorial ? 'text-[10px] uppercase tracking-widest font-bold' : 'text-sm font-medium'}`} style={{ fontFamily: 'var(--font-sans)', color: palette.text }}>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Home</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Chi Siamo</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Servizi</a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Contatti</a>
          </div>
          <p contentEditable suppressContentEditableWarning className={`${isEditorial ? 'text-[10px] uppercase tracking-widest' : 'text-xs'} opacity-40`} style={{ fontFamily: 'var(--font-sans)', color: palette.text }}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </motion.footer>
      );
    }
    case 'ProductShowcase': {
      const isFocus = comp.variant === 'focus';
      const isMinimal = comp.variant === 'minimal';
      if (isFocus) {
        return (
          <ProductFocusShowcase 
            palette={palette} 
            cardStyle={cardStyle} 
            buttonPrimaryStyle={buttonPrimaryStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      if (isMinimal) {
        return (
          <ProductMinimalShowcase 
            palette={palette} 
            cardStyle={cardStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      return (
        <div className="py-24 px-12 max-w-6xl mx-auto mb-4 w-full">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-2">CURATED COLLECTION</span>
            <h2 className={`text-4xl font-extrabold ${isEditorial ? 'font-serif' : 'tracking-tight'}`} style={{ color: palette.text }}>
              Featured Creations
            </h2>
          </div>
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-8">
            {DEFAULT_PRODUCTS.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                palette={palette} 
                cardStyle={cardStyle} 
                buttonPrimaryStyle={buttonPrimaryStyle} 
                isEditorial={isEditorial} 
                isNeobrutalist={isNeobrutalist} 
                brandName={brandName}
              />
            ))}
          </div>
        </div>
      );
    }
    case 'BrandHistory': {
      const isTimeline = comp.variant === 'timeline';
      const isTimelineCompact = comp.variant === 'timeline-compact';
      const isTimelineSimple = comp.variant === 'timeline-simple';
      if (isTimeline) {
        return (
          <BrandHistoryTimeline 
            palette={palette} 
            cardStyle={cardStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      if (isTimelineCompact) {
        return (
          <BrandHistoryTimelineCompact 
            palette={palette} 
            isEditorial={isEditorial} 
            brandName={brandName}
          />
        );
      }
      if (isTimelineSimple) {
        return (
          <BrandHistoryTimelineSimple 
            palette={palette} 
            cardStyle={cardStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      return (
        <BrandHistoryHeritage 
          palette={palette} 
          cardStyle={cardStyle} 
          isEditorial={isEditorial} 
          isNeobrutalist={isNeobrutalist} 
          brandName={brandName}
        />
      );
    }
    case 'ProductPresentation': {
      const isSpecs = comp.variant === 'specs';
      const isAnatomy = comp.variant === 'anatomy';
      const isPremium = comp.variant === 'premium';
      if (isSpecs) {
        return (
          <ProductPresentationSpecs 
            palette={palette} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      if (isAnatomy) {
        return (
          <ProductPresentationAnatomy 
            palette={palette} 
            cardStyle={cardStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      if (isPremium) {
        return (
          <ProductPresentationPremium 
            palette={palette} 
            cardStyle={cardStyle} 
            isEditorial={isEditorial} 
            isNeobrutalist={isNeobrutalist} 
            brandName={brandName}
          />
        );
      }
      return (
        <ProductPresentationLookbook 
          palette={palette} 
          isEditorial={isEditorial} 
          isNeobrutalist={isNeobrutalist} 
          brandName={brandName}
        />
      );
    }

    default:
      return null;
  }
};

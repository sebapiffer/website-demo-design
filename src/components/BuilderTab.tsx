import React, { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { AppState, ComponentType, CanvasComponent, Palette } from '../types';
import { defaultPalettes } from '../data/palettes';
import { Download, Code, Plus, Trash2, GripVertical, Image as ImageIcon, Type, Layout, List, Grid as GridIcon, Columns, Monitor, Tablet, Smartphone, MessageSquare, Users, DollarSign, HelpCircle, Menu, Target, BarChart, ChevronDown, ChevronRight, ShoppingBag, History, Award, Box, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { renderComponent } from './RenderComponent';
import { styleCategories } from '../data/styles';

interface BuilderTabProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const COMPONENT_VARIANTS: Record<ComponentType, { value: string; label: string }[]> = {
  Navbar: [
    { value: 'split', label: 'Modern Split' },
    { value: 'minimal', label: 'Centered Links' }
  ],
  Hero: [
    { value: 'classic', label: 'Classic Centered' },
    { value: 'video', label: 'Cinematic Video' },
    { value: 'brutalist', label: 'Neo-Brutalist' }
  ],
  SplitHero: [
    { value: 'split', label: 'Split Screen' }
  ],
  TextBlock: [
    { value: 'editorial', label: 'Editorial Vision' },
    { value: 'split', label: 'Two Columns' }
  ],
  ImageBlock: [
    { value: 'wide', label: 'Panoramic Wide' },
    { value: 'dual', label: 'Side-by-side Grid' }
  ],
  TwoColumns: [
    { value: 'default', label: 'Text & Media' }
  ],
  Features: [
    { value: 'steps', label: 'Numbered Steps' },
    { value: 'grid', label: 'Icon Cards' }
  ],
  CallToAction: [
    { value: 'classic', label: 'Centered CTA' }
  ],
  Gallery: [
    { value: 'grid', label: 'Portfolio Grid' }
  ],
  Stats: [
    { value: 'row', label: 'Stat Counters' }
  ],
  Team: [
    { value: 'grid', label: 'Profiles Grid' }
  ],
  Pricing: [
    { value: 'tiers', label: 'Three Tiers' },
    { value: 'single', label: 'Single Offer' }
  ],
  FAQ: [
    { value: 'accordion', label: 'FAQ Accordion' },
    { value: 'split', label: 'Split Grid' }
  ],
  Testimonials: [
    { value: 'grid', label: 'Reviews Grid' }
  ],
  Contact: [
    { value: 'form', label: 'Centered Form' },
    { value: 'split', label: 'Split Info & Form' }
  ],
  Footer: [
    { value: 'minimal', label: 'Clean Centered' },
    { value: 'columns', label: 'Columned' }
  ],
  BentoBox: [
    { value: 'bento', label: 'Bento Grid' }
  ],
  Grid: [
    { value: 'default', label: 'Symmetrical Grid' }
  ],
  ProductShowcase: [
    { value: 'grid', label: 'Product Grid' },
    { value: 'focus', label: 'Flagship Showcase' },
    { value: 'minimal', label: 'Minimalist Catalog' }
  ],
  BrandHistory: [
    { value: 'timeline', label: 'Milestones Timeline' },
    { value: 'timeline-compact', label: 'Compact Timeline' },
    { value: 'timeline-simple', label: 'Simple Grid Milestones' },
    { value: 'heritage', label: 'Heritage Story' }
  ],
  ProductPresentation: [
    { value: 'specs', label: 'Technical Specifications' },
    { value: 'anatomy', label: 'Product Anatomy / Details' },
    { value: 'lookbook', label: 'Aesthetic Lookbook' },
    { value: 'premium', label: 'Premium Presentation' }
  ]
};

const SECTION_CATEGORIES: {
  id: string;
  title: string;
  items: { type: ComponentType; variant?: string; label: string; icon: React.ReactNode; description?: string }[];
}[] = [
  {
    id: 'navigation_footer',
    title: 'Navigation & Footers',
    items: [
      { type: 'Navbar', variant: 'split', label: 'Navbar (Modern)', icon: <Menu className="w-3.5 h-3.5" />, description: 'Split layout with call-to-action button' },
      { type: 'Navbar', variant: 'minimal', label: 'Navbar (Centered)', icon: <Menu className="w-3.5 h-3.5" />, description: 'Minimalist centered link navigation' },
      { type: 'Footer', variant: 'minimal', label: 'Footer (Clean)', icon: <Layout className="w-3.5 h-3.5" />, description: 'Simple centered list with copyright' },
      { type: 'Footer', variant: 'columns', label: 'Footer (Detailed)', icon: <Layout className="w-3.5 h-3.5" />, description: 'Multi-column layout with social handles' }
    ]
  },
  {
    id: 'hero_headers',
    title: 'Hero Sections',
    items: [
      { type: 'Hero', variant: 'classic', label: 'Hero (Centered)', icon: <Layout className="w-3.5 h-3.5" />, description: 'Classic focused title with action buttons' },
      { type: 'Hero', variant: 'video', label: 'Hero (Cinematic Video)', icon: <Sparkles className="w-3.5 h-3.5" />, description: 'Looping ambient video backdrop with translucent glass overlay' },
      { type: 'SplitHero', variant: 'split', label: 'Hero (Split Screen)', icon: <Columns className="w-3.5 h-3.5" />, description: 'Split column with heading and imagery' },
      { type: 'Hero', variant: 'brutalist', label: 'Hero (Neo-Brutalist)', icon: <Layout className="w-3.5 h-3.5" />, description: 'Large typography with thick strokes and shadows' }
    ]
  },
  {
    id: 'content_blocks',
    title: 'Content & Media',
    items: [
      { type: 'TextBlock', variant: 'editorial', label: 'Text (Editorial Vision)', icon: <Type className="w-3.5 h-3.5" />, description: 'Elegant serif heading with introductory text' },
      { type: 'TextBlock', variant: 'split', label: 'Text (Two Columns)', icon: <Type className="w-3.5 h-3.5" />, description: 'Side-by-side structured text layout' },
      { type: 'ImageBlock', variant: 'wide', label: 'Image (Panoramic)', icon: <ImageIcon className="w-3.5 h-3.5" />, description: 'Wide immersive visual aspect layout' },
      { type: 'ImageBlock', variant: 'dual', label: 'Image (Double Grid)', icon: <ImageIcon className="w-3.5 h-3.5" />, description: 'Two side-by-side portrait elements' },
      { type: 'TwoColumns', variant: 'default', label: 'Split (Text & Media)', icon: <Columns className="w-3.5 h-3.5" />, description: 'Balanced asymmetrical split block' }
    ]
  },
  {
    id: 'grids_galleries',
    title: 'Grids & Galleries',
    items: [
      { type: 'BentoBox', variant: 'bento', label: 'Bento Box Layout', icon: <GridIcon className="w-3.5 h-3.5" />, description: 'Structured visual grid for key metrics' },
      { type: 'Gallery', variant: 'grid', label: 'Portfolio Gallery', icon: <ImageIcon className="w-3.5 h-3.5" />, description: 'Multi-row grid showcase with captions' },
      { type: 'Grid', variant: 'default', label: 'Simple Feature Grid', icon: <GridIcon className="w-3.5 h-3.5" />, description: 'Standard symmetrical columns with numbers' }
    ]
  },
  {
    id: 'features_info',
    title: 'Features & Social Proof',
    items: [
      { type: 'Features', variant: 'steps', label: 'Features (Numbered)', icon: <List className="w-3.5 h-3.5" />, description: 'Sequenced list with bold numeric accents' },
      { type: 'Features', variant: 'grid', label: 'Features (Icon Cards)', icon: <List className="w-3.5 h-3.5" />, description: 'Card-based grid of features/capabilities' },
      { type: 'Testimonials', variant: 'grid', label: 'Testimonials (Grid)', icon: <Users className="w-3.5 h-3.5" />, description: 'User reviews with profile pictures' },
      { type: 'Team', variant: 'grid', label: 'Team Profiles', icon: <Users className="w-3.5 h-3.5" />, description: 'Beautiful photo-based team grid' },
      { type: 'Stats', variant: 'row', label: 'Performance Stats', icon: <BarChart className="w-3.5 h-3.5" />, description: 'High-impact stat counters' }
    ]
  },
  {
    id: 'pricing_faq',
    title: 'Pricing & FAQ',
    items: [
      { type: 'Pricing', variant: 'tiers', label: 'Pricing (Three Tiers)', icon: <DollarSign className="w-3.5 h-3.5" />, description: 'Side-by-side comparison tables' },
      { type: 'Pricing', variant: 'single', label: 'Pricing (Single Promo)', icon: <DollarSign className="w-3.5 h-3.5" />, description: 'Single high-conversion card offer' },
      { type: 'FAQ', variant: 'accordion', label: 'FAQ (Accordion)', icon: <HelpCircle className="w-3.5 h-3.5" />, description: 'Interactive expandable list layout' },
      { type: 'FAQ', variant: 'split', label: 'FAQ (Side-by-Side)', icon: <HelpCircle className="w-3.5 h-3.5" />, description: 'Two-column flat question layout' }
    ]
  },
  {
    id: 'conversion_contact',
    title: 'Contact & Conversion',
    items: [
      { type: 'CallToAction', variant: 'classic', label: 'Call To Action (Centered)', icon: <Target className="w-3.5 h-3.5" />, description: 'Engaging banner to convert visitors' },
      { type: 'Contact', variant: 'form', label: 'Contact (Form Card)', icon: <MessageSquare className="w-3.5 h-3.5" />, description: 'Centered inputs for customer inquiries' },
      { type: 'Contact', variant: 'split', label: 'Contact (Asymmetrical)', icon: <MessageSquare className="w-3.5 h-3.5" />, description: 'Physical info left, contact form right' }
    ]
  },
  {
    id: 'product_showcase',
    title: 'Products & E-Commerce',
    items: [
      { type: 'ProductShowcase', variant: 'grid', label: 'Product Showcase (Grid)', icon: <ShoppingBag className="w-3.5 h-3.5" />, description: 'Curated multi-product grid with ratings and cart' },
      { type: 'ProductShowcase', variant: 'focus', label: 'Flagship Feature (Focus)', icon: <ShoppingBag className="w-3.5 h-3.5" />, description: 'High-impact single product showcase with specs' },
      { type: 'ProductShowcase', variant: 'minimal', label: 'Catalog Showcase (Minimal)', icon: <ShoppingBag className="w-3.5 h-3.5" />, description: 'Clean minimalist vertical catalog layout' }
    ]
  },
  {
    id: 'brand_history',
    title: 'Brand History & Story',
    items: [
      { type: 'BrandHistory', variant: 'timeline', label: 'Milestones Timeline', icon: <History className="w-3.5 h-3.5" />, description: 'Chronological path and key legacy dates' },
      { type: 'BrandHistory', variant: 'timeline-compact', label: 'Compact Timeline', icon: <History className="w-3.5 h-3.5" />, description: 'Slim, modern side-by-side milestones' },
      { type: 'BrandHistory', variant: 'timeline-simple', label: 'Simple Grid Milestones', icon: <History className="w-3.5 h-3.5" />, description: 'Minimalist four-column history cards' },
      { type: 'BrandHistory', variant: 'heritage', label: 'Editorial Heritage Split', icon: <Award className="w-3.5 h-3.5" />, description: 'Editorial layout narrating founding values' }
    ]
  },
  {
    id: 'product_presentation',
    title: 'Our Product (No Price)',
    items: [
      { type: 'ProductPresentation', variant: 'specs', label: 'Technical Specifications', icon: <Box className="w-3.5 h-3.5" />, description: 'Minimalist tech specs or component list' },
      { type: 'ProductPresentation', variant: 'anatomy', label: 'Component Anatomy', icon: <Box className="w-3.5 h-3.5" />, description: 'Interactive detailing of high-end parts' },
      { type: 'ProductPresentation', variant: 'lookbook', label: 'Aesthetic Lookbook', icon: <ImageIcon className="w-3.5 h-3.5" />, description: 'Editorial storytelling product lookbook' },
      { type: 'ProductPresentation', variant: 'premium', label: 'Premium Presentation', icon: <Sparkles className="w-3.5 h-3.5" />, description: 'Luxury dark/light premium presentation with features' }
    ]
  }
];

const ALL_LIBRARY_ITEMS = SECTION_CATEGORIES.flatMap(cat => cat.items.map(item => ({ ...item, catId: cat.id })));

export default function BuilderTab({ state, updateState }: BuilderTabProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [searchTerm, setSearchTerm] = useState('');
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    navigation_footer: true,
    hero_headers: true,
    content_blocks: false,
    grids_galleries: false,
    features_info: false,
    pricing_faq: false,
    conversion_contact: false,
    product_showcase: true,
    brand_history: true,
    product_presentation: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setAllSections = (open: boolean) => {
    const nextOpen: Record<string, boolean> = {};
    SECTION_CATEGORIES.forEach(cat => {
      nextOpen[cat.id] = open;
    });
    setOpenSections(nextOpen);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    if (result.source.droppableId === 'canvas' && result.destination.droppableId === 'canvas') {
      const items = Array.from(state.components);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateState({ components: items });
    } else if (result.destination.droppableId === 'canvas') {
      let type: ComponentType;
      let variant: string | undefined = undefined;

      const draggableId = result.draggableId;
      if (draggableId.startsWith('lib__')) {
        const parts = draggableId.split('__');
        type = parts[1] as ComponentType;
        variant = parts[2] !== 'none' ? parts[2] : undefined;
      } else {
        // Fallback or legacy item
        return;
      }
        
      const newComponent: CanvasComponent = {
        id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        type,
        variant,
      };
      
      const items = Array.from(state.components);
      items.splice(result.destination.index, 0, newComponent);
      updateState({ components: items });
    }
  };

  const addComponent = (type: ComponentType, variant?: string) => {
    const newComponent: CanvasComponent = {
      id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type,
      variant,
    };
    updateState({ components: [...state.components, newComponent] });
  };

  const removeComponent = (id: string) => {
    updateState({ components: state.components.filter(c => c.id !== id) });
  };

  const exportImage = async () => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(canvasRef.current, { scale: 2 });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${state.siteName || 'bozza'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setExporting(false);
    }
  };

  const exportHtml = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.siteName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@400;500;600&display=swap');
        :root {
            --primary: ${state.palette.primary};
            --secondary: ${state.palette.secondary};
            --bg: ${state.palette.background};
            --surface: ${state.palette.surface};
            --text: ${state.palette.text};
            --font-sans: ${fonts.sans};
            --font-serif: ${fonts.serif};
            --radius: ${styleVars.radius};
            --shadow: ${styleVars.shadow};
            --border: ${styleVars.border};
        }
        body { margin: 0; background-color: var(--bg); color: var(--text); line-height: 1.6; font-family: var(--font-sans); }
        .hero { text-align: center; padding: 8rem 2rem; background: var(--surface); display: flex; flex-direction: column; align-items: center; }
        .hero-line { width: 3rem; height: 1px; background: var(--text); margin-bottom: 2rem; }
        .hero h1 { font-size: 4rem; color: var(--text); margin-bottom: 1.5rem; font-family: var(--font-serif); font-weight: 400; line-height: 1.1; }
        .hero h1 span { color: var(--primary); font-style: italic; }
        .hero p { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-bottom: 3rem; }
        .btn { background: var(--text); color: var(--bg); padding: 0.75rem 2rem; text-decoration: none; display: inline-block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; border: 1px solid var(--text); transition: opacity 0.2s; }
        .btn:hover { opacity: 0.8; }
        .btn-outline { background: transparent; color: var(--text); border: 1px solid rgba(0,0,0,0.2); }
        .text-block { padding: 6rem 2rem; max-width: 800px; margin: 0 auto; text-align: center; }
        .text-block h2 { font-family: var(--font-serif); font-size: 2.5rem; font-style: italic; margin-bottom: 2rem; }
        .image-block { padding: 4rem 2rem; }
        .image-placeholder { width: 100%; aspect-ratio: 21/9; background: var(--surface); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4; border: 1px solid rgba(0,0,0,0.05); }
        .two-cols { display: flex; gap: 4rem; padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; align-items: center; }
        .two-cols > div { flex: 1; }
        .two-cols h2 { font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 1.5rem; }
        .two-cols h2 span { color: var(--primary); font-style: italic; }
        .two-cols p { font-family: var(--font-serif); font-style: italic; opacity: 0.8; margin-bottom: 2rem; }
        .two-cols-img { aspect-ratio: 4/5; max-width: 400px; background: var(--surface); margin-left: auto; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.3; }
        .features { padding: 6rem 2rem; border-top: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); }
        .features-header { text-align: center; margin-bottom: 4rem; }
        .features-header h2 { font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 1rem; }
        .features-header p { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 4rem; max-width: 1000px; margin: 0 auto; text-align: center; }
        .feature-card .num { font-family: var(--font-serif); font-size: 2.5rem; font-style: italic; color: var(--primary); opacity: 0.2; margin-bottom: 1.5rem; }
        .feature-card h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .feature-card p { font-family: var(--font-serif); font-style: italic; opacity: 0.7; }
        .footer { padding: 5rem 2rem; background: var(--surface); text-align: center; border-top: 1px solid rgba(0,0,0,0.1); }
        .footer h2 { font-family: var(--font-serif); font-size: 2rem; margin-bottom: 2rem; }
        .footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 3rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; }
        .footer p { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4; }
        @media (max-width: 768px) { .two-cols { flex-direction: column; } .two-cols-img { margin-left: 0; } .hero h1 { font-size: 2.5rem; } }
    </style>
</head>
<body>
    ${state.components.map(c => {
      switch(c.type) {
        case 'Hero': return `
    <section class="hero">
        <div class="hero-line"></div>
        <h1>Crafting <span style="color: var(--primary);">digital</span><br>narratives for ${state.brandName}.</h1>
        <p>High-end visual communication and digital architecture for modern brands.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <a href="#" class="btn">Inizia Ora</a>
            <a href="#" class="btn btn-outline">Scopri di piÃ¹</a>
        </div>
    </section>`;
        case 'TextBlock': return `
    <section class="text-block">
        <h2>La Visione di ${state.brandName}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>`;
        case 'ImageBlock': return `
    <section class="image-block">
        <div class="image-placeholder">IMAGE_PLACEHOLDER</div>
    </section>`;
        case 'TwoColumns': return `
    <section class="two-cols">
        <div>
            <div style="width: 2rem; height: 1px; background: var(--primary); margin-bottom: 1.5rem;"></div>
            <h2>Innovazione per <span>${state.brandName}</span></h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
            <a href="#" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); text-decoration: none; border-bottom: 1px solid var(--primary); padding-bottom: 0.25rem;">Leggi Tutto</a>
        </div>
        <div>
            <div class="two-cols-img">PORTRAIT_IMAGE</div>
        </div>
    </section>`;
        case 'Features': return `
    <section class="features">
        <div class="features-header">
            <h2>I Nostri <span style="font-style: italic; color: var(--primary);">Punti di Forza</span></h2>
            <p>I vantaggi principali offerti da ${state.brandName}.</p>
        </div>
        <div class="features-grid">
            <div class="feature-card"><div class="num">01</div><h3>Vantaggio 1</h3><p>Descrizione del vantaggio competitivo.</p></div>
            <div class="feature-card"><div class="num">02</div><h3>Vantaggio 2</h3><p>Descrizione del vantaggio competitivo.</p></div>
            <div class="feature-card"><div class="num">03</div><h3>Vantaggio 3</h3><p>Descrizione del vantaggio competitivo.</p></div>
        </div>
    </section>`;
        case 'Footer': return `
    <footer class="footer">
        <h2>${state.brandName}</h2>
        <div class="footer-links">
            <a href="#" style="color: inherit; text-decoration: none; opacity: 0.6;">Home</a>
            <a href="#" style="color: inherit; text-decoration: none; opacity: 0.6;">Chi Siamo</a>
            <a href="#" style="color: inherit; text-decoration: none; opacity: 0.6;">Servizi</a>
            <a href="#" style="color: inherit; text-decoration: none; opacity: 0.6;">Contatti</a>
        </div>
        <p>Â© 2026 ${state.brandName}. Tutti i diritti riservati.</p>
    </footer>`;
        default: return '';
      }
    }).join('\n')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.download = `${state.siteName || 'bozza'}.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const getTypography = (styleId: string) => {
    if (styleId.includes('brutalism') || styleId.includes('acid')) {
      return { sans: '"Courier New", Courier, monospace', serif: '"Courier New", Courier, monospace' };
    }
    if (styleId.includes('minimalism') || styleId === 'bento-grid' || styleId === 'flat-design' || styleId.includes('morphism') || styleId.includes('skeuomorphism') || styleId === 'corporate-memphis') {
      return { sans: '"Inter", ui-sans-serif, system-ui, sans-serif', serif: '"Inter", ui-sans-serif, system-ui, sans-serif' };
    }
    if (styleId === 'y2k') {
      return { sans: '"Comic Sans MS", "Chalkboard SE", sans-serif', serif: '"Comic Sans MS", "Chalkboard SE", sans-serif' };
    }
    if (styleId === 'hand-drawn') {
      return { sans: '"Brush Script MT", cursive', serif: '"Brush Script MT", cursive' };
    }
    // Default (editorial, vintage)
    return { sans: '"Inter", ui-sans-serif, system-ui, sans-serif', serif: '"Playfair Display", serif' };
  };

  const fonts = getTypography(state.selectedStyle);

  const getStyleVars = (styleId: string) => {
    let radius = '0px';
    let shadow = 'none';
    let border = 'none';

    if (styleId.includes('minimalism')) {
      radius = '0px';
    } else if (styleId === 'bento-grid') {
      radius = '24px';
      shadow = '0 4px 20px rgba(0,0,0,0.05)';
      border = '1px solid rgba(0,0,0,0.05)';
    } else if (styleId === 'flat-design') {
      radius = '8px';
    } else if (styleId === 'pure-brutalism') {
      border = '4px solid var(--text)';
    } else if (styleId === 'neobrutalism') {
      border = '4px solid var(--text)';
      shadow = '8px 8px 0px 0px var(--text)';
      radius = '4px';
    } else if (styleId === 'glassmorphism') {
      radius = '24px';
      shadow = '0 8px 32px 0 rgba(0,0,0,0.1)';
      border = '1px solid rgba(255,255,255,0.2)';
    } else if (styleId === 'neumorphism') {
      radius = '20px';
      shadow = '10px 10px 20px rgba(0,0,0,0.1), -10px -10px 20px rgba(255,255,255,0.5)';
    } else if (styleId === 'claymorphism') {
      radius = '32px';
      shadow = '8px 8px 16px rgba(0,0,0,0.1), inset -8px -8px 16px rgba(0,0,0,0.1), inset 8px 8px 16px rgba(255,255,255,0.5)';
    } else if (styleId === 'y2k') {
      radius = '16px';
      border = '2px solid var(--secondary)';
      shadow = '0 0 10px var(--primary), inset 0 0 10px var(--secondary)';
    } else if (styleId === 'hand-drawn') {
      radius = '255px 15px 225px 15px/15px 225px 15px 255px';
      border = '2px solid var(--text)';
    }

    return { radius, shadow, border };
  };

  const styleVars = getStyleVars(state.selectedStyle);

  const allStyles = styleCategories.flatMap(c => c.substyles);

  const filteredCategories = SECTION_CATEGORIES.map(cat => {
    const matchedItems = cat.items.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return { ...cat, items: matchedItems };
  }).filter(cat => cat.items.length > 0);

  const isSearching = searchTerm.trim().length > 0;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row flex-1 h-full min-h-0 w-full">
        {/* Sidebar */}
      <aside className="w-full h-[320px] lg:h-full lg:w-64 border-r border-[#1A1A1A]/10 p-6 flex flex-col gap-8 bg-[#F3F1ED] overflow-y-auto shrink-0">
        <section>
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-40">Project Identity</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] mb-1">Brand Name</label>
              <input 
                type="text" 
                className="w-full bg-white border border-[#1A1A1A]/20 px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A]" 
                value={state.brandName} 
                onChange={e => updateState({ brandName: e.target.value })} 
              />
            </div>
            
            <div>
              <label className="block text-[11px] mb-1">Site Variable</label>
              <input 
                type="text" 
                className="w-full bg-white border border-[#1A1A1A]/20 px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A]" 
                value={state.siteName} 
                onChange={e => updateState({ siteName: e.target.value })} 
              />
            </div>

            <div>
              <label className="block text-[11px] mb-1">Visual Style</label>
              <select 
                className="w-full bg-white border border-[#1A1A1A]/20 px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A1A]"
                value={state.selectedStyle}
                onChange={e => updateState({ selectedStyle: e.target.value })}
              >
                {allStyles.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="pt-4 border-t border-[#1A1A1A]/10 space-y-3">
          <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Canvas Templates</h3>
          <div className="space-y-2">
            {showClearConfirm ? (
              <div className="bg-red-50 p-2 border border-red-200 rounded space-y-2">
                <p className="text-[10px] font-bold text-red-700 leading-tight">Wipe canvas components completely?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateState({ components: [] });
                      setShowClearConfirm(false);
                    }}
                    className="flex-1 text-center text-[10px] font-black uppercase tracking-wider py-1.5 px-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 text-center text-[10px] font-bold uppercase tracking-wider py-1.5 px-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full text-left text-[11px] font-bold uppercase tracking-wider py-1.5 px-2.5 border border-red-600/20 text-red-700 hover:bg-red-50/50 transition-colors bg-white/50 rounded"
              >
                × Clear Canvas
              </button>
            )}

            <button
              onClick={() => {
                const premiumTemplate: CanvasComponent[] = [
                  { id: 't1', type: 'Navbar', variant: 'split' },
                  { id: 't2', type: 'SplitHero', variant: 'split' },
                  { id: 't3', type: 'BrandHistory', variant: 'heritage' },
                  { id: 't4', type: 'ProductPresentation', variant: 'premium' },
                  { id: 't5', type: 'Features', variant: 'steps' },
                  { id: 't6', type: 'Contact', variant: 'form' },
                  { id: 't7', type: 'Footer', variant: 'minimal' },
                ];
                updateState({ components: premiumTemplate });
              }}
              className="w-full text-left text-[11px] font-extrabold uppercase tracking-wider py-1.5 px-2.5 border border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 transition-colors bg-white rounded flex items-center justify-between"
            >
              <span>✦ Premium Landing</span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded">7 blocks</span>
            </button>

            <button
              onClick={() => {
                const storyTemplate: CanvasComponent[] = [
                  { id: 'tl1', type: 'Navbar', variant: 'minimal' },
                  { id: 'tl2', type: 'Hero', variant: 'classic' },
                  { id: 'tl3', type: 'BrandHistory', variant: 'timeline' },
                  { id: 'tl4', type: 'ProductPresentation', variant: 'lookbook' },
                  { id: 'tl5', type: 'Footer', variant: 'columns' },
                ];
                updateState({ components: storyTemplate });
              }}
              className="w-full text-left text-[11px] font-extrabold uppercase tracking-wider py-1.5 px-2.5 border border-blue-600/30 text-blue-800 hover:bg-blue-50 transition-colors bg-white rounded flex items-center justify-between"
            >
              <span>✦ Brand Storyteller</span>
              <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1 py-0.5 rounded">5 blocks</span>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-40">Color Palette</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {defaultPalettes.map(p => (
              <button
                key={p.name}
                onClick={() => updateState({ palette: p })}
                title={p.name}
                className={`w-8 h-8 rounded-full border ${state.palette.name === p.name ? 'border-white ring-1 ring-black/30' : 'border-transparent'}`}
                style={{ backgroundColor: p.primary }}
              >
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/10 mt-4">
            {['primary', 'secondary', 'background', 'surface', 'text'].map((colorKey) => (
              <div key={colorKey} className="flex items-center justify-between gap-2">
                <label className="text-[10px] uppercase tracking-widest opacity-60 flex-1">{colorKey}</label>
                <input 
                  type="text"
                  value={state.palette[colorKey as keyof Palette]}
                  onChange={e => updateState({ palette: { ...state.palette, [colorKey]: e.target.value, name: 'Custom' } })}
                  className="w-20 text-[10px] uppercase font-mono px-2 py-1 border border-[#1A1A1A]/20 bg-white"
                />
                <input 
                  type="color" 
                  value={state.palette[colorKey as keyof Palette]} 
                  onChange={e => updateState({ palette: { ...state.palette, [colorKey]: e.target.value, name: 'Custom' } })} 
                  className="w-6 h-6 p-0 border-0 rounded cursor-pointer bg-transparent shrink-0" 
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Component Library</h3>
            <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider">
              <button 
                type="button" 
                onClick={() => setAllSections(true)} 
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                Expand
              </button>
              <span className="opacity-20">|</span>
              <button 
                type="button" 
                onClick={() => setAllSections(false)} 
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                Collapse
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:outline-none focus:border-[#1A1A1A] rounded"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-80 font-bold"
              >
                ×
              </button>
            )}
          </div>
          
          <Droppable droppableId="library" isDropDisabled={true}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {filteredCategories.map((cat) => {
                  const isOpen = isSearching || openSections[cat.id];
                  return (
                    <div key={cat.id} className="border border-[#1A1A1A]/10 bg-[#FAF9F6] rounded overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => toggleSection(cat.id)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-black/5 transition-colors focus:outline-none"
                      >
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A1A1A]">{cat.title}</span>
                        {isOpen ? <ChevronDown className="w-3.5 h-3.5 opacity-60" /> : <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                      </button>
                      
                      {isOpen && (
                        <div className="p-2 bg-white border-t border-[#1A1A1A]/5 space-y-1.5">
                          {cat.items.map((item, index) => {
                            const dId = `lib__${item.type}__${item.variant || 'none'}`;
                            const globalIndex = ALL_LIBRARY_ITEMS.findIndex(li => li.type === item.type && li.variant === item.variant);
                            
                            return (
                              // @ts-ignore
                              <Draggable key={dId} draggableId={dId} index={globalIndex >= 0 ? globalIndex : index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-2.5 border border-[#1A1A1A]/5 bg-[#FCFCFB] hover:bg-white hover:border-[#1A1A1A]/30 group flex flex-col gap-1 transition-all cursor-grab active:cursor-grabbing ${snapshot.isDragging ? 'shadow-lg ring-1 ring-black/10 z-50' : ''}`}
                                    style={{ ...provided.draggableProps.style }}
                                    onClick={() => addComponent(item.type, item.variant)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="text-[11px] font-bold uppercase flex items-center gap-2 text-[#1A1A1A]">
                                        {item.icon}
                                        {item.label}
                                      </div>
                                      <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-3.5 h-3.5 cursor-pointer hover:scale-110" title="Click to instantly append" />
                                        <GripVertical className="w-3.5 h-3.5" />
                                      </div>
                                    </div>
                                    {item.description && (
                                      <span className="text-[9px] opacity-50 leading-tight block font-normal text-left">
                                        {item.description}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>

        <div className="mt-auto pt-6 border-t border-[#1A1A1A]/10 space-y-2">
          <button onClick={exportImage} disabled={exporting} className="w-full text-[11px] uppercase tracking-widest border border-[#1A1A1A]/20 px-4 py-2 hover:bg-black hover:text-white transition-colors bg-white">
            Export Image
          </button>
          <button onClick={exportHtml} className="w-full text-[11px] uppercase tracking-widest border border-[#1A1A1A] bg-[#1A1A1A] text-white px-4 py-2 hover:bg-black transition-colors">
            Get Code (HTML/CSS)
          </button>
        </div>
      </aside>

      {/* Canvas Area */}
      <main className="flex-1 flex flex-col relative bg-[#E5E5E5] overflow-hidden min-h-0 h-full max-h-full">
        <header className="h-16 border-b border-[#1A1A1A]/10 flex items-center justify-between px-8 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.2em] opacity-40 hidden md:inline">SIMULATOR V.02</span>
            <div className="h-4 w-px bg-[#1A1A1A]/10 hidden md:block"></div>
            <span className="text-xs font-medium italic serif truncate">{state.brandName} / {state.siteName}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#F3F1ED] p-1 rounded-lg border border-[#1A1A1A]/10">
              <button 
                onClick={() => setEditorMode('edit')} 
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${editorMode === 'edit' ? 'bg-white shadow-sm text-black' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80 hover:bg-black/5'}`}
                title="Edit layout components and live content"
              >
                Edit Layout
              </button>
              <button 
                onClick={() => setEditorMode('preview')} 
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${editorMode === 'preview' ? 'bg-white shadow-sm text-black' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80 hover:bg-black/5'}`}
                title="Preview clean design without editing borders"
              >
                Preview
              </button>
            </div>

            <div className="h-4 w-px bg-[#1A1A1A]/10"></div>

            <div className="flex items-center gap-1 bg-[#F3F1ED] p-1 rounded-lg border border-[#1A1A1A]/10">
              <button 
                onClick={() => setViewportMode('desktop')} 
                className={`p-1.5 rounded-md transition-all ${viewportMode === 'desktop' ? 'bg-white shadow-sm text-black' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80 hover:bg-black/5'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewportMode('tablet')} 
                className={`p-1.5 rounded-md transition-all ${viewportMode === 'tablet' ? 'bg-white shadow-sm text-black' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80 hover:bg-black/5'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewportMode('mobile')} 
                className={`p-1.5 rounded-md transition-all ${viewportMode === 'mobile' ? 'bg-white shadow-sm text-black' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80 hover:bg-black/5'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto min-h-0 p-4 md:p-12 w-full block" id="canvas-container">
          <div 
            ref={canvasRef}
            className={`@container w-full bg-white shadow-2xl relative min-h-full transition-all duration-500 overflow-hidden font-sans mx-auto ${
              viewportMode === 'mobile' ? 'max-w-[375px]' : 
              viewportMode === 'tablet' ? 'max-w-[768px]' : 
              'max-w-6xl'
            } ${editorMode === 'preview' ? 'preview-mode' : ''}`}
            style={{ 
              backgroundColor: state.palette.background,
              color: state.palette.text,
              '--primary': state.palette.primary,
              '--secondary': state.palette.secondary,
              '--bg': state.palette.background,
              '--surface': state.palette.surface,
              '--text': state.palette.text,
              '--font-sans': fonts.sans,
              '--font-serif': fonts.serif,
              '--radius': styleVars.radius,
              '--shadow': styleVars.shadow,
              '--border': styleVars.border,
            } as React.CSSProperties}
          >
            <Droppable droppableId="canvas" minHeightForDrop={400}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className={`min-h-full transition-colors ${snapshot.isDraggingOver ? 'bg-black/5' : ''}`}
                >
                  {state.components.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-12 text-center text-[#1A1A1A]/40 min-h-[400px]">
                      <div className="border border-dashed border-[#1A1A1A]/20 px-12 py-8 hover:bg-[#1A1A1A]/5">
                        <p className="text-[10px] uppercase tracking-widest">+ Drag or add component here</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0 pb-20">
                      {state.components.map((comp, index) => (
                        // @ts-ignore
                        <Draggable key={comp.id} draggableId={comp.id} index={index} isDragDisabled={editorMode === 'preview'}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative ${editorMode === 'preview' ? 'border-none' : 'group border-2 border-dashed'} ${snapshot.isDragging ? 'z-50 border-[#E07A5F] shadow-2xl' : 'border-transparent hover:border-[#E07A5F]'}`}
                            >
                              {/* Overlay actions */}
                              {editorMode === 'edit' && (
                                <div className="absolute top-4 right-4 flex flex-row items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                  {COMPONENT_VARIANTS[comp.type] && COMPONENT_VARIANTS[comp.type].length > 1 && (
                                    <select
                                      value={comp.variant || COMPONENT_VARIANTS[comp.type][0].value}
                                      onChange={(e) => {
                                        const updated = state.components.map(c => 
                                          c.id === comp.id ? { ...c, variant: e.target.value } : c
                                        );
                                        updateState({ components: updated });
                                      }}
                                      className="px-3 py-2 text-[10px] tracking-wider font-extrabold uppercase rounded-full bg-black text-white border border-white/10 shadow-lg pointer-events-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                                    >
                                      {COMPONENT_VARIANTS[comp.type].map(v => (
                                        <option key={v.value} value={v.value}>
                                          Layout: {v.label}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 pointer-events-auto"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical className="w-5 h-5" />
                                  </div>
                                  <button 
                                    onClick={() => removeComponent(comp.id)}
                                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-red-600 pointer-events-auto"
                                    title="Remove from page"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                              
                              {/* Render actual component */}
                              <div>
                                {renderComponent(comp, state)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </main>
      </div>
    </DragDropContext>
  );
}

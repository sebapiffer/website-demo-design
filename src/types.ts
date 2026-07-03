export type ComponentType = 'Hero' | 'TextBlock' | 'ImageBlock' | 'Features' | 'Footer' | 'TwoColumns' | 'BentoBox' | 'SplitHero' | 'Grid' | 'Navbar' | 'Pricing' | 'FAQ' | 'Testimonials' | 'Contact' | 'CallToAction' | 'Gallery' | 'Stats' | 'Team' | 'ProductShowcase' | 'BrandHistory' | 'ProductPresentation';

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  variant?: string;
}

export interface Palette {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  surface: string;
}

export interface AppState {
  brandName: string;
  siteName: string;
  palette: Palette;
  components: CanvasComponent[];
  selectedStyle: string;
  answers?: Record<string, string>;
}

export interface StyleCategory {
  id: string;
  title: string;
  description: string;
  substyles: SubStyle[];
}

export interface SubStyle {
  id: string;
  name: string;
  description: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  hint?: string;
}

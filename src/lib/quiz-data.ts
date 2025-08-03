
import type { CSSProperties } from 'react';
import { Square, Layout, SlidersHorizontal, Type, Palette } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

export type Question = {
  id: string;
  category: string;
  title: string;
  property: 'border-radius' | 'margin' | 'padding' | 'border' | 'transform' | 'filter' | 'cursor' | 'opacity' | 'flexbox' | 'grid' | 'font-weight' | 'text-align' | 'background';
  description: string;
  style: CSSProperties;
  originalStyle?: CSSProperties;
  multipleItems?: boolean;
  textContent?: string;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
};

export const categories: Record<string, Category> = {
  basics: {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental CSS properties like borders, padding, and margin',
    icon: Square,
    color: 'hsl(var(--primary))'
  },
  layout: {
    id: 'layout', 
    name: 'Layout',
    description: 'Flexbox, Grid, and positioning properties',
    icon: Layout,
    color: 'hsl(160 60% 45%)'
  },
  effects: {
    id: 'effects',
    name: 'Visual Effects', 
    description: 'Transforms, filters, shadows, and visual styling',
    icon: SlidersHorizontal,
    color: 'hsl(280 65% 60%)'
  },
  typography: {
    id: 'typography',
    name: 'Typography',
    description: 'Font properties, text styling, and alignment',
    icon: Type,
    color: 'hsl(30 80% 55%)'
  },
  colors: {
    id: 'colors',
    name: 'Colors & Gradients',
    description: 'Color values, backgrounds, and gradient effects', 
    icon: Palette,
    color: 'hsl(340 75% 55%)'
  }
};

const sharedBoxStyle: CSSProperties = {
  width: '10rem',
  height: '10rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'hsl(var(--primary))',
  transition: 'all 0.3s ease-in-out',
};

export const quizQuestions: Question[] = [
  // BASICS CATEGORY
  {
    id: 'br1',
    category: 'basics',
    title: 'Guess That Curve',
    property: 'border-radius',
    description: "Which border-radius value creates this shape?",
    style: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
      { label: 'border-radius: 0.5rem;', isCorrect: false },
      { label: 'border-radius: 1rem;', isCorrect: true },
      { label: 'border-radius: 2rem;', isCorrect: false },
      { label: 'border-radius: 50%;', isCorrect: false },
    ],
  },
  {
    id: 'br2',
    category: 'basics',
    title: 'The Perfect Circle',
    property: 'border-radius',
    description: "What's the secret to a perfect circle with border-radius?",
    style: { ...sharedBoxStyle, borderRadius: '50%' },
    options: [
      { label: 'border-radius: 100px;', isCorrect: false },
      { label: 'border-radius: 100%;', isCorrect: false },
      { label: 'border-radius: 999px;', isCorrect: false },
      { label: 'border-radius: 50%;', isCorrect: true },
    ],
  },
  {
    id: 'b1',
    category: 'basics',
    title: 'Chunky Border',
    property: 'border',
    description: 'Which border value creates this thick outline?',
    style: { ...sharedBoxStyle, border: '10px solid hsl(var(--foreground))', borderRadius: '1rem' },
    options: [
      { label: "border: 5px solid ...;", isCorrect: false },
      { label: "border: 10px solid ...;", isCorrect: true },
      { label: "border: 15px solid ...;", isCorrect: false },
      { label: "outline: 10px solid ...;", isCorrect: false },
    ],
  },
  {
    id: 'b2',
    category: 'basics',
    title: 'Dashed Style',
    property: 'border',
    description: 'Which border-style is being used to create this effect?',
    style: { ...sharedBoxStyle, border: '5px dashed hsl(var(--foreground))', borderRadius: '1rem' },
    options: [
      { label: 'border-style: dotted;', isCorrect: false },
      { label: 'border-style: solid;', isCorrect: false },
      { label: 'border-style: groove;', isCorrect: false },
      { label: 'border-style: dashed;', isCorrect: true },
    ],
  },
  {
    id: 'm1',
    category: 'basics',
    title: 'A Little Breathing Room',
    property: 'margin',
    description: "How much margin is being applied to all sides of the blue box?",
    style: { ...sharedBoxStyle, width: '8rem', height: '8rem', margin: '2rem' },
    options: [
      { label: 'margin: 1rem;', isCorrect: false },
      { label: 'margin: 1.5rem;', isCorrect: false },
      { label: 'margin: 2rem;', isCorrect: true },
      { label: 'margin: 3rem;', isCorrect: false },
    ],
  },
  {
    id: 'm2',
    category: 'basics',
    title: 'Top and Bottom',
    property: 'margin',
    description: "What's the two-value margin shorthand for this element's spacing?",
    style: { ...sharedBoxStyle, width: '8rem', height: '8rem', margin: '3rem 1rem' },
    options: [
      { label: 'margin: 1rem 3rem;', isCorrect: false },
      { label: 'margin: 3rem 1rem;', isCorrect: true },
      { label: 'margin: 3rem;', isCorrect: false },
      { label: 'margin: 1rem;', isCorrect: false },
    ],
  },
  {
    id: 'p1',
    category: 'basics',
    title: 'Cozy Interior',
    property: 'padding',
    description: "The space inside the blue box is its padding. What's the value?",
    style: { ...sharedBoxStyle, padding: '1.5rem', borderRadius: '1rem' },
    options: [
      { label: 'padding: 1rem;', isCorrect: false },
      { label: 'padding: 2rem;', isCorrect: false },
      { label: 'padding: 1.5rem;', isCorrect: true },
      { label: 'padding: 0.5rem;', isCorrect: false },
    ],
  },
  {
    id: 'p2',
    category: 'basics',
    title: 'Wide Load',
    property: 'padding',
    description: "This box has different padding on its vertical and horizontal axes. What's the shorthand?",
    style: { ...sharedBoxStyle, padding: '1rem 3rem', borderRadius: '1rem' },
    options: [
      { label: 'padding: 3rem 1rem;', isCorrect: false },
      { label: 'padding: 1rem;', isCorrect: false },
      { label: 'padding: 3rem;', isCorrect: false },
      { label: 'padding: 1rem 3rem;', isCorrect: true },
    ],
  },

  // LAYOUT CATEGORY
  {
    id: 'flex1',
    category: 'layout',
    title: 'Center Stage',
    property: 'flexbox',
    description: 'This item is perfectly positioned in the center of its container. Which properties achieve this?',
    style: { 
      width: '12rem', 
      height: '8rem', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'hsl(var(--muted))',
      borderRadius: '0.5rem',
      border: '2px dashed hsl(var(--border))'
    },
    options: [
      { label: 'justify-content: center;\nalign-items: center;', isCorrect: true },
      { label: 'justify-content: center;\nalign-items: flex-start;', isCorrect: false },
      { label: 'justify-content: flex-start;\nalign-items: center;', isCorrect: false },
      { label: 'justify-content: space-between;\nalign-items: center;', isCorrect: false },
    ],
  },
  {
    id: 'flex2',
    category: 'layout',
    title: 'Equal Distribution',
    property: 'flexbox',
    description: 'These items have maximum space between them, pushing them to opposite ends. What\'s the property?',
    style: { 
      width: '12rem', 
      height: '6rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      backgroundColor: 'hsl(var(--muted))',
      borderRadius: '0.5rem',
      border: '2px dashed hsl(var(--border))',
      padding: '1rem'
    },
    multipleItems: true,
    options: [
      { label: 'justify-content: space-around;', isCorrect: false },
      { label: 'justify-content: space-between;', isCorrect: true },
      { label: 'justify-content: space-evenly;', isCorrect: false },
      { label: 'justify-content: center;', isCorrect: false },
    ],
  },
  {
    id: 'grid1',
    category: 'layout',
    title: 'Perfect Square',
    property: 'grid',
    description: 'This 2x2 layout creates equal-sized cells. Which property creates this structure?',
    style: { 
      width: '12rem', 
      height: '8rem', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '0.5rem',
      backgroundColor: 'hsl(var(--muted))',
      borderRadius: '0.5rem',
      border: '2px dashed hsl(var(--border))',
      padding: '1rem'
    },
    options: [
      { label: 'grid-template-columns: 50% 50%;', isCorrect: false },
      { label: 'grid-template-columns: 1fr 1fr;', isCorrect: true },
      { label: 'grid-template-columns: auto auto;', isCorrect: false },
      { label: 'grid-template-columns: repeat(3, 1fr);', isCorrect: false },
    ],
  },

  // EFFECTS CATEGORY
  {
    id: 't1',
    category: 'effects',
    title: 'Slight Tilt',
    property: 'transform',
    description: 'This element is slightly rotated. Which transform value achieves this?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', transform: 'rotate(6deg)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
      { label: 'transform: rotate(-6deg);', isCorrect: false },
      { label: 'transform: rotate(6deg);', isCorrect: true },
      { label: 'transform: skew(6deg);', isCorrect: false },
      { label: 'transform: scale(1.1);', isCorrect: false },
    ],
  },
  {
    id: 't2',
    category: 'effects',
    title: 'Size Boost',
    property: 'transform',
    description: 'This element appears larger than its original size while maintaining its proportions. How is this achieved?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', transform: 'scale(1.2)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
      { label: 'transform: scale(1.05);', isCorrect: false },
      { label: 'transform: scale(1.5);', isCorrect: false },
      { label: 'transform: scaleX(1.2);', isCorrect: false },
      { label: 'transform: scale(1.2);', isCorrect: true },
    ],
  },
  {
    id: 'f1',
    category: 'effects',
    title: 'Faded Out',
    property: 'filter',
    description: 'This element is faded. Which filter is being applied?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', filter: 'grayscale(100%)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
      { label: 'filter: brightness(0.5);', isCorrect: false },
      { label: 'filter: opacity(0.5);', isCorrect: false },
      { label: 'filter: grayscale(100%);', isCorrect: true },
      { label: 'filter: saturate(0);', isCorrect: false },
    ],
  },
  {
    id: 'f2',
    category: 'effects',
    title: 'Enhanced Intensity',
    property: 'filter',
    description: 'This element appears more vivid and intense than normal. Which property makes it stand out more?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', filter: 'contrast(150%)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
        { label: 'font-weight: bold;', isCorrect: false },
        { label: 'filter: saturate(150%);', isCorrect: false },
        { label: 'text-transform: uppercase;', isCorrect: false },
        { label: 'filter: contrast(150%);', isCorrect: true },
    ],
  },
  {
    id: 'f3',
    category: 'effects',
    title: 'Out of Focus',
    property: 'filter',
    description: 'This element appears soft and unfocused, like looking through frosted glass. Which effect creates this?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', filter: 'blur(4px)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
        { label: 'filter: blur(2px);', isCorrect: false },
        { label: 'filter: blur(4px);', isCorrect: true },
        { label: 'filter: brightness(80%);', isCorrect: false },
        { label: 'filter: drop-shadow(0 0 4px);', isCorrect: false },
    ],
  },
  {
    id: 'c1',
    category: 'effects',
    title: 'Interactive Hint',
    property: 'cursor',
    description: 'When you hover over this element, it signals that it can be clicked. Which property creates this behavior?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', cursor: 'pointer' },
    options: [
        { label: 'cursor: help;', isCorrect: false },
        { label: 'cursor: pointer;', isCorrect: true },
        { label: 'cursor: grab;', isCorrect: false },
        { label: 'cursor: default;', isCorrect: false },
    ],
  },
  {
    id: 'o1',
    category: 'effects',
    title: 'Ghost Mode',
    property: 'opacity',
    description: 'This element appears partially faded, allowing you to see through it. Which value creates this transparency level?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', opacity: 0.6 },
    options: [
      { label: 'opacity: 0.2;', isCorrect: false },
      { label: 'opacity: 0.8;', isCorrect: false },
      { label: 'opacity: 0.6;', isCorrect: true },
      { label: 'opacity: 1;', isCorrect: false },
    ],
  },

  // TYPOGRAPHY CATEGORY
  {
    id: 'font1',
    category: 'typography',
    title: 'Heavy Impact',
    property: 'font-weight',
    description: 'This text has extra thickness and visual weight. Which property value creates this effect?',
    style: { 
      ...sharedBoxStyle, 
      backgroundColor: 'transparent',
      fontSize: '2rem',
      fontWeight: '700',
      color: 'hsl(var(--primary))'
    },
    textContent: 'STRONG',
    options: [
      { label: 'font-weight: normal;', isCorrect: false },
      { label: 'font-weight: 500;', isCorrect: false },
      { label: 'font-weight: 700;', isCorrect: true },
      { label: 'font-weight: 900;', isCorrect: false },
    ],
  },
  {
    id: 'align1',
    category: 'typography', 
    title: 'Perfect Balance',
    property: 'text-align',
    description: 'This text is positioned equally from both edges of its container. What creates this positioning?',
    style: { 
      width: '12rem', 
      height: '6rem', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'hsl(var(--muted))',
      borderRadius: '0.5rem',
      border: '2px dashed hsl(var(--border))',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '1.2rem',
      color: 'hsl(var(--primary))'
    },
    textContent: 'Centered Text',
    options: [
      { label: 'text-align: left;', isCorrect: false },
      { label: 'text-align: center;', isCorrect: true },
      { label: 'text-align: right;', isCorrect: false },
      { label: 'text-align: justify;', isCorrect: false },
    ],
  },

  // COLORS CATEGORY
  {
    id: 'grad1',
    category: 'colors',
    title: 'Color Transition',
    property: 'background',
    description: 'This smooth color blend transitions from blue to purple. Which CSS creates this diagonal color effect?',
    style: { 
      ...sharedBoxStyle, 
      background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
      borderRadius: '1rem'
    },
    options: [
      { label: 'background: linear-gradient(45deg, blue, purple);', isCorrect: true },
      { label: 'background: radial-gradient(blue, purple);', isCorrect: false },
      { label: 'background: linear-gradient(90deg, purple, blue);', isCorrect: false },
      { label: 'background-color: blue;', isCorrect: false },
    ],
  },
];

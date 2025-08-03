import type { CSSProperties } from 'react';
import { Ruler, Scan } from 'lucide-react';

export type Question = {
  id: string;
  title: string;
  property: 'border-radius' | 'margin' | 'padding';
  description: string;
  style: CSSProperties;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
  Icon: React.ElementType;
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
  {
    id: 'br1',
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
    Icon: Scan,
  },
  {
    id: 'br2',
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
    Icon: Scan,
  },
  {
    id: 'br3',
    title: 'Asymmetrical Style',
    property: 'border-radius',
    description: 'This shape has different values for its corners. Can you spot the correct shorthand?',
    style: { ...sharedBoxStyle, borderRadius: '0.5rem 2rem' },
    options: [
      { label: 'border-radius: 2rem 0.5rem;', isCorrect: false },
      { label: 'border-radius: 0.5rem;', isCorrect: false },
      { label: 'border-radius: 0.5rem 2rem;', isCorrect: true },
      { label: 'border-radius: 2rem;', isCorrect: false },
    ],
    Icon: Scan,
  },
  {
    id: 'br4',
    title: 'All Four Corners',
    property: 'border-radius',
    description: 'A more complex shape this time. Which four-value shorthand is correct?',
    style: { ...sharedBoxStyle, borderRadius: '0.5rem 1rem 2rem 3rem' },
    options: [
      { label: '0.5rem 2rem 1rem 3rem', isCorrect: false },
      { label: '0.5rem 1rem 3rem 2rem', isCorrect: false },
      { label: '0.5rem 1rem 2rem 3rem', isCorrect: true },
      { label: '3rem 2rem 1rem 0.5rem', isCorrect: false },
    ],
    Icon: Scan,
  },
  {
    id: 'm1',
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
    Icon: Ruler,
  },
  {
    id: 'm2',
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
    Icon: Ruler,
  },
  {
    id: 'p1',
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
    Icon: Ruler,
  },
  {
    id: 'p2',
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
    Icon: Ruler,
  },
  {
    id: 'm3',
    title: 'The Lone Margin',
    property: 'margin',
    description: 'Only one side has margin. Which property is it?',
    style: { ...sharedBoxStyle, width: '8rem', height: '8rem', marginLeft: '4rem' },
    options: [
      { label: 'margin-right: 4rem;', isCorrect: false },
      { label: 'margin-left: 4rem;', isCorrect: true },
      { label: 'margin-top: 4rem;', isCorrect: false },
      { label: 'margin-bottom: 4rem;', isCorrect: false },
    ],
    Icon: Ruler,
  },
  {
    id: 'p3',
    title: 'Padded Top',
    property: 'padding',
    description: 'The internal spacing is only at the top. Can you identify the correct property?',
    style: { ...sharedBoxStyle, paddingTop: '3rem', borderRadius: '1rem' },
    options: [
      { label: 'padding-bottom: 3rem;', isCorrect: false },
      { label: 'padding: 3rem;', isCorrect: false },
      { label: 'padding-left: 3rem;', isCorrect: false },
      { label: 'padding-top: 3rem;', isCorrect: true },
    ],
    Icon: Ruler,
  },
];

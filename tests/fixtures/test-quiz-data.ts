import type { CSSProperties } from 'react';

export type Question = {
  id: string;
  category: string;
  title: string;
  property: 'border-radius' | 'margin' | 'padding' | 'border' | 'transform' | 'filter' | 'cursor' | 'opacity' | 'flexbox' | 'grid' | 'box-shadow' | 'font-weight' | 'text-align' | 'background';
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

const sharedBoxStyle: CSSProperties = {
  width: '10rem',
  height: '10rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'hsl(var(--primary))',
  transition: 'all 0.3s ease-in-out',
};

export const testQuizQuestions: Question[] = [
  // Sample questions for testing - using a subset of the actual questions
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
];
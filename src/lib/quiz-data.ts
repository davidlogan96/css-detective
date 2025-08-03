import type { CSSProperties } from 'react';
import { Ruler, Scan, Square, MousePointer, SlidersHorizontal } from 'lucide-react';

export type Question = {
  id: string;
  title: string;
  property: 'border-radius' | 'margin' | 'padding' | 'box-shadow' | 'transform' | 'filter';
  description: string;
  style: CSSProperties;
  originalStyle?: CSSProperties;
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

const shadowColor = 'hsl(0 0% 80% / 0.1)';

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
    id: 'bs1',
    title: 'Subtle Shadow',
    property: 'box-shadow',
    description: 'Which box-shadow value creates this subtle lift effect?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', boxShadow: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -2px ${shadowColor}` },
    options: [
      { label: 'shadow-sm', isCorrect: false },
      { label: 'shadow-md', isCorrect: true },
      { label: 'shadow-lg', isCorrect: false },
      { label: 'shadow-xl', isCorrect: false },
    ],
    Icon: Square,
  },
  {
    id: 'bs2',
    title: 'Deep Shadow',
    property: 'box-shadow',
    description: 'This shadow is much more pronounced. Which one is it?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', boxShadow: `0 20px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColor}` },
    options: [
        { label: 'shadow-lg', isCorrect: false },
        { label: 'shadow-xl', isCorrect: false },
        { label: 'shadow-2xl', isCorrect: true },
        { label: 'shadow-inner', isCorrect: false },
    ],
    Icon: Square,
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
    id: 't1',
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
    Icon: MousePointer,
  },
  {
    id: 't2',
    title: 'Bigger and Bolder',
    property: 'transform',
    description: 'How is this element being enlarged?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', transform: 'scale(1.2)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
      { label: 'transform: scale(1.05);', isCorrect: false },
      { label: 'transform: scale(1.5);', isCorrect: false },
      { label: 'transform: scaleX(1.2);', isCorrect: false },
      { label: 'transform: scale(1.2);', isCorrect: true },
    ],
    Icon: MousePointer,
  },
  {
    id: 'f1',
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
    Icon: SlidersHorizontal,
  },
    {
    id: 'f2',
    title: 'High Contrast',
    property: 'filter',
    description: 'Which filter property is making this element pop?',
    style: { ...sharedBoxStyle, borderRadius: '1rem', filter: 'contrast(150%)' },
    originalStyle: { ...sharedBoxStyle, borderRadius: '1rem' },
    options: [
        { label: 'filter: contrast(100%);', isCorrect: false },
        { label: 'filter: contrast(200%);', isCorrect: false },
        { label: 'filter: brightness(150%);', isCorrect: false },
        { label: 'filter: contrast(150%);', isCorrect: true },
    ],
    Icon: SlidersHorizontal,
  },
];

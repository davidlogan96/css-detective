# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on port 9002 with Turbopack)
- **Build**: `npm run build` 
- **Production start**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: `npm run typecheck`
- **Testing**: `npm test` (runs Playwright tests)
- **Testing (headed)**: `npm run test:headed` (runs tests with browser UI)
- **Testing (interactive)**: `npm run test:ui` (opens Playwright UI)
- **Testing (debug)**: `npm run test:debug` (runs tests with debugging)
- **Test reports**: `npm run test:report` (shows test results)

## Architecture Overview

This is a Next.js application built with React and TypeScript for a CSS quiz game called "CSS Detective". The application uses Firebase/Google Cloud infrastructure.

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: shadcn/ui component library
- **Testing**: Playwright for end-to-end testing
- **Deployment**: Firebase App Hosting

### Project Structure
- `src/app/`: Next.js app router pages and layout
- `src/components/`: React components including quiz components and shadcn/ui components
- `src/hooks/`: Custom React hooks
- `src/lib/`: Utility functions and quiz data
- `tests/`: Playwright end-to-end tests

### Component Architecture
The main quiz functionality is built with:

1. **Main Quiz Component** (`src/components/quiz.tsx`): Handles quiz flow, state management, and UI rendering
2. **Quiz Data** (`src/lib/quiz-data.ts`): Contains question definitions and data structures
3. **UI Components** (`src/components/ui/`): shadcn/ui components for consistent styling

### Quiz System
The quiz displays CSS questions with visual examples and multiple choice answers. It includes:
- Question shuffling and progression
- Visual CSS property demonstrations
- Score tracking and completion states
- Responsive design with mobile support

### Styling System
- Tailwind CSS with custom configuration
- shadcn/ui design system
- CSS custom properties for theming
- Dark mode support

### Development Notes
- The application runs on port 9002 to avoid conflicts
- There are additional quiz components (`css-detective-quiz.tsx`) that appear to be works in progress for integration
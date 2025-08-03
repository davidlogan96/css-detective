import Quiz from '@/components/quiz';
import { Puzzle } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-full mb-4">
          <Puzzle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          CSS Detective
        </h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-xl">
          Put your design eye to the test! Can you match the CSS properties to the visual result?
        </p>
      </div>
      <Quiz />
    </main>
  );
}

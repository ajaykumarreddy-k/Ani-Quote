import React from 'react';
import Particles from './components/Particles/Particles';
import QuoteCard from './features/quotes/components/QuoteCard';
import { useRandomQuote } from './features/quotes/hooks/useRandomQuote';
import Footer from './components/Footer/Footer';

import MusicButton from './components/MusicButton/MusicButton';

const App: React.FC = () => {
  const { quote, loading, getQuote } = useRandomQuote();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <MusicButton />
      {/* Background Particles - Z-Index 0 */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#b026ff', '#4deeea', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          className="h-full w-full"
        />
      </div>

      {/* Main Content - Z-Index 10 */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        <img src="/Logo.png" alt="Logo" className="w-120 h-64 mb-8" />
        <QuoteCard 
          quote={quote} 
          loading={loading} 
          onFetchNew={getQuote} 
        />
        
        <Footer />
      </main>
    </div>
  );
};

export default App;
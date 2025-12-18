import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { RefreshCw, Quote as QuoteIcon } from 'lucide-react';
import { AnimeQuote } from '../../../types';

interface QuoteCardProps {
  quote: AnimeQuote | null;
  loading: boolean;
  onFetchNew: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, loading, onFetchNew }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const animeRef = useRef<HTMLHeadingElement>(null);
  const charRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initial Entrance Animation for the card itself
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        scale: 0.95,
        ease: "power3.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, []);

  // Content Update Animation (Text elements)
  useLayoutEffect(() => {
    // Only animate if there is a quote and we are not loading
    if (!quote || loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset positions to starting state (hidden + pushed down)
      gsap.set([animeRef.current, quoteTextRef.current, charRef.current], {
        opacity: 0,
        y: 30
      });

      // Staggered animation sequence: Anime -> Quote -> Character
      tl.to(animeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
      .to(quoteTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
      }, "-=0.6") // Overlap: Start 0.2s after anime name starts
      .to(charRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.8"); // Overlap: Start 0.2s after quote text starts
    });

    return () => ctx.revert();
  }, [quote, loading]);

  // Button Hover Animation
  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
  };
  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };
  const handleClick = () => {
    // Spin icon
    gsap.to(".refresh-icon", { rotation: "+=360", duration: 0.6, ease: "power2.inOut" });
    onFetchNew();
  };

  return (
    <div 
      ref={cardRef}
      className="glass-panel relative w-full max-w-2xl p-8 md:p-12 rounded-3xl mx-4 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-neonPurple rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neonBlue rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-pulse"></div>

      {/* Quote Icon */}
      <div className="mb-6 text-neonBlue opacity-80">
        <QuoteIcon size={40} fill="currentColor" />
      </div>

      {/* Anime Title */}
      <h2 
        ref={animeRef}
        className="text-lg md:text-xl tracking-widest uppercase text-gray-300 font-tunder mb-6 opacity-0"
      >
        {quote?.anime || "Anime"}
      </h2>

      {/* Quote Text */}
      <div className="min-h-[120px] flex items-center justify-center mb-8 relative w-full">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <p 
            ref={quoteTextRef}
            className="text-xl md:text-3xl font-serif leading-relaxed text-white text-glow opacity-0 max-w-lg mx-auto"
          >
            "{quote?.quote}"
          </p>
        )}
      </div>

      {/* Character Name */}
      <p 
        ref={charRef}
        className="text-xl md:text-2xl text-neonPurple font-tunder mb-10 opacity-0"
      >
        — {quote?.character}
      </p>

      {/* Action Button */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={loading}
        className="btn-hover-effect relative group overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/20 hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center gap-2 font-sans font-semibold tracking-wide text-sm md:text-base">
          <RefreshCw className="refresh-icon w-4 h-4" />
          NEW QUOTE
        </span>
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default QuoteCard;
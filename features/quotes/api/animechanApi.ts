import { AnimeQuote, QuoteResponse } from '../../../types';

// Fallback quotes in case the free API is down or rate-limited
const FALLBACK_QUOTES: AnimeQuote[] = [
  {
    anime: "Tengen Toppa Gurren Lagann",
    character: "Kamina",
    quote: "Don't believe in yourself. Believe in me! Believe in the Kamina who believes in you!"
  },
  {
    anime: "Cowboy Bebop",
    character: "Spike Spiegel",
    quote: "Whatever happens, happens."
  },
  {
    anime: "Fullmetal Alchemist",
    character: "Edward Elric",
    quote: "A lesson without pain is meaningless. That's because no one can gain without sacrificing something."
  },
  {
    anime: "Naruto",
    character: "Itachi Uchiha",
    quote: "People live their lives bound by what they accept as correct and true. That is how they define 'reality'."
  }
];

export const fetchRandomQuote = async (): Promise<AnimeQuote> => {
  try {
    const response = await fetch('https://animechan.io/api/v1/quotes/random');
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    
    // Check if response matches the "data" wrapper structure or flat structure
    if (json.status === 'success' && json.data) {
      return {
        anime: json.data.anime.name,
        character: json.data.character.name,
        quote: json.data.content
      };
    } else if (json.anime && json.character && json.quote) {
       // Sometimes API returns flat structure
       return json as AnimeQuote;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.warn("AnimeChan API failed, using fallback.", error);
    // Return a random fallback quote
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
};
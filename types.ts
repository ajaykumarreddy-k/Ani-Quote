export interface AnimeQuote {
  anime: string;
  character: string;
  quote: string;
}

export interface QuoteResponse {
  status: string;
  data: {
    content: string;
    anime: {
      name: string;
    };
    character: {
      name: string;
    };
  };
}

// Minimal types for OGL since we don't have the library types installed
export type OGLContext = any;
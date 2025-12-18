import { useState, useEffect, useCallback } from 'react';
import { AnimeQuote } from '../../../types';
import { fetchRandomQuote } from '../api/animechanApi';

export const useRandomQuote = () => {
  const [quote, setQuote] = useState<AnimeQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRandomQuote();
      setQuote(data);
    } catch (err) {
      setError('Failed to fetch quote. Please try again.');
    } finally {
      // Small delay to let animations finish/start smoothly
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    getQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { quote, loading, error, getQuote };
};
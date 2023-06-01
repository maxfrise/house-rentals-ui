import { useCallback, useEffect, useState } from 'react';

export const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const mqListener = useCallback((e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
  }, []);

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    darkThemeMq.addEventListener('change', mqListener);

    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, [mqListener]);

  useEffect(() => {
    setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return isDarkTheme;
}
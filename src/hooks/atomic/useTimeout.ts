import { useCallback, useRef, useEffect } from 'react';

const useTimeout = (onTimeout: () => void, delay?: number) => {
  const latestOnTimeoutRef = useRef(onTimeout);

  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    latestOnTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const startTimer = useCallback(() => {
    if (delay === null || delay === undefined) return;

    timeoutIdRef.current = window.setTimeout(() => latestOnTimeoutRef.current(), delay);
  }, [delay]);

  const clearTimer = useCallback(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    startTimer();
  }, [clearTimer, startTimer]);

  return { resetTimer, clearTimer };
};

export default useTimeout;

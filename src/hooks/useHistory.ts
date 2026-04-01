import { useState, useCallback, useRef } from 'react';

export function useHistory<T>(initialState: T | (() => T)) {
  const [state, setState] = useState<T>(initialState);
  const historyRef = useRef<T[]>([]);
  const pointerRef = useRef(0);

  // Initialize history on first render
  if (historyRef.current.length === 0) {
    historyRef.current = [typeof initialState === 'function' ? (initialState as any)() : initialState];
  }

  const setWithHistory = useCallback((value: T | ((val: T) => T)) => {
    setState((prev) => {
      const resolvedValue = typeof value === 'function' ? (value as Function)(prev) : value;
      
      const p = pointerRef.current;
      const history = historyRef.current;
      
      // Slice history to the current pointer (removes 'future' states if we undo'd then edited)
      const newHistory = history.slice(0, p + 1);
      newHistory.push(resolvedValue);
      
      // Limit history stack size to 50
      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        pointerRef.current = p + 1;
      }
      historyRef.current = newHistory;
      
      return resolvedValue;
    });
  }, []);

  const undo = useCallback(() => {
    const p = pointerRef.current;
    if (p > 0) {
      pointerRef.current = p - 1;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    const p = pointerRef.current;
    const history = historyRef.current;
    if (p < history.length - 1) {
      pointerRef.current = p + 1;
      setState(history[pointerRef.current]);
    }
  }, []);

  const resetHistory = useCallback((value: T) => {
    setState(value);
    historyRef.current = [value];
    pointerRef.current = 0;
  }, []);

  return [state, setWithHistory, undo, redo, resetHistory] as const;
}

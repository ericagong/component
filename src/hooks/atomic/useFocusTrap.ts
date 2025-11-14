import { useEffect } from 'react';
import type { RefObject } from 'react';

type UseFocusTrapParams = {
  shouldTrapOnFocus: boolean;
  targetRef: RefObject<HTMLElement | null>;
};

const FOCUSABLE_SELECTOR = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

const trapFocus = ({ e, $target }: { e: KeyboardEvent; $target: HTMLElement }) => {
  if (e.key !== 'Tab') return;

  const $focusables = [...$target.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];

  if ($focusables.length === 0) return;

  const $firstFocusable = $focusables[0];
  const $lastFocusable = $focusables[$focusables.length - 1];
  const $currentFocused = document.activeElement;

  if (e.shiftKey && $currentFocused === $firstFocusable) {
    // firstFocusable에서 shift + tab을 누른 경우, last focusable로 이동
    e.preventDefault();
    $lastFocusable.focus();
  } else if (!e.shiftKey && $currentFocused === $lastFocusable) {
    // lastFocusable에서 tab을 누른 경우, first focusable로 이동
    e.preventDefault();
    $firstFocusable.focus();
  }
};

const useFocusTrap = ({ shouldTrapOnFocus, targetRef }: UseFocusTrapParams) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!shouldTrapOnFocus) return;

      const $target = targetRef.current;

      if (!$target) return;

      trapFocus({ e, $target });
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldTrapOnFocus, targetRef]);
};

export default useFocusTrap;

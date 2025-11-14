import { useEffect } from 'react';
import type { RefObject } from 'react';

type UseFocusTrapParams = {
  isOpen: boolean;
  targetRef: RefObject<HTMLElement | null>;
};

const FOCUSABLE_SELECTOR = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

// TODO 향후 중첩 모달로 확장 시 변경 (현재 단일 모달 가정)
const useFocusTrap = ({ isOpen, targetRef }: UseFocusTrapParams) => {
  useEffect(() => {
    if (!isOpen) return;

    const $target = targetRef.current;

    if (!$target) return;

    const $focusables = [...$target.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];

    if ($focusables.length === 0) return;

    const $firstFocusable = $focusables[0];
    const $lastFocusable = $focusables[$focusables.length - 1];

    $firstFocusable.focus();

    const onFocusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const $currentFocused = document.activeElement;

      if (e.shiftKey) {
        // firstFocusable에서 shift + tab을 누른 경우, last focusable로 이동
        if ($currentFocused === $firstFocusable) {
          e.preventDefault();
          $lastFocusable.focus();
        }
      } else {
        // lastFocusable에서 tab을 누른 경우, first focusable로 이동
        if ($currentFocused === $lastFocusable) {
          e.preventDefault();
          $firstFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', onFocusTrapHandler);

    return () => document.removeEventListener('keydown', onFocusTrapHandler);
  }, [isOpen, targetRef]);
};

export default useFocusTrap;

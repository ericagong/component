type Placement = 'top' | 'bottom' | 'left' | 'right';

type Rects = {
  anchorRect: DOMRect;
  floatingRect: DOMRect;
};

type ComputedStyle = {
  x: number;
  y: number;
  placement: Placement;
};

type Middleware = (rects: Rects, computed: ComputedStyle) => ComputedStyle;

type FloatingOptions = {
  placement: Placement;
  offset: number;
  flip: boolean;
  clamp: boolean;
};

// -----------------------------------------
// 1. 기본 위치 계산
// -----------------------------------------
const calculatePosition = (anchorRect: DOMRect, floatingRect: DOMRect, placement: Placement) => {
  const centerX = anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2;
  const centerY = anchorRect.top + anchorRect.height / 2 - floatingRect.height / 2;

  switch (placement) {
    case 'top':
      return { x: centerX, y: anchorRect.top - floatingRect.height };
    case 'bottom':
      return { x: centerX, y: anchorRect.bottom };
    case 'left':
      return { x: anchorRect.left - floatingRect.width, y: centerY };
    case 'right':
      return { x: anchorRect.right, y: centerY };
  }
};

// -----------------------------------------
// 2. placement
// -----------------------------------------
const placementMiddleware =
  (basePlacement: Placement): Middleware =>
  (rects, prev) => {
    const { x, y } = calculatePosition(rects.anchorRect, rects.floatingRect, basePlacement);

    return { ...prev, x, y, placement: basePlacement };
  };

// -----------------------------------------
// 3. flip
// -----------------------------------------
const isOutOfViewportTop = (anchor: DOMRect, floating: DOMRect, offset: number) =>
  anchor.top - floating.height - offset < 0;

const isOutOfViewportBottom = (anchor: DOMRect, floating: DOMRect, offset: number) =>
  window.innerHeight < anchor.bottom + floating.height + offset;

const isOutOfViewportLeft = (anchor: DOMRect, floating: DOMRect, offset: number) =>
  anchor.left - floating.width - offset < 0;

const isOutOfViewportRight = (anchor: DOMRect, floating: DOMRect, offset: number) =>
  window.innerWidth < anchor.right + floating.width + offset;

const flipMiddleware =
  (offset: number): Middleware =>
  (rects, prev) => {
    const { anchorRect, floatingRect } = rects;
    let { placement } = prev;

    if (placement === 'top' && isOutOfViewportTop(anchorRect, floatingRect, offset)) placement = 'bottom';
    else if (placement === 'bottom' && isOutOfViewportBottom(anchorRect, floatingRect, offset)) placement = 'top';
    else if (placement === 'left' && isOutOfViewportLeft(anchorRect, floatingRect, offset)) placement = 'right';
    else if (placement === 'right' && isOutOfViewportRight(anchorRect, floatingRect, offset)) placement = 'left';

    if (placement !== prev.placement) {
      const pos = calculatePosition(anchorRect, floatingRect, placement);

      return { ...prev, ...pos, placement };
    }

    return prev;
  };

// -----------------------------------------
// 4. offset
// -----------------------------------------
const offsetMiddleware =
  (offset: number): Middleware =>
  (_, prev) => {
    let { x, y } = prev;
    const { placement } = prev;

    if (placement === 'top') y -= offset;

    if (placement === 'bottom') y += offset;

    if (placement === 'left') x -= offset;

    if (placement === 'right') x += offset;

    return { ...prev, x, y };
  };

// -----------------------------------------
// 5. clamp
// -----------------------------------------
const clampIntoViewport = (x: number, y: number, floatingRect: DOMRect) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return {
    x: Math.min(Math.max(0, x), vw - floatingRect.width),
    y: Math.min(Math.max(0, y), vh - floatingRect.height),
  };
};

const clampMiddleware = (): Middleware => (rects, prev) => {
  const { x, y } = clampIntoViewport(prev.x, prev.y, rects.floatingRect);

  return { ...prev, x, y };
};

// -----------------------------------------
// 6. 전체 계산 파이프라인
// -----------------------------------------
const computeFloatingStyle = (rects: Rects, FloatingOptions: FloatingOptions): ComputedStyle => {
  const { placement, offset, flip, clamp } = FloatingOptions;

  const middlewares: Middleware[] = [
    placementMiddleware(placement),
    flip ? flipMiddleware(offset) : null,
    offsetMiddleware(offset),
    clamp ? clampMiddleware() : null,
  ].filter(Boolean) as Middleware[];

  return middlewares.reduce((computed, middleware) => middleware(rects, computed), { x: 0, y: 0, placement });
};

export default computeFloatingStyle;
export type { Placement, Rects, FloatingOptions, ComputedStyle };

# Setup

pnpm install

# Env

- npm 라이브러리 배포(CD)

- storybook 배포(자동)

# Test

- unit 테스트(node + vitest)
- ui 테스트(jsdom + vitest + RTL)
- e2e/스토리북 테스트(storybook + vite)

# Todo

## 목표: 빠른 MVP UI 완성 + 구조 통일

### 컴포넌트 패턴 통일해 빠르게 구현

- UI = headless + compound
- Logic = hook
- 폴더 구조

  ```
  src/components/
  ├─ [feature]/
  │   ├─ [Feature]Root.tsx
  │   ├─ [Feature]Sub1.tsx
  │   ├─ [Feature]Sub2.tsx
  │   ├─ use[Feature]State.ts
  │   ├─ [Feature].stories.tsx
  │   └─ __tests__/
  │        └─ [Feature].test.tsx
  src/hooks/ui/
  ├─ observer/
  ├─ scroll/
  ├─ overlay/
  └─ form/
  ```

### 이후 기능 추가

- API 확장
- 접근성
- User Interactive하게 기능 추가

## 진행 상황

1. Core Interaction (상태/토글)

- Accordion
- Tabs
- Tooltip

2. Scroll with Observer (가시성/스크롤)

- LazyImage
- InfiniteScroll
- HorizontalScroll
- ScrollSpy

3. Form (입력/레이아웃)

- ResponsiveTextarea
- ClampText
- SelectBox
- AutoComplete

4. Overlay(포커스/알림)

- Snackbar
- Modal
- Popover

5. Media + Drag(시각/조작)

- ImageSlide
- Carousel
- Gallery
- DragAndDropList

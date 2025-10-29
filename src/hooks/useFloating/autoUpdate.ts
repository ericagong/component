const autoUpdate = ($anchor: HTMLElement, $floating: HTMLElement, update: () => void) => {
  update(); // 최초 1회 실행 (초기 위치 계산)

  const ro = new ResizeObserver(update);
  ro.observe($anchor);
  ro.observe($floating);

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  return () => {
    ro.disconnect();
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
};

export default autoUpdate;

import { useRef } from 'react';

import cx from './cx';

import useTrackCore from '@/hooks/features/track/useTrackCore';


const slides = [1, 2, 3, 4, 5];

const Carousel = () => {
  const { viewportRef, trackRef, currentIndex, next, prev, goTo } = useTrackCore({
    slideCount: slides.length,
    mode: 'carousel',
  });

  return (
    <div className={cx('carousel-container')}>
      {/* Viewport */}
      <div className={cx('carousel-viewport')} ref={viewportRef}>
        <div className={cx('carousel-track')} ref={trackRef}>
          {slides.map((s) => (
            <div key={s} className={cx('slide')}>
              <img src={`https://picsum.photos/seed/${s}/600/300`} alt={`slide-${s}`} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Prev Button */}
      <button className={cx('nav-button', 'nav-left')} onClick={prev} />
      {/* Next Button */}
      <button className={cx('nav-button', 'nav-right')} onClick={next} />

      {/* Pagination Example */}
      <div className={cx('pagination')}>
        {slides.map((_, i) => (
          <button key={i} className={cx('dot', { active: i === currentIndex })} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

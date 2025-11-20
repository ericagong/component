import cx from './cx'; // classnames/bind로 만든 cx

import useTrackCore from '@/hooks/features/track/useTrackCore';

const slides = [1, 2, 3, 4, 5];

const Slider = () => {
  const { next, prev, trackRef } = useTrackCore({
    slideCount: slides.length,
  });

  return (
    <div className={cx('slider-container')}>
      <button className={cx('nav-button', 'nav-left')} onClick={prev} />

      <div className={cx('slider-viewport')}>
        <div className={cx('slider-track')} ref={trackRef}>
          {slides.map((s) => (
            <div key={s} className={cx('slide')}>
              <img src={`https://picsum.photos/seed/${s}/600/320`} alt={`slide-${s}`} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={cx('nav-button', 'nav-right')} onClick={next} />
    </div>
  );
};

export default Slider;

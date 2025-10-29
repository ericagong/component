import cx from './cx';
import { useLineClampContext } from './LineClampRoot';

const LineClampMoreButton = () => {
  const { isClamped, toggleClamp } = useLineClampContext();

  if (!isClamped) return null;

  return (
    <button
      type='button'
      className={cx('show-more-button')}
      onClick={() => toggleClamp()}
      aria-label='전체 텍스트 펼치기'
    />
  );
};

export default LineClampMoreButton;

import cx from './cx';
import { useLineClampContext } from './LineClampRoot';

const LineClampMoreButton = () => {
  const { isClamped, isExpanded, toggle } = useLineClampContext();

  if (!isClamped || isExpanded) return null; // 💡 펼쳐진 상태면 숨김

  return <button type='button' className={cx('expand-button')} onClick={toggle} aria-label='전체 텍스트 펼치기' />;
};

export default LineClampMoreButton;

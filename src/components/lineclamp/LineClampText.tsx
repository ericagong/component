import cx from './cx';
import LineClampMoreButton from './LineClampMoreButton';
import { useLineClampContext } from './LineClampRoot';

const LineClampText = () => {
  const { targetRef, cloneRef, text, maxLines, isClamped } = useLineClampContext();

  return (
    <div className={cx('root')} data-state={isClamped ? 'clamped' : 'open'}>
      <div ref={cloneRef} className={cx('clone')}>
        {text}
      </div>
      <div ref={targetRef} className={cx('text')} style={{ WebkitLineClamp: maxLines }}>
        {text}
      </div>
      <LineClampMoreButton />
    </div>
  );
};

export default LineClampText;

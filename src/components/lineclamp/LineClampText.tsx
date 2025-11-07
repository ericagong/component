import type { Ref } from 'react';

import cx from './cx';
import LineClampMoreButton from './LineClampMoreButton';
import { useLineClampContext } from './LineClampRoot';

const LineClampText = () => {
  const { targetRef, cloneRef, text, maxLines, isClamped } = useLineClampContext();

  return (
    <div className={cx('root')} data-state={isClamped ? 'clamped' : 'is-expanded'}>
      {/* 측정용 clone */}
      <div ref={cloneRef as Ref<HTMLDivElement>} className={cx('clone')} aria-hidden='true'>
        {text}
      </div>

      {/* 실제 표시되는 텍스트 */}
      <div ref={targetRef as Ref<HTMLDivElement>} className={cx('text')} style={{ WebkitLineClamp: maxLines }}>
        {text}
      </div>

      <LineClampMoreButton />
    </div>
  );
};

export default LineClampText;

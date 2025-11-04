import type { PropsWithChildren } from 'react';

import { useScrollBoxContext } from './ScrollBoxRoot';
import Sentinel from './Sentinel';
import cx from './cx';

const ScrollBoxContainer = ({ children }: PropsWithChildren) => {
  const { listRef } = useScrollBoxContext();

  return (
    <ul ref={listRef} className={cx('list')}>
      {/* 왼쪽 끝 감시 센서 */}
      <Sentinel direction='prev' />
      {children}
      {/* 오른쪽 끝 감시 센서 */}
      <Sentinel direction='next' />
    </ul>
  );
};

export default ScrollBoxContainer;

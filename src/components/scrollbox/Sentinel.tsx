import { useScrollBoxContext } from './ScrollBoxRoot';
import cx from './cx';

import type { ButtonDirection } from '@/hooks/features/useScrollButtonsState';

type SentinelProps = { direction: ButtonDirection };

const Sentinel = ({ direction }: SentinelProps) => {
  const { sentinelRefs } = useScrollBoxContext();

  const index = direction === 'prev' ? 0 : 1;

  return (
    <li
      ref={(el) => {
        sentinelRefs.current[index] = el;
      }}
      className={cx('sentinel')}
      data-direction={direction}
    />
  );
};

export default Sentinel;

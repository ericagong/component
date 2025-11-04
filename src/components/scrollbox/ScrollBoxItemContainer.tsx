import { useScrollBoxContext } from './ScrollBoxRoot';
import cx from './cx';

type ItemProps = React.PropsWithChildren<{ index: number }>;

const Item = ({ index, children }: ItemProps) => {
  const { itemRefs } = useScrollBoxContext();

  return (
    <li
      ref={(el) => {
        itemRefs.current[index] = el;
      }}
      className={cx('item')}
    >
      {children}
    </li>
  );
};

export default Item;

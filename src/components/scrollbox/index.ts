import ScrollBoxRoot from './ScrollBoxRoot';
import ScrollBoxContainer from './ScrollBoxContainer';
import ScrollBoxItemContainer from './ScrollBoxItemContainer';
import ScrollBoxButton from './ScrollBoxButton';

const ScrollBox = Object.assign(ScrollBoxRoot, {
  Content: ScrollBoxContainer,
  Item: ScrollBoxItemContainer,
  Button: ScrollBoxButton,
});

export default ScrollBox;

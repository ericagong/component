import TextBoxRoot from './TextBoxRoot';
import TextBoxArea from './TextBoxArea';

const TextBox = Object.assign(TextBoxRoot, {
  Area: TextBoxArea,
});

export default TextBox;

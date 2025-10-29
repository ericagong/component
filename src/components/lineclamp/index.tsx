import LineClampRoot from './LineClampRoot';
import LineClampText from './LineClampText';

type LineClampProps = {
  text: string;
  maxLines?: number;
};

const LineClamp = ({ text, maxLines = 3 }: LineClampProps) => {
  return (
    <LineClampRoot text={text} maxLines={maxLines}>
      <LineClampText />
    </LineClampRoot>
  );
};

export default LineClamp;

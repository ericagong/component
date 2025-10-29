import type { TextareaHTMLAttributes } from 'react';

import { useTextBoxContext } from './TextBoxRoot';
import cx from './cx';

type TextBoxAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextBoxArea = (props: TextBoxAreaProps) => {
  const { targetRef, cloneRef } = useTextBoxContext();

  return (
    <div className={cx('container')}>
      <textarea ref={cloneRef} className={cx('clone')} readOnly tabIndex={-1} aria-hidden='true' />
      <textarea
        {...props}
        ref={targetRef}
        className={cx('textarea', props.className)}
        placeholder={props.placeholder ?? '텍스트를 입력해주세요.'}
      />
    </div>
  );
};

export default TextBoxArea;

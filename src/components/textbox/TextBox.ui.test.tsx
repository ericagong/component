import { render, screen } from '@testing-library/react';

import TextBox from '@/components/textbox';

describe('TextBox', () => {
  test('기본 렌더링 및 placeholder가 표시된다', () => {
    render(
      <TextBox>
        <TextBox.Area placeholder='플레이스홀더' />
      </TextBox>,
    );

    expect(screen.getByPlaceholderText('플레이스홀더')).toBeInTheDocument();
  });

  test('minRows/maxRows 설정 시 컴포넌트가 정상 렌더링된다', () => {
    render(
      <TextBox minRows={5} maxRows={10}>
        <TextBox.Area placeholder='rows 제한 테스트' />
      </TextBox>,
    );

    expect(screen.getByPlaceholderText('rows 제한 테스트')).toBeInTheDocument();
  });
});

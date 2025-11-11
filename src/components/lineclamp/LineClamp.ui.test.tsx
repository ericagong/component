import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LineClamp from '@/components/lineclamp';

describe('LineClamp', () => {
  describe('Smoke', () => {
    test('텍스트가 줄이 넘어가지 않으면, 전체 텍스트가 표시된다', () => {
      render(<LineClamp text='적당한 텍스트입니다.' maxLines={2} />);
      const textElements = screen.getAllByText('적당한 텍스트입니다.');
      const actualText = textElements.find((el) => el.getAttribute('aria-hidden') !== 'true');

      expect(actualText).toBeVisible();
    });

    test.skip('텍스트가 줄이 넘어가면 더보기 버튼이 표시된다', () => {
      // 테스트 환경에서 실제 높이 계산이 안 되어 클램프 감지가 어려움
      render(
        <LineClamp
          text='긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다.'
          maxLines={2}
        />,
      );

      const expandButton = screen.queryByRole('button', { name: '전체 텍스트 펼치기' });
      expect(expandButton).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    describe('기본 동작', () => {
      test.skip('더보기 버튼을 클릭하면 텍스트가 펼쳐지고 버튼이 사라진다', async () => {
        // 테스트 환경에서 실제 높이 계산이 안 되어 클램프 감지가 어려움
        render(
          <LineClamp
            text='긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다.'
            maxLines={2}
          />,
        );

        const expandButton = screen.getByRole('button', { name: '전체 텍스트 펼치기' });

        expect(expandButton).toBeVisible();

        await userEvent.click(expandButton);

        expect(screen.queryByRole('button', { name: '전체 텍스트 펼치기' })).not.toBeVisible();

        const textElements = screen.getAllByText(
          '긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다. 긴 텍스트입니다.',
        );
        const actualText = textElements.find((el) => el.getAttribute('aria-hidden') !== 'true');

        expect(actualText).toBeVisible();
      });
    });
  });
});

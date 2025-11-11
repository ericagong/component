import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from '@/components/tooltip';

const setup = () => {
  render(
    <Tooltip>
      <Tooltip.Trigger>툴팁 버튼</Tooltip.Trigger>
      <Tooltip.Content>툴팁 내용</Tooltip.Content>
    </Tooltip>,
  );

  const trigger = screen.getByRole('button', { name: '툴팁 버튼' });

  return { trigger };
};
describe('Tooltip', () => {
  describe('Smoke', () => {
    test('툴팁 버튼이 렌더링된다.', () => {
      setup();
      expect(screen.getByRole('button', { name: '툴팁 버튼' })).toBeVisible();
      expect(screen.queryByText('툴팁 내용')?.className).not.toContain('is-open');
    });
  });

  describe('Interaction', () => {
    describe('기본 동작', () => {
      test('호버 시 컨텐츠가 표시되고, 떠나면 숨겨진다', async () => {
        const { trigger } = setup();

        await userEvent.hover(trigger);
        expect(screen.getByText('툴팁 내용')?.className).toContain('is-open');

        await userEvent.unhover(trigger);

        await waitFor(() => {
          expect(screen.getByText('툴팁 내용').className).not.toContain('is-open');
        });
      });
    });
  });
});

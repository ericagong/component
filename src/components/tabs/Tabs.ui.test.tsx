import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from '@/components/tabs';

const setup = (defaultValue = 'a') => {
  render(
    <Tabs defaultValue={defaultValue}>
      <Tabs.List>
        <Tabs.Trigger value='a'>A</Tabs.Trigger>
        <Tabs.Trigger value='b'>B</Tabs.Trigger>
        <Tabs.Trigger value='c'>C</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='a'>A content</Tabs.Content>
      <Tabs.Content value='b'>B content</Tabs.Content>
      <Tabs.Content value='c'>C content</Tabs.Content>
    </Tabs>,
  );

  const triggerA = screen.getByRole('button', { name: 'A' });
  const triggerB = screen.getByRole('button', { name: 'B' });
  const triggerC = screen.getByRole('button', { name: 'C' });

  return { triggerA, triggerB, triggerC };
};

describe('Tabs', () => {
  describe('Smoke', () => {
    test('맨 처음 탭이 선택된 상태로 렌더링된다', () => {
      setup();
      expect(screen.getByText('A content')).toBeInTheDocument();
      expect(screen.queryByText('B content')).toBeNull();
      expect(screen.queryByText('C content')).toBeNull();
    });
  });

  describe('Interaction', () => {
    describe('기본 동작', () => {
      test('비활성화된 탭 트리거 클릭 시 활성화 탭 콘텐츠가 전환된다', async () => {
        const { triggerB } = setup();
        expect(screen.getByText('A content')).toBeInTheDocument();
        expect(screen.queryByText('B content')).toBeNull();
        await userEvent.click(triggerB);
        expect(screen.getByText('B content')).toBeInTheDocument();
        expect(screen.queryByText('A content')).toBeNull();
        expect(screen.queryByText('C content')).toBeNull();
      });

      test('활성화된 탭을 다시 클릭해도 활성화 탭이 유지된다', async () => {
        const { triggerA } = setup();
        await userEvent.click(triggerA);
        expect(screen.getByText('A content')).toBeInTheDocument();
        expect(screen.queryByText('B content')).toBeNull();
        expect(screen.queryByText('C content')).toBeNull();
      });
    });

    describe('경계 동작', () => {
      test('defaultValue로 지정된 탭이 초기 활성화된다', () => {
        setup('b');
        expect(screen.getByText('B content')).toBeInTheDocument();
        expect(screen.queryByText('A content')).toBeNull();
      });

      test.skip('존재하지 않는 defaultValue면 첫 번째 탭이 활성화된다 (fallback)', () => {
        setup('x' as any);
        expect(screen.getByText('A content')).toBeInTheDocument();
      });
    });
  });
});

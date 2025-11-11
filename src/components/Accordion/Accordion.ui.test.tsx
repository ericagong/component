import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Accordion from '@/components/accordion';

const setup = () => {
  render(
    <Accordion>
      <Accordion.Item value='item-1'>
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value='item-2'>
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion>,
  );

  const trigger1 = screen.getByRole('button', { name: 'Item 1' });
  const trigger2 = screen.getByRole('button', { name: 'Item 2' });

  return { trigger1, trigger2 };
};

describe('Accordion', () => {
  describe('Smoke', () => {
    test('초기에는 어떤 콘텐츠도 열려 있지 않다', () => {
      setup();

      const content1 = screen.queryByText('Content 1');
      const content2 = screen.queryByText('Content 2');

      expect(content1).toBeInTheDocument();
      expect(content1?.className).not.toContain('is-open');
      expect(content2).toBeInTheDocument();
      expect(content2?.className).not.toContain('is-open');
    });
  });

  describe('Interaction', () => {
    describe('기본 동작', () => {
      describe('어떤 콘텐츠도 열려 있지 않은 상태에서', () => {
        test('트리거를 클릭하면 해당 콘텐츠가 열린다', async () => {
          const { trigger1 } = setup();

          await userEvent.click(trigger1);

          expect(screen.getByText('Content 1').className).toContain('is-open');
          expect(screen.queryByText('Content 2')?.className).not.toContain('is-open');
        });
      });

      describe('이미 콘텐츠가 열려있는 상태에서', () => {
        test('동일한 트리거를 클릭하면 해당 콘텐츠가 닫힌다', async () => {
          const { trigger1 } = setup();
          await userEvent.click(trigger1);

          await userEvent.click(trigger1);

          expect(screen.queryByText('Content 1')?.className).not.toContain('is-open');
        });

        test('다른 트리거를 클릭하면 기존 콘텐츠는 닫히고 새로운 콘텐츠가 열린다', async () => {
          const { trigger1, trigger2 } = setup();
          await userEvent.click(trigger1);

          await userEvent.click(trigger2);

          expect(screen.queryByText('Content 1')?.className).not.toContain('is-open');
          expect(screen.getByText('Content 2').className).toContain('is-open');
        });
      });
    });
  });
});

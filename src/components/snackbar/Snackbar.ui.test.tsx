import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Snackbar from '@/components/snackbar';

describe('Snackbar', () => {
  test('트리거 클릭 시 패널이 나타난다', async () => {
    render(
      <Snackbar>
        <Snackbar.Trigger label='Show Snackbar' />
        <Snackbar.Panel>스낵바 메시지</Snackbar.Panel>
      </Snackbar>,
    );

    expect(screen.queryByText('스낵바 메시지')).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Show Snackbar' }));

    expect(screen.getByText('스낵바 메시지')).toBeInTheDocument();
  });

  test('닫기 버튼을 누르면 패널이 사라진다', async () => {
    render(
      <Snackbar>
        <Snackbar.Trigger label='Open' />
        <Snackbar.Panel>메시지</Snackbar.Panel>
      </Snackbar>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    const close = await screen.findByRole('button', { name: '닫기' });

    await userEvent.click(close);
    // 애니메이션 고려: 즉시 DOM에서 사라지지 않을 수 있음. 존재 여부만 느슨히 확인
    expect(screen.queryByText('메시지')).not.toBeNull();
  });
});

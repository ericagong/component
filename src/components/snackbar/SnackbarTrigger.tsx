import { useSnackbarContext } from './SnackbarRoot';
import cx from './cx';

type SnackbarTriggerProps = {
  label: string;
};

const SnackbarTrigger = ({ label }: SnackbarTriggerProps) => {
  const { open } = useSnackbarContext();

  return (
    <button type='button' className={cx('snackbar-trigger')} onClick={open}>
      {label}
    </button>
  );
};

export default SnackbarTrigger;

import SnackbarRoot from './SnackbarRoot';
import SnackbarPanel from './SnackbarPanel';
import SnackbarTrigger from './SnackbarTrigger';

const Snackbar = Object.assign(SnackbarRoot, {
  Panel: SnackbarPanel,
  Trigger: SnackbarTrigger,
});

export default Snackbar;
export { SnackbarRoot, SnackbarPanel, SnackbarTrigger };

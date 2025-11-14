import PopoverRoot from './PopoverRoot';
import PopoverPanel from './PopoverPanel';
import PopoverTrigger from './PopoverTrigger';

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Panel: PopoverPanel,
});

export default Popover;

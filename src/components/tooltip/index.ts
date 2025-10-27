import TooltipRoot from './TooltipRoot';
import TooltipTrigger from './TooltipTrigger';
import TooltipContent from './TooltipContent';

const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export default Tooltip;

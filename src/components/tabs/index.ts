import TabsRoot from './TabsRoot';
import TabsList from './TabsList';
import TabsTrigger from './TabsTrigger';
import TabsContent from './TabsContent';

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;

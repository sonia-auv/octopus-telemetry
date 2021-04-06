import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs as MUITabs, Tab } from '@material-ui/core';

type TabsProps = {
  value?: any
  handlerChange: ((event: React.ChangeEvent<{}>, value: any) => void) | undefined;
  arialabel?: string | undefined
  listValue?: { value: string, index: number }[]
};

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const GenericTabs = withStyles({

})(MUITabs);

const Tabs: FunctionComponent<TabsProps> = (props) => (
  <GenericTabs
    value={props.value}
    onChange={props.handlerChange}
    aria-label={props.arialabel}
    variant="scrollable"
    scrollButtons="auto"
  >
    {
      props.listValue?.map((value: any) => {
        return <Tab label={value["value"]} {...a11yProps(value["index"])} />
      })}
  </GenericTabs>
);

Tabs.defaultProps = {

};

export default Tabs;

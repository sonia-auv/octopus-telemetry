import React from 'react';
import TabPane from '../tabpane/TabPane';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ScreenLayout = (props) => (
  // Tabs of the layout for navigation
  <Tabs>
    <TabList>
      <Tab>Default view</Tab>
      <Tab>View 2</Tab>
    </TabList>

    <TabPanel>
      <TabPane />
    </TabPanel>
    <TabPanel>
      <TabPane />
    </TabPanel>
  </Tabs>
);

export default ScreenLayout;

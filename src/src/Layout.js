import React from 'react';
import Draggable from 'react-draggable';
import TabPane from './TabPane';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Layout = (props) => (
  <Tabs>
    <TabList>
      <Tab>View 1</Tab>
      <Tab>View 2</Tab>
    </TabList>

    <TabPanel>
      <h2>View 1</h2>
      <TabPane />
    </TabPanel>
    <TabPanel>
      <h2>View 2</h2>
    </TabPanel>
  </Tabs>
);

export default Layout;

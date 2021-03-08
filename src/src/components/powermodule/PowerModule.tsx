import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PowerSection from './PowerSection';

const NUMBER_OF_POWER_SECTIONS = 4;

const PowerModule = (props: any) => (
  <div className="PowerModule">
    <Tabs>
      <TabList>
        {new Array(NUMBER_OF_POWER_SECTIONS).fill(null).map((_, index) => (
          <Tab key={index}>{`Power ${index + 1}`}</Tab>
        ))}
        <Tab>All Data</Tab>
      </TabList>
      {new Array(NUMBER_OF_POWER_SECTIONS).fill(null).map((_, index) => (
        <TabPanel key={index}>
          <PowerSection />
        </TabPanel>
      ))}
      <TabPanel>All data is here!</TabPanel>
    </Tabs>
  </div>
);

export default PowerModule;

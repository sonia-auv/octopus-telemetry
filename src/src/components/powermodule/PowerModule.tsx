import React, {useCallback} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useROSTopicPublisher } from '../../../hooks/useROSTopicPublisher';
import PowerSection from './PowerSection';
import { useROSService } from '../../../hooks/useROSService'
import { useROSTopicSubscriber } from '../../../hooks/useROSTopicSubscriber';

const NUMBER_OF_POWER_SECTIONS = 4;

type PowerModuleProps = {};

const PowerModule = (props: PowerModuleProps) => {
  const powerMessageCallback = useCallback((x: any) => {
    console.log(`---> ${x}`)
  }, [] )
  const getPowerModuleServiceCall = useROSTopicSubscriber<any>(powerMessageCallback, "/provider_power/power", "sonia_common/PowerMsg");
  
  return (
  <div className="PowerModule">
    <Tabs forceRenderTabPanel={true}>
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
      <TabPanel>All Data is here!</TabPanel>
    </Tabs>
  </div>
);
}

export default PowerModule;

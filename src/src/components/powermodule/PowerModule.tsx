import React, {useState, useCallback} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useROSTopicPublisher } from '../../../hooks/useROSTopicPublisher';
import PowerSection from './PowerSection';
import { useROSService } from '../../../hooks/useROSService'
import { useROSTopicSubscriber } from '../../../hooks/useROSTopicSubscriber';

const NUMBER_OF_POWER_SECTIONS = 4;

type PowerModuleProps = {};

const PowerModule = (props: PowerModuleProps) => {

  const [powerValues, setPowerValues]  = useState(null)

  const powerMessageCallback = useCallback((x: any) => {
    setPowerValues(x)
  }, [] )
  useROSTopicSubscriber<any>(powerMessageCallback, "/provider_power/power", "sonia_common/PowerMsg");
  
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
          <PowerSection
            temperature={169}
            current16V1Value={100}
            current16V2Value={120}
            current12VValue={101}
            voltage16V1Value={123}
            voltage16V2Value={42}
            voltage12VValue={12}
            batteryValue={11}

            output12VChecked={false}
            output16V1Checked={true}
            output16V2Checked={true}

            setOutput16V1Checked={(v: boolean) => !v}
            setOutput16V2Checked={(v: boolean) => !v}
            setOutput12VChecked={(v: boolean) => !v}
          />
        </TabPanel>
      ))}
      <TabPanel>All Data is here!</TabPanel>
    </Tabs>
  </div>
);
}

export default PowerModule;

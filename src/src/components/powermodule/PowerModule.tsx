import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useROSTopicPublisher } from '../../../hooks/useROSTopicPublisher';
import PowerSection from './PowerSection';
import { useROSService } from '../../../hooks/useROSService';
import { useROSTopicSubscriber } from '../../../hooks/useROSTopicSubscriber';

const NUMBER_OF_POWER_SECTIONS = 4;

type PowerModuleProps = {};

type PowerPayload = {
  slave: number;
  cmd: number;
  data: number;
};

const PowerModule = (props: PowerModuleProps) => {
  const initialPowerValuesDict = new Array(NUMBER_OF_POWER_SECTIONS).fill({
    temperature: null,
    current16V1Value: null,
    current16V2Value: null,
    current12VValue: null,
    voltage16V1Value: null,
    voltage16V2Value: null,
    voltage12VValue: null,
    batteryValue: null,
  });

  const [powerValues, setPowerValues] = useState(initialPowerValuesDict);

  interface MetricsMap {
    [index: string]: string;
  }
  const d: MetricsMap = {
    0: 'temperature',
    1: 'current16V1Value',
    2: 'current16V2Value ',
    3: 'current12VValue',
    4: 'voltage16V1Value',
    5: 'voltage16V2Value',
    6: 'voltage12VValue',
    7: 'batteryValue',
  };

  const powerMessageCallback = useCallback((x: any) => {
    let sectionId = x.slave;
    let section = powerValues[sectionId];
    let data = x.value;
    let command: number = x.cmd;

    section = {
      ...section,
      [d[command]]: data,
    };

    let updatedPowerValues = powerValues;
    updatedPowerValues[sectionId] = section;

    setPowerValues(updatedPowerValues);
  }, []);

  useROSTopicSubscriber<any>(
    powerMessageCallback,
    '/provider_power/power',
    'sonia_common/PowerMsg'
  );

  console.log(powerValues);

  return (
    <div className="PowerModule">
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          {new Array(NUMBER_OF_POWER_SECTIONS).fill(null).map((_, index) => (
            <Tab key={index}>{`Power ${index + 1}`}</Tab>
          ))}
          <Tab>All Data</Tab>
        </TabList>
        {powerValues.map((_, index) => (
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
              output16V1Checked={true}
              output16V2Checked={true}
              output12VChecked={false}
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
};

export default PowerModule;

import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PowerSection from './PowerSection';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import './powermodule.css';

const NUMBER_OF_POWER_SECTIONS = 4;

type PowerModuleProps = {};

type PowerPayload = {
  slave: number;
  cmd: number;
  data: number;
};

const PowerModule = (props: PowerModuleProps) => {
  const initialPowerValuesDict = new Array(NUMBER_OF_POWER_SECTIONS).fill({
    current16V1Value: null,
    current16V2Value: null,
    current12VValue: null,
    voltage16V1Value: null,
    voltage16V2Value: null,
    voltage12VValue: null,
    temperature: null,
    batteryValue: null,
  });

  const [powerValues, setPowerValues] = useState(initialPowerValuesDict);

  interface MetricsMap {
    [index: string]: string;
  }
  const d: MetricsMap = {
    0: 'current16V1Value',
    1: 'current16V2Value',
    2: 'current12VValue',
    3: 'voltage16V1Value',
    4: 'voltage16V2Value',
    5: 'voltage12VValue',
    6: 'temperature',
    7: 'batteryValue',
  };

  const powerMessageCallback = useCallback((x: PowerPayload) => {
    let { slave, cmd, data } = x;
    //let data = parseFloat(x.data).toFixed(2);

    powerValues[slave] = {
      ...powerValues[slave],
      [d[cmd]]: data,
    };

    setPowerValues(Object.assign([], powerValues));
  }, []);

  useROSTopicSubscriber<any>(
    powerMessageCallback,
    '/provider_power/power',
    'sonia_common/PowerMsg'
  );

  return (
    <div className="PowerModule">
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          {powerValues.map((_, index) => (
            <Tab key={index}>{`Power ${index + 1}`}</Tab>
          ))}
          <Tab>All Data</Tab>
        </TabList>
        {powerValues.map((powerSection, index) => (
          <TabPanel key={index}>
            <PowerSection
              key={index}
              current16V1Value={powerSection.current16V1Value}
              current16V2Value={powerSection.current16V2Value}
              current12VValue={powerSection.current12VValue}
              voltage16V1Value={powerSection.voltage16V1Value}
              voltage16V2Value={powerSection.voltage16V2Value}
              voltage12VValue={powerSection.voltage12VValue}
              temperature={powerSection.temperature}
              batteryValue={powerSection.batteryValue}
              // TODO implement those below
              output16V1Checked={false}
              output16V2Checked={true}
              output12VChecked={true}
              setOutput16V1Checked={(v: boolean) => !v}
              setOutput16V2Checked={(v: boolean) => !v}
              setOutput12VChecked={(v: boolean) => !v}
            />
          </TabPanel>
        ))}
        <TabPanel>
          {powerValues.map((powerSection, index) => (
            <PowerSection
              key={index}
              current16V1Value={powerSection.current16V1Value}
              current16V2Value={powerSection.current16V2Value}
              current12VValue={powerSection.current12VValue}
              voltage16V1Value={powerSection.voltage16V1Value}
              voltage16V2Value={powerSection.voltage16V2Value}
              voltage12VValue={powerSection.voltage12VValue}
              temperature={powerSection.temperature}
              batteryValue={powerSection.batteryValue}
              // TODO implement those below
              output16V1Checked={false}
              output16V2Checked={true}
              output12VChecked={true}
              setOutput16V1Checked={(v: boolean) => !v}
              setOutput16V2Checked={(v: boolean) => !v}
              setOutput12VChecked={(v: boolean) => !v}
            />
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PowerModule;

import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VoltageSection from './VoltageSection';
import CurrentSection from './CurrentSection';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import './powermodule.css';


type PowerModuleProps = {};

type PowerPayload = {
  slave: number;
  cmd: number;
  array: {layout:string,data:number[]};
};

const PowerModule = (props: PowerModuleProps) => {
  const initialVoltageValuesDict = new Array(1).fill({
    voltage16VM1Value: null,
    voltage16VM2Value: null,
    voltage16VM3Value: null,
    voltage16VM4Value: null,
    voltage16VM5Value: null,
    voltage16VM6Value: null,
    voltage16VM7Value: null,
    voltage16VM8Value: null,
    voltage16VACC1Value: null,
    voltage16VACC2Value: null,
  });
  
  const initialCurrentValuesDict = new Array(1).fill({
    current16VM1Value: null,
    current16VM2Value: null,
    current16VM3Value: null,
    current16VM4Value: null,
    current16VM5Value: null,
    current16VM6Value: null,
    current16VM7Value: null,
    current16VM8Value: null,
    current16VACC1Value: null,
    current16VACC2Value: null,
  });

  var [voltageValues, setVoltageValues] = useState(initialVoltageValuesDict);
  var [currentValues, setCurrentValues] = useState(initialCurrentValuesDict);

  interface MetricsMap {
    [index: string]: string;
  }
  const voltage: MetricsMap = {
    0: 'voltage16VM1Value',
    1: 'voltage16VM2Value',
    2: 'voltage16VM3Value',
    3: 'voltage16VM4Value',
    4: 'voltage16VM5Value',
    5: 'voltage16VM6Value',
    6: 'voltage16VM7Value',
    7: 'voltage16VM8Value',
    8: 'voltage16VACC1Value',
    9: 'voltage16VACC2Value',
  };
  
  const current: MetricsMap = {
    0: 'current16VM1Value',
    1: 'current16VM2Value',
    2: 'current16VM3Value',
    3: 'current16VM4Value',
    4: 'current16VM5Value',
    5: 'current16VM6Value',
    6: 'current16VM7Value',
    7: 'current16VM8Value',
    8: 'current16VACC1Value',
    9: 'current16VACC2Value',
  }

  const powerMessageCallback = useCallback((x: PowerPayload) => {
    let { slave, cmd, array } = x;
    
    if (slave === 0 && cmd === 0) {
      for (var i = 0; i < array.data.length; i++) {
        voltageValues[slave] = {
          ...voltageValues[slave],
          [voltage[i]]: array.data[i],
        };
        setVoltageValues(Object.assign([], voltageValues));
      }
    }
    
    if (slave === 0 && cmd === 1) {
      for (var i = 0; i < array.data.length; i++) {
        currentValues[slave] = {
          ...currentValues[slave],
          [current[i]]: array.data[i],
        };
        setCurrentValues(Object.assign([], currentValues));
      }
    }
  }, []);

  useROSTopicSubscriber<any>(powerMessageCallback,'/provider_power/power','sonia_common/PowerMsg');

  return (
    <div className="PowerModule">
      <div>
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          {voltageValues.map((_) => (<Tab>Voltage</Tab>))}
          {currentValues.map((_) => (<Tab>Current</Tab>))}
        </TabList>
        {voltageValues.map((powerSection) => (
          <TabPanel>
            <VoltageSection
              voltage16VM1Value={powerSection.voltage16VM1Value}
              voltage16VM2Value={powerSection.voltage16VM2Value}
              voltage16VM3Value={powerSection.voltage16VM3Value}
              voltage16VM4Value={powerSection.voltage16VM4Value}
              voltage16VM5Value={powerSection.voltage16VM5Value}
              voltage16VM6Value={powerSection.voltage16VM6Value}
              voltage16VM7Value={powerSection.voltage16VM7Value}
              voltage16VM8Value={powerSection.voltage16VM8Value}
              voltage16VACC1Value={powerSection.voltage16VACC1Value}
              voltage16VACC2Value={powerSection.voltage16VACC2Value}
              />
          </TabPanel>
        ))}
        {currentValues.map((powerSection) => (
          <TabPanel>
            <CurrentSection
              current16VM1Value={powerSection.current16VM1Value}
              current16VM2Value={powerSection.current16VM2Value}
              current16VM3Value={powerSection.current16VM3Value}
              current16VM4Value={powerSection.current16VM4Value}
              current16VM5Value={powerSection.current16VM5Value}
              current16VM6Value={powerSection.current16VM6Value}
              current16VM7Value={powerSection.current16VM7Value}
              current16VM8Value={powerSection.current16VM8Value}
              current16VACC1Value={powerSection.current16VACC1Value}
              current16VACC2Value={powerSection.current16VACC2Value}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
    <div>
      <p>Ceci est un paragraphe que j'ajoute, ensuite j'ajoute une image</p>
      
      <div id="Layer1" style="position:relative; left:137px; top:77px; width:136px; height:132px; z-index:1">
        <img name = "background" src="https://raw.githubusercontent.com/sonia-auv/octopus-telemetry/feature/powermodule/src/components/powermodule/AUV8_Top.JPG" alt="Image du sub vue du dessus"/>
      </div>
      <div id="Layer2" style="position:absolute; left:195px; top:110px; width:64px; height:58px; z-index:2">
        <img name="chien" src="http://villenewrichmond.com/wordpress/wp-content/uploads/2020/06/bebe-labrador.jpg" alt="chien">
      </div>

    </div>
    </div>
  );
};

export default PowerModule;

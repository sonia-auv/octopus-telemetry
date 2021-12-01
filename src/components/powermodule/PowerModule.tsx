import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VoltageSection from './VoltageSection';
import CurrentSection from './CurrentSection';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import './powermodule.css';


// Test William d'ajout de variables
//const propV1:number = 5.0;
var propV:number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var propA:number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];


type PowerModuleProps = {};


//Définition du format du message reçu de ROS
type PowerPayload = {
  slave: number;
  cmd: number;
  array: { layout: string, data: number[] };
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

        // Solution alternative pour test
        propV[i] = array.data[i];
      }
    }

    if (slave === 0 && cmd === 1) {
      for (var i = 0; i < array.data.length; i++) {
        currentValues[slave] = {
          ...currentValues[slave],
          [current[i]]: array.data[i],
        };
        setCurrentValues(Object.assign([], currentValues));

        // Solution alternative pour test
        propA[i] = array.data[i];
      }
    }
  }, []);

  useROSTopicSubscriber<any>(powerMessageCallback, '/provider_power/power', 'sonia_common/PowerMsg');

  return (
    <div className="PowerModule">
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          {voltageValues.map((_) => (<Tab>Voltage</Tab>))}
          {currentValues.map((_) => (<Tab>Current</Tab>))}
          {<Tab>Image</Tab>}
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
        {
          <TabPanel>

            <div className="new_overlay">

              <div className="images">
                <div className="background">
                  <img src="https://raw.githubusercontent.com/sonia-auv/octopus-telemetry/feature/powermodule/src/components/powermodule/AUV8_Top.JPG"
                    alt="Image du sub vue du dessus" />
                </div>
                <div className="propeller side right" id="f1">
                  <div className="box">
                    <p className="voltage">{propV[0]}</p>
                    <p className="current">{propA[0]}</p>
                  </div>
                </div>
                <div className="propeller side right" id="f2">
                  <div className="box">
                    <p className="voltage">{propV[1]}</p>
                    <p className="current">{propA[1]}</p>
                  </div>
                </div>
                <div className="propeller side left" id="f3">
                  <div className="box">
                    <p className="voltage">{propV[2]}</p>
                    <p className="current">{propA[2]}</p>
                  </div>
                </div>
                <div className="propeller side left" id="f4">
                  <div className="box">
                    <p className="voltage">{propV[3]}</p>
                    <p className="current">{propA[3]}</p>
                  </div>
                </div>
                <div className="propeller up right" id="f5">
                  <div className="box">
                    <p className="voltage">{propV[4]}</p>
                    <p className="current">{propA[4]}</p>
                  </div>
                </div>
                <div className="propeller up right" id="f6">
                  <div className="box">
                    <p className="voltage">{propV[5]}</p>
                    <p className="current">{propA[5]}</p>
                  </div>
                </div>
                <div className="propeller up left" id="f7">
                  <div className="box">
                    <p className="voltage">{propV[6]}</p>
                    <p className="current">{propA[6]}</p>
                  </div>
                </div>
                <div className="propeller up left" id="f8">
                  <div className="box">
                    <p className="voltage">{propV[7]}</p>
                    <p className="current">{propA[7]}</p>
                  </div>
                </div>
                <div className="acc left" id="acc1">
                  <div className="box">
                    <p className="voltage">{propV[8]}</p>
                    <p className="current">{propA[8]}</p>
                  </div>
                </div>
                <div className="acc right" id="acc2">
                  <div className="box">
                    <p className="voltage">{propV[9]}</p>
                    <p className="current">{propA[9]}</p>
                  </div>
                </div>
              </div>

            </div>
          </TabPanel>
        }
      </Tabs>
    </div>
  );
};

export default PowerModule;


// Amélioration: Lorsque je clique sur un moteur, j'ai une fenêtre qui s'ouvre avec des informations supplémentaires comme 
//Des graphes de l'historique du courant et de la tension
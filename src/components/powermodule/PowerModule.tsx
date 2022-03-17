import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VoltageSection from './VoltageSection';
import CurrentSection from './CurrentSection';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import './powermodule.css';
import image from '../../components/image/AUV8_Top.jpeg';


const PowerModule = () => {

  // States
  const [ propV, setPropV ] = useState<Array<Number>>([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
  const [ propA, setPropA ] = useState<Array<Number>>([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);

  // Nouveaux topics, moins de messages

  const powerVoltageCallback = useCallback((x: any) => {
    let array = x.data
    setPropV(array);
  }, []);

  const powerCurrentCallback = useCallback((x: any) => {
    let array = x.data
    setPropA(array);
  }, []);

  useROSTopicSubscriber<any>(powerVoltageCallback, '/provider_power/voltage', 'std_msgs/Float64MultiArray');
  useROSTopicSubscriber<any>(powerCurrentCallback, '/provider_power/current', 'std_msgs/Float64MultiArray');
  
  return (

    <div className="PowerModule">

      <div className="new_overlay">
        <div className="images">
          <div className="background">
            <img src={image}
              alt="Image du sub vue du dessus" />
          </div>
          <div className="propeller side right" id="f1">
            <div className="box">
              <p className="voltage">{propV[0].toFixed(2)}</p>
              <p className="current">{propA[0].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller side right" id="f2">
            <div className="box">
              <p className="voltage">{propV[1].toFixed(2)}</p>
              <p className="current">{propA[1].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller side left" id="f3">
            <div className="box">
              <p className="voltage">{propV[2].toFixed(2)}</p>
              <p className="current">{propA[2].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller side left" id="f4">
            <div className="box">
              <p className="voltage">{propV[3].toFixed(2)}</p>
              <p className="current">{propA[3].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller up right" id="f5">
            <div className="box">
              <p className="voltage">{propV[4].toFixed(2)}</p>
              <p className="current">{propA[4].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller up right" id="f6">
            <div className="box">
              <p className="voltage">{propV[5].toFixed(2)}</p>
              <p className="current">{propA[5].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller up left" id="f7">
            <div className="box">
              <p className="voltage">{propV[6].toFixed(2)}</p>
              <p className="current">{propA[6].toFixed(2)}</p>
            </div>
          </div>
          <div className="propeller up left" id="f8">
            <div className="box">
              <p className="voltage">{propV[7].toFixed(2)}</p>
              <p className="current">{propA[7].toFixed(2)}</p>
            </div>
          </div>
          <div className="acc left" id="acc1">
            <div className="box">
              <p className="voltage">{propV[8].toFixed(2)}</p>
              <p className="current">{propA[8].toFixed(2)}</p>
            </div>
          </div>
          <div className="acc right" id="acc2">
            <div className="box">
              <p className="voltage">{propV[9].toFixed(2)}</p>
              <p className="current">{propA[9].toFixed(2)}</p>
            </div>
          </div>
          {/* <div>
            <p className="voltage">{histV}</p>
            <p className="current">{histA}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
};


export default PowerModule;


// Amélioration: Lorsque je clique sur un moteur, j'ai une fenêtre qui s'ouvre avec des informations supplémentaires comme 
//Des graphes de l'historique du courant et de la tension
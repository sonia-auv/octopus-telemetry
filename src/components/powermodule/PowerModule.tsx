import React, { useState, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VoltageSection from './VoltageSection';
import CurrentSection from './CurrentSection';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import './powermodule.css';


// Nouvelles variables pour gérer les valeurs de tension et courant
//const propV1:number = 5.0;
var propV: number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var propA: number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var histV: number[] = [0.0];
var histA: number[] = [0.0];



const PowerModule = () => {



  // Permet aux valeurs de se mettre à jour (William ne comprend pas pourquoi)
  const initBlanc = new Array(1).fill({
    a : null
  })
  var [,setVoltageValues] = useState(initBlanc);
  

  // Nouveaux topics, moins de messages

  const powerVoltageCallback = useCallback((x: any) => {
    let array = x.data
    //propV[0] = 4;
    for (var i = 0; i < array.length; i++) {
      propV[i] = array[i].toFixed(2); // Limite le nombre de decimales
      setVoltageValues(Object.assign([], 0));// Même chose que initBlanc
      //histV.push(array[i]); // Permettrait plus tard de faire un tracé de l'évolution des courants et tensions
    }
  }, []);

  const powerCurrentCallback = useCallback((x: any) => {
    let array = x.data
    for (var i = 0; i < array.length; i++) {
      propA[i] = array[i].toFixed(2);
      
      //histA.push(array[i]);
    }
  }, []);

  useROSTopicSubscriber<any>(powerVoltageCallback, '/provider_power/voltage', 'std_msgs/Float64MultiArray');
  useROSTopicSubscriber<any>(powerCurrentCallback, '/provider_power/current', 'std_msgs/Float64MultiArray');
  
  return (

    <div className="PowerModule">

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
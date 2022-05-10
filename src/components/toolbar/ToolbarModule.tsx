import React, { useCallback } from 'react';

import AppBar from '../common/AppBar/AppBar';
import Toolbar from '../common/ToolBar/ToolBar';
import Button from '../common/button/Button';
import IconButton from '../common/button/IconButton';

import MenuModule from './MenuModule';
import BatterieLevelIndicator from './BatteryLevelIndicatorModule';
import LabelAndValueModule from '../LabelAndValueModule';

import { useROSService, ServiceRequestFactory } from '../../hooks/useROSService';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';

const ToolbarModule = (props: any) => {

  const [isMissionSwitchOn, setIsMissionSwitchOn] = React.useState(false);
  const [isKillSwitchOn, setIsKillSwitchOn] = React.useState(false);
  const [temp, setTemp] = React.useState(0);

  const [batteryLevel1, setbatteryLevel1] = React.useState('-');
  const [batteryLevel2, setbatteryLevel2] = React.useState('-');

  const toolbarServiceCallback = useCallback((x: any) => {}, []);

  const missionSwitchCallback = useCallback((x: any) => {
    let switchState = x.data;
    setIsMissionSwitchOn(switchState);
  }, []);

  const killSwitchCallback = useCallback((x: any) => {
    let switchState = x.data;
    setIsKillSwitchOn(switchState);
  }, []);

  const batteryLevelCallback = useCallback((x: any) => {
    // slave 0 is the voltage from both batteries
    // the command 0 is the voltage data on motors and batteries
    // battery 1 is store in data[8] and battery 2 is stored in data[9]
    let bat1 = parseFloat(x.data[8]).toFixed(2);
    let bat2 = parseFloat(x.data[9]).toFixed(2);
    if(parseFloat(bat1) < 14.8 || parseFloat(bat2) < 14.8){
      alert("Battery low.");
    }
    setbatteryLevel1(bat1);
    setbatteryLevel2(bat2);
  }, []);

  const tempCallback = useCallback((x: any) => {
    var temp = x.temperature.toFixed(2);
    setTemp(temp);
  }, []);

  const leakSensorCallback = (x: any) => {
    if(x.data){
      alert("Leak detected.");
    }
  }

  const toolbarServicesCall = useROSService<any>(toolbarServiceCallback, '/proc_control/EnableControl', 'sonia_common/EnableControl');
  const startStopCameraCall = useROSService<any>(toolbarServiceCallback, '/provider_vision/StarStopCamera', 'sonia_common/StartStopMedia');
  useROSTopicSubscriber<any>(batteryLevelCallback, '/provider_power/voltage', 'std_msgs/Float64MultiArray');
  useROSTopicSubscriber<any>(killSwitchCallback, '/provider_kill_mission/kill_switch_msg', 'std_msgs/Bool');
  useROSTopicSubscriber<any>(missionSwitchCallback,'/provider_kill_mission/mission_switch_msg','std_msgs/Bool');
  //useROSTopicSubscriber<any>(
  //  AUV7Callback,
  //  '/provider_system/system_temperature',
  //  'sensor_msgs/Temperature'
  //  );
  useROSTopicSubscriber<any>(tempCallback, '/provider_system/system_temperature', 'sensor_msgs/Temperature');
  useROSTopicSubscriber<any>(leakSensorCallback, '/provider_dvl/dvl_leak_sensor', 'std_msgs/Bool');

  let handleStartFrontCameraClicked = () => {
    const request = ServiceRequestFactory({
      Bottom_GigE: 2,
      Front_GigE: 1,
    });
    startStopCameraCall(request);
  };

  let handleStartBottomCameraClicked = () => {
    const request = ServiceRequestFactory({
      Bottom_GigE: 1,
      Front_GigE: 2,
    });
    startStopCameraCall(request);
  };

  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" arialabel="menu">
          <MenuModule />
        </IconButton>
        <Button label="Open modules" handler={props.handleShowSidebar} />
        <Button
          label="Start front"
          style={{ margin: '15px', backgroundColor: 'black', color: 'red' }}
          handler={handleStartFrontCameraClicked}
        />
        <Button
          label="Start bottom"
          style={{ margin: '15px', backgroundColor: 'black', color: 'red' }}
          handler={handleStartBottomCameraClicked}
        />
        <LabelAndValueModule label={process.env.REACT_APP_AUV} value={temp} unit="°C" />
        <BatterieLevelIndicator
          value={batteryLevel1}
          label="Batterie 1"
          unit="V"
        />
        <BatterieLevelIndicator
          value={batteryLevel2}
          label="Batterie 2"
          unit="V"
        />
        <div style={{ marginLeft: 'auto' }}>
          <Button
            handler={() => {}}
            disabled={true}
            style={{
              margin: '15px',
              backgroundColor: isMissionSwitchOn ? 'green' : 'red',
              color: 'white',
            }}
            label={
              isMissionSwitchOn ? 'Mission switch on' : 'Mission switch off'
            }
          />
          <Button
            style={{
              margin: '15px',
              backgroundColor: isKillSwitchOn ? 'green' : 'red',
              color: 'white',
            }}
            label={isKillSwitchOn ? 'Kill switch on' : 'Kill switch off'}
            handler={() => {}}
            disabled={true}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarModule;

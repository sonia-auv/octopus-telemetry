import React, { useCallback } from 'react';

import AppBar from './common/AppBar/AppBar';
import Toolbar from './common/ToolBar/ToolBar';
import Button from './common/button/Button';
import IconButton from './common/button/IconButton';

import MenuModule from './MenuModule';
import BatterieLevelIndicator from './BatteryLevelIndicatorModule';
import LabelAndValueModule from './LabelAndValueModule';

import { useROSService, ServiceRequestFactory } from '../hooks/useROSService';
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const ToolbarModule = (props: any) => {

  /**
   * TODO
   * Check ros message
   *
   */

  const [isMissionSwitchOn, setIsMissionSwitchOn] = React.useState(false);
  const [isKillSwitchOn, setIsKillSwitchOn] = React.useState(false);
  const [AUV7Temp, setAUV7Temp] = React.useState(0);
  const [AUV8Temp, setAUV8Temp] = React.useState(0);

  const [batteryLevel1, setbatteryLevel1] = React.useState('-');
  const [batteryLevel2, setbatteryLevel2] = React.useState('-');

  const toolbarServiceCallback = useCallback((x: any) => {}, []);

  const missionSwitchCallback = useCallback((x: any) => {
    let switchState = x.state;
    setIsMissionSwitchOn(switchState);
  }, []);

  const killSwitchCallback = useCallback((x: any) => {
    let switchState = x.state;
    setIsKillSwitchOn(switchState);
  }, []);

  const batteryLevelCallback = useCallback((x: any) => {
    let data = parseFloat(x.data).toFixed(2);
    // slave 0 and 1 are PSU connected to battery 1 and slave 2 and 3 are connected to battery 2
    // the command 7 is the battery data
    // we assume the data from the slaves connected to the same battery are close enough so we take only one value
    if (x.slave === 0) {if (x.cmd === 7) setbatteryLevel1(data);}
    else if (x.slave === 2) {if (x.cmd === 7) setbatteryLevel2(data);}
  }, []);

  const AUV7Callback = useCallback((x: any) => {
    let data = x.data;
    let parsed = JSON.parse(data);
    setAUV7Temp(parsed);
  }, []);
  const AUV8Callback = useCallback((x: any) => {
    let data = x.data;
    let parsed = JSON.parse(data);
    setAUV8Temp(parsed);
  }, []);

  const toolbarServicesCall = useROSService<any>(
    toolbarServiceCallback,
    '/proc_control/EnableControl',
    'sonia_common/EnableControl'
  );
  const startStopCameraCall = useROSService<any>(
    toolbarServiceCallback,
    '/provider_vision/StarStopCamera',
    'sonia_common/StartStopMedia'
  );
  useROSTopicSubscriber<any>(
    batteryLevelCallback,
    '/provider_power/power',
    'sonia_common/PowerMsg'
  );
  useROSTopicSubscriber<any>(
    killSwitchCallback,
    '/provider_kill_mission/kill_switch_msg',
    'sonia_common/KillSwitchMsg'
  );
  useROSTopicSubscriber<any>(
    missionSwitchCallback,
    '/provider_kill_mission/mission_switch_msg',
    'sonia_common/MissionSwitchMsg'
  );
  useROSTopicSubscriber<any>(
    AUV7Callback,
    '/provider_system/system_temperature',
    'std_msgs/Float32'
  );
  useROSTopicSubscriber<any>(
    AUV8Callback,
    '/provider_jetson/system_temperature',
    'std_msgs/Float32'
  );

  let handleAllAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: 1,
      Y: 1,
      Z: 1,
      PITCH: 1,
      ROLL: 1,
      YAW: 1,
    });
    toolbarServicesCall(request);
  };

  let handleXYAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: 1,
      Y: 1,
      Z: -1,
      PITCH: -1,
      ROLL: -1,
      YAW: -1,
    });
    toolbarServicesCall(request);
  };

  let handleDepthAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: -1,
      Y: -1,
      Z: 1,
      PITCH: -1,
      ROLL: -1,
      YAW: -1,
    });
    toolbarServicesCall(request);
  };

  let handleRollAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: -1,
      Y: -1,
      Z: -1,
      PITCH: -1,
      ROLL: 1,
      YAW: -1,
    });
    toolbarServicesCall(request);
  };

  let handleYawAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: -1,
      Y: -1,
      Z: -1,
      PITCH: -1,
      ROLL: -1,
      YAW: 1,
    });
    toolbarServicesCall(request);
  };

  let handlePitchAxisClicked = () => {
    const request = ServiceRequestFactory({
      X: -1,
      Y: -1,
      Z: -1,
      PITCH: 1,
      ROLL: -1,
      YAW: -1,
    });
    toolbarServicesCall(request);
  };

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
        <Button label="All" handler={handleAllAxisClicked} />
        <Button
          label="XY"
          style={{ margin: '15px' }}
          handler={handleXYAxisClicked}
        />
        <Button
          label="Depth"
          style={{ margin: '15px' }}
          handler={handleDepthAxisClicked}
        />
        <Button
          label="Roll"
          style={{ margin: '15px' }}
          handler={handleRollAxisClicked}
        />
        <Button
          label="Pitch"
          style={{ margin: '15px' }}
          handler={handlePitchAxisClicked}
        />
        <Button
          label="Yaw"
          style={{ margin: '15px' }}
          handler={handleYawAxisClicked}
        />
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
        <LabelAndValueModule label="AUV7" value={AUV7Temp} unit="C" />
        <LabelAndValueModule label="AUV8" value={AUV8Temp} unit="C" />
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
            label={isKillSwitchOn ? 'Kill switch activated' : 'Kill switch off'}
            handler={() => {}}
            disabled={true}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarModule;

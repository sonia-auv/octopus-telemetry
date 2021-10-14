import Controls from './Controls'
import { Thruster } from './Thruster'
import { useState, useCallback } from 'react';
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import {GeneralContext} from "../../context/generalContext";

const ThrustersModule = () => {

  const [thruster1, setThruster1] = useState(0)
  const [thruster2, setThruster2] = useState(0)
  const [thruster3, setThruster3] = useState(0)
  const [thruster4, setThruster4] = useState(0)
  const [thruster5, setThruster5] = useState(0)
  const [thruster6, setThruster6] = useState(0)
  const [thruster7, setThruster7] = useState(0)
  const [thruster8, setThruster8] = useState(0)

  const [pwm1, setPwm1] = useState(1500)
  const [pwm2, setPwm2] = useState(1500)
  const [pwm3, setPwm3] = useState(1500)
  const [pwm4, setPwm4] = useState(1500)
  const [pwm5, setPwm5] = useState(1500)
  const [pwm6, setPwm6] = useState(1500)
  const [pwm7, setPwm7] = useState(1500)
  const [pwm8, setPwm8] = useState(1500)

  const thrusterEffortCallback = useCallback(
    (x: any) => {
        let data = x.data
        setThruster1(data[0]);
        setThruster2(data[1]);
        setThruster3(data[2]);
        setThruster4(data[3]);
        setThruster5(data[4]);
        setThruster6(data[5]);
        setThruster7(data[6]);
        setThruster8(data[7]);
    },
    []
  )

  const thrusterPwmCallback = useCallback(
    (x: any) => {
        let data = x.data
        setPwm1(data[0]);
        setPwm2(data[1]);
        setPwm3(data[2]);
        setPwm4(data[3]);
        setPwm5(data[4]);
        setPwm6(data[5]);
        setPwm7(data[6]);
        setPwm8(data[7]);
    },
    []
  )
  
  useROSTopicSubscriber<any>(thrusterEffortCallback, "/telemetry/thruster_newton", "std_msgs/Int8MultiArray");
  useROSTopicSubscriber<any>(thrusterPwmCallback, "/telemetry/thruster_pwm", "std_msgs/UInt16MultiArray");

  return (
    <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Controls />
                    <Thruster key={1}
                              effort={thruster1}
                              pwm={pwm1}
                              identification={1}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />                           
                    <Thruster key={2}
                              effort={thruster2}
                              pwm={pwm2}
                              identification={2}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />    
                    <Thruster key={3}
                              effort={thruster3}
                              pwm={pwm3}
                              identification={3}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    <Thruster key={4}
                              effort={thruster4}
                              pwm={pwm4}
                              identification={4}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    <Thruster key={5}
                              effort={thruster5}
                              pwm={pwm5}
                              identification={5}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    <Thruster key={6}
                              effort={thruster6}
                              pwm={pwm6}
                              identification={6}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    <Thruster key={7}
                              effort={thruster7}
                              pwm={pwm7}
                              identification={7}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    <Thruster key={8}
                              effort={thruster8}
                              pwm={pwm8}
                              identification={8}
                              minMark={-50}
                              maxMark={50}
                              step={25}
                              thumbEnabled={!context.isDryRunMode}
                    />
                    </div>
            )}
        </GeneralContext.Consumer>
  );
};

export default ThrustersModule;

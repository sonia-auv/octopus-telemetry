import React, { useCallback, useState } from 'react';
import TextField from './common/textfield/Textfield';
import Button from './common/button/Button';
import Grid from './common/grid/Grid';
import {GeneralContext} from "../context/generalContext";
import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";





const SetPwm = (props) => {
    const [pwms, setPwms] = useState([1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500]);
    
    // Set new value for the PWM.
    const setPwm = (id, value) => {
        if(!isNaN(value)){

            pwms[id] = Number(value);
        }
        setPwms([pwms[0], pwms[1], pwms[2], pwms[3], pwms[4], pwms[5], pwms[6], pwms[7]]);
    }

    // Verification of each PWM to ensure it is valid to send to the provider_thruster.
    const sendPwms = () => {
        let pwm_problem = false;
        for(let i = 0; i < pwms.length; i++){
            if( pwms[i] > 1900 || pwms[i] < 1100){
                pwm_problem = true
                setPwm(i, 1500);
            }
        }   
        if(pwm_problem){
            alert("Pwm out of range or invalid. Command not sent.")
        }
        else{
            // Send the PWMs.
            let array = new Uint16Array(pwms);
            let toPublish = MessageFactory({
                data: [pwms[0], pwms[1], pwms[2], pwms[3], pwms[4], pwms[5], pwms[6], pwms[7]]
            });
            console.log(toPublish);
            pwmMsgPublisher(toPublish);
        }
    }

    const resetPwms = () => {
        // Send the PWMs.
        let array = new Uint16Array(pwms);
        let toPublish = MessageFactory({
            data: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500]
        });
        console.log(toPublish);
        pwmMsgPublisher(toPublish);
    }

    const pwmMsgPublisher = useROSTopicPublisher("/provider_thruster/thruster_pwm", "/std_msgs/UInt16MultiArray");

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ flexDirection: 'row', width: '295px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                T1
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value= {pwms[0]} 
                                        disabled={ context.isDryRunMode} 
                                        handlerChange={(event) => {setPwm(0, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T5
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[4]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(4, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T2
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[1]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(1, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T6
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[5]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(5, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T3
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[2]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(2, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T7
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[6]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(6, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T4
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[3]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(3, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                T8
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwms[7]} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => {setPwm(7, event.target.value)}}/>
                            </Grid>
                            <Grid item xs={12}>
                            <Button disabled={ context.isDryRunMode} style={{ width: '300px', fontSize: '11px' }} label="Set PWM" handler={sendPwms}/>
                            <Button disabled={ context.isDryRunMode} style={{ width: '300px', marginTop: '10px', fontSize: '11px' }} label="Reset PWM" handler={resetPwms}/>
                            </Grid>
                        </Grid>                    
                </div>
            )}
        </GeneralContext.Consumer>
    );

};

export default SetPwm
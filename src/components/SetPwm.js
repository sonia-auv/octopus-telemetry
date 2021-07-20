import React, { useCallback, useState } from 'react';
import TextField from './common/textfield/Textfield';
import Button from './common/button/Button';
import Grid from './common/grid/Grid';
import {GeneralContext} from "../context/generalContext";
import { useROSService} from '../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";
import FormControl from './common/Form/FormControl';


const SetPwm = (props) => {

    const [pwm1, setPwm1] = useState(1500);
    const [pwm2, setPwm2] = useState(1500);
    const [pwm3, setPwm3] = useState(1500);
    const [pwm4, setPwm4] = useState(1500);
    const [pwm5, setPwm5] = useState(1500);
    const [pwm6, setPwm6] = useState(1500);
    const [pwm7, setPwm7] = useState(1500);
    const [pwm8, setPwm8] = useState(1500);

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ flexDirection: 'row', width: '300px'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                T1
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value= {pwm1} 
                                        disabled={ context.isDryRunMode} 
                                        handlerChange={(event) => setPwm1(event.target.value)}/>
                            </Grid>
                            <Grid item xs={6}>
                                T5
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm5} 
                                        disabled={ context.isDryRunMode}
                                        handlerChange={(event) => setPwm2(event.target.value)}/>
                            </Grid>
                            <Grid item xs={6}>
                                T2
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm2} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={6}>
                                T6
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm6} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={6}>
                                T3
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm3} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={6}>
                                T7
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm7} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={6}>
                                T4
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm4} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={6}>
                                T8
                                <TextField label="" id="standard-basic" 
                                        style={{ fontSize: '8px' }}
                                        value={pwm8} 
                                        disabled={ context.isDryRunMode}/>
                            </Grid>
                            <Grid item xs={12}>
                            <Button disabled={ context.isDryRunMode} style={{ width: '300px', fontSize: '9px' }} label="Set PWM"/>
                            </Grid>
                        </Grid>                    
                </div>
            )}
        </GeneralContext.Consumer>
    );

};

export default SetPwm
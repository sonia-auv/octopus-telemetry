import React, { useEffect, useCallback } from 'react';

import * as AttitudeIndicatorModule from './PFD/guages/attitude_indicator'
import * as AltimeterTickerModule from './PFD/guages/altimeter_ticker'
import * as AltimeterTapeModule from './PFD/guages/altimeter_tape'
import * as AirspeedTickerModule from './PFD/guages/airspeed_ticker'
import * as AirspeedTapeModule from './PFD/guages/airspeed_tape'
import * as VerticalSpeedIndicatorModule from './PFD/guages/vertical_speed'
import * as HorizontalSituationIndicatorModule from './PFD/guages/horizontal_situation'
import * as BottomLeftPanelModule from './PFD/guages/bottomleftpanel'
import * as BottomRightPanelModule from './PFD/guages/bottomrightpanel'

const ActuatorModule = () => {

    var attitudeIndicator: AttitudeIndicatorModule.AttitudeIndicator;
    var altimeterTicker: AltimeterTickerModule.AltimeterTicker;
    var altimeterTape: AltimeterTapeModule.AltimeterTape;
    var airspeedTicker: AirspeedTickerModule.AirspeedTicker;
    var airspeedTape: AirspeedTapeModule.AirspeedTape;
    var verticalSpeedIndicator: VerticalSpeedIndicatorModule.VerticalSpeedIndicator
    var horizontalSituationIndicator: HorizontalSituationIndicatorModule.HorizontalSituationIndicator;
    var bottomLeftPanel: BottomLeftPanelModule.BottomLeftPanel;
    var bottomRightPanel: BottomRightPanelModule.BottomRightPanel;


    var data = {
        "pitchAngle": 0,
        "bankAngle": 0,
        "turnCoordinationAngle": 0,
        "altitude": -10,
        "altitudeBug": -5,
        "verticalSpeed": -2,
        "verticalSpeedBug": 1.5,
        "airspeed": -2.0,
        "airspeedBug": -1.0,
        "heading": 0,
        "trueCourse": 0,
        "headingBug": 0,
        "velY": 2,
        "posX": 232,
        "posY": -100,
        "velRoll": 90,
        "velPitch": 270,
        "velYaw": -90,
    }

    const draw = () => {

        attitudeIndicator.draw();
        altimeterTape.draw();
        altimeterTicker.draw();
        airspeedTape.draw();
        airspeedTicker.draw();
        verticalSpeedIndicator.draw();
        horizontalSituationIndicator.draw();
        bottomLeftPanel.draw();
        bottomRightPanel.draw();
    }

    useEffect(() => {

        var cvs = document.getElementById("pfdcanvas") as HTMLCanvasElement;
        var ctx = cvs.getContext("2d");

        if (ctx) {

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, cvs.width, cvs.height);

            attitudeIndicator = AttitudeIndicatorModule.AttitudeIndicator(ctx, 
                {
                "width": 400,
                "height": 325,
                "x": 223,
                "y": 60
            }, 5, data)

            altimeterTicker = AltimeterTickerModule.AltimeterTicker(ctx, 
                {
                "width": 160,
                "height": 85,
                "x": 650,
                "y": 200
            }, data)

            altimeterTape = AltimeterTapeModule.AltimeterTape(ctx, 
                {
                "width": 100,
                "height": 400,
                "x": altimeterTicker.loc.x + 163,
                "y": altimeterTicker.loc.y + altimeterTicker.loc.height / 2 - 200
            }, data)

            airspeedTicker = AirspeedTickerModule.AirspeedTicker(ctx, 
                {
                "width": 80,
                "height": 85,
                "x": 100,
                "y": 200
            }, data)

            airspeedTape = AirspeedTapeModule.AirspeedTape(ctx, 
                {
                "width": 75,
                "height": 400,
                "x": airspeedTicker.loc.x - 78,
                "y": airspeedTicker.loc.y + airspeedTicker.loc.height / 2 - 200
            }, data)

            verticalSpeedIndicator = VerticalSpeedIndicatorModule.VerticalSpeedIndicator(ctx, 
                {
                "width": 120,
                "height": 400,
                "x": 920,
                "y": altimeterTape.loc.y + altimeterTape.loc.height / 2 - 200
            }, 33, data)

            horizontalSituationIndicator = HorizontalSituationIndicatorModule.HorizontalSituationIndicator(ctx, 
                {
                "width": 620,
                "height": 280,
                "x": 115,
                "y": 390
            }, 40, data)

            bottomLeftPanel = BottomLeftPanelModule.BottomLeftPanel(ctx, 
                {
                "width": 160,
                "height": 125,
                "x": 25,
                "y": 485
            }, data)

            bottomRightPanel = BottomRightPanelModule.BottomRightPanel(ctx, 
                {
                "width": 180,
                "height": 160,
                "x": 815,
                "y": 490
            }, data)

        }

        setInterval(() => {

            data.pitchAngle = data.pitchAngle + 1 // PITCH AXIS
            data.bankAngle = data.bankAngle + 1 //ROLL AXIS
            //data.turnCoordinationAngle = data.turnCoordinationAngle + 1 
            data.altitude =  data.altitude + 0.1 // Z POSITION
            //data.altitudeBug = 0 // Z POSITION TARGET
            data.airspeed = data.airspeed + 0.1 // SPEED ROLL AXIS
            //data.airspeedBug = data.airspeedBug + 0.02 // SPEED ROLL AXIS COMMAND
            data.heading = data.heading + 1
            //data.trueCourse = data.trueCourse + 1 // YAW ANGLE
            data.headingBug = 90 // YAW TARGET AXIS
            data.verticalSpeed = data.verticalSpeed + 0.05 // SPEED Z

            draw();
        }, 1000);

    }, []);


    return (
        <div style={{ width: '100%', height: '100%', flexDirection: 'row', backgroundColor: '#85D2BB', textAlign: 'center' }}>
            <canvas id="pfdcanvas" width="1050" height="680"></canvas>
        </div>
    );
};

export default ActuatorModule;

import React, { useEffect, useCallback } from 'react';
import { GeneralContext } from "../context/generalContext";

import * as AttitudeIndicatorModule from './PFD/guages/attitude_indicator'
import * as AltimeterTickerModule from './PFD/guages/altimeter_ticker'
import * as AltimeterTapeModule from './PFD/guages/altimeter_tape'
import * as AirspeedTickerModule from './PFD/guages/airspeed_ticker'
import * as AirspeedTapeModule from './PFD/guages/airspeed_tape'
import * as VerticalSpeedIndicatorModule from './PFD/guages/vertical_speed'
import * as HorizontalSituationIndicatorModule from './PFD/guages/horizontal_situation'

const ActuatorModule = () => {

    var attitudeIndicator: AttitudeIndicatorModule.AttitudeIndicator;
    var altimeterTicker: AltimeterTickerModule.AltimeterTicker;
    var altimeterTape: AltimeterTapeModule.AltimeterTape;
    var airspeedTicker: AirspeedTickerModule.AirspeedTicker;
    var airspeedTape: AirspeedTapeModule.AirspeedTape;
    var verticalSpeedIndicator: VerticalSpeedIndicatorModule.VerticalSpeedIndicator
    var horizontalSituationIndicator: HorizontalSituationIndicatorModule.HorizontalSituationIndicator;


    var data = {
        "pitchAngle": 0,
        "bankAngle": 0,
        "turnCoordinationAngle": 0,
        "altitude": 10,
        "altitudeBug": 100,
        "verticalSpeed": 10,
        "verticalSpeedBug": 100,
        "airspeed": 15,
        "airspeedbug": 0,
        "heading": 0,
        "trueCourse": 0,
        "headingBug": 0,
    }

    const draw = () => {

        attitudeIndicator.draw();
        altimeterTape.draw();
        altimeterTicker.draw();
        airspeedTape.draw();
        airspeedTicker.draw();
        verticalSpeedIndicator.draw();
        horizontalSituationIndicator.draw();
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
                "y": 20
            }, 5, data)

            altimeterTicker = AltimeterTickerModule.AltimeterTicker(ctx, 
                {
                "width": 160,
                "height": 85,
                "x": 650,
                "y": 160
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
                "y": 160
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
                "width": 675,
                "height": 270,
                "x": 115,
                "y": 385
            }, 40, data)

        }

        setInterval(() => {

            data.pitchAngle = data.pitchAngle + 1
            data.bankAngle = data.bankAngle + 1
            data.turnCoordinationAngle = data.turnCoordinationAngle + 1
            data.altitude = data.altitude + 1
            data.altitudeBug = data.altitudeBug - 10
            data.airspeed = data.airspeed + 1
            data.airspeedbug = data.airspeedbug - 10
            data.heading = data.heading + 2
            data.trueCourse = data.trueCourse + 1
            data.headingBug = data.headingBug - 1
            data.verticalSpeed = data.verticalSpeed + 1
            data.verticalSpeedBug = data.verticalSpeedBug - 10

            draw();
        }, 1000);

    }, []);


    return (
        <div style={{ width: '100%', height: '100%', flexDirection: 'row', backgroundColor: '#85D2BB', textAlign: 'center' }}>
            <canvas id="pfdcanvas" width="1050" height="660"></canvas>
        </div>
    );
};

export default ActuatorModule;

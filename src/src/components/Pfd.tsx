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
import { useROSTopicSubscriber } from "../hooks/useROSTopicSubscriber";

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
        "altitude": 0,
        "altitudeBug": 0,
        "verticalSpeed": 0,
        "verticalSpeedBug": 0,
        "airspeed": 0,
        "airspeedBug": 0,
        "heading": 0,
        "trueCourse": 0,
        "headingBug": 0,
        "velY": 0,
        "posX": 0,
        "posY": 0,
        "velRoll": 0,
        "velPitch": 0,
        "velYaw": 0,
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

        draw();

    }, []);

    const odomCallback = useCallback(
        (x: any) => {
            data.posX = x.pose.pose.position.x.toFixed(2)
            data.posY = x.pose.pose.position.y.toFixed(2)
            data.altitude = x.pose.pose.position.z.toFixed(2)
            data.bankAngle = x.pose.pose.orientation.x.toFixed(2)
            data.pitchAngle = x.pose.pose.orientation.y.toFixed(2)
            data.heading = x.pose.pose.orientation.z.toFixed(2)
            data.airspeed = x.twist.twist.linear.x.toFixed(2)
            data.velY = x.twist.twist.linear.y.toFixed(2)
            data.verticalSpeed = x.twist.twist.linear.z.toFixed(2)
            data.velRoll = x.twist.twist.angular.x.toFixed(2)
            data.velPitch = x.twist.twist.angular.y.toFixed(2)
            data.velYaw = x.twist.twist.angular.z.toFixed(2)
            draw();
        },
        []
    )

    const targetCallback = useCallback(
        (x: any) => {
            data.altitudeBug = x.position.z.toFixed(2)
            data.headingBug = x.orientation.z.toFixed(2)
            draw();
        },
        []
    )

    const targetVelocityCallback = useCallback(
        (x: any) => {
            data.verticalSpeedBug = x.linear.z.toFixed(2)
            data.airspeedBug = x.linear.x.toFixed(2)
            draw();
        },
        []
    )

    useROSTopicSubscriber<any>(odomCallback, "/proc_navigation/odom", "nav_msgs/Odometry")
    useROSTopicSubscriber<any>(targetCallback, "/proc_control/current_target", "geometry_msgs/Pose")
    useROSTopicSubscriber<any>(targetVelocityCallback, "/proc_control/current_target_velocity", "geometry_msgs/Twist")

    return (
        <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
            <canvas id="pfdcanvas" width="1050" height="680"></canvas>
        </div>
    );
};

export default ActuatorModule;

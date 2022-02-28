import { useEffect, useCallback } from 'react';

import * as AttitudeIndicatorModule from './guages/attitude_indicator'
import * as AltimeterTickerModule from './guages/altimeter_ticker'
import * as AltimeterTapeModule from './guages/altimeter_tape'
import * as AirspeedTickerModule from './guages/airspeed_ticker'
import * as AirspeedTapeModule from './guages/airspeed_tape'
import * as VerticalSpeedIndicatorModule from './guages/vertical_speed'
import * as HorizontalSituationIndicatorModule from './guages/horizontal_situation'
import * as BottomLeftPanelModule from './guages/bottomleftpanel'
import * as BottomRightPanelModule from './guages/bottomrightpanel'

import { useROSTopicSubscriber } from "../../hooks/useROSTopicSubscriber";

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
    "pitchAngle": "0.00",
    "bankAngle": "0.00",
    "turnCoordinationAngle": "0.00",
    "altitude": "0.00",
    "altitudeBug": "0.00",
    "verticalSpeed": "0.00",
    "verticalSpeedBug": "0.00",
    "airspeed": "0.00",
    "airspeedBug": "0.00",
    "heading": "0.00",
    "trueCourse": "0.00",
    "headingBug": "0.00",
    "velY": "0.00",
    "posX": "0.00",
    "posY": "0.00",
    "velRoll": "0.00",
    "velPitch": "0.00",
    "velYaw": "0.00",
}

const ActuatorModule = () => {

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
            try{ data.posX = x.pose.pose.position.x.toFixed(2); } catch(error){ data.posX = "0.00" }
            try{ data.posY = x.pose.pose.position.y.toFixed(2); } catch(error){ data.posY = "0.00" }
            try{ data.altitude = (-x.pose.pose.position.z).toFixed(2); } catch(error){ data.altitude = "0.00" }
            try{ data.bankAngle = x.pose.pose.orientation.x.toFixed(2); } catch(error){ data.bankAngle = "0.00" }
            try{ data.pitchAngle = x.pose.pose.orientation.y.toFixed(2); } catch(error){ data.pitchAngle = "0.00" }
            try{ data.heading = x.pose.pose.orientation.z.toFixed(2); } catch(error){ data.heading = "0.00" }
            try{ data.airspeed = x.twist.twist.linear.x.toFixed(2); } catch(error){ data.airspeed = "0.00" }
            try{ data.velY = x.twist.twist.linear.y.toFixed(2); } catch(error){ data.velY = "0.00" }
            try{ data.verticalSpeed = x.twist.twist.linear.z.toFixed(2); } catch(error){ data.verticalSpeed = "0.00" }
            try{ data.velRoll = x.twist.twist.angular.x.toFixed(2); } catch(error){ data.velRoll = "0.00" }
            try{ data.velPitch = x.twist.twist.angular.y.toFixed(2); } catch(error){ data.velPitch = "0.00" }
            try{ data.velYaw = x.twist.twist.angular.z.toFixed(2); } catch(error){ data.velYaw = "0.00" }
            draw();
        },
        []
    )

    const targetCallback = useCallback(
        (x: any) => {
            try{ data.altitudeBug = x.position.z.toFixed(2); } catch(error){ data.altitudeBug = "0.00" }
            try{ data.headingBug = x.orientation.z.toFixed(2); } catch(error){ data.headingBug = "0.00" }
            draw();
        },
        []
    )

    const targetVelocityCallback = useCallback(
        (x: any) => {
            try{ data.verticalSpeedBug = x.linear.z.toFixed(2); } catch(error){ data.verticalSpeedBug = "0.00" }
            try{ data.airspeedBug = x.linear.x.toFixed(2); } catch(error){ data.airspeedBug = "0.00" }
            draw();
        },
        []
    )

    useROSTopicSubscriber<any>(odomCallback, "/telemetry/auv_states", "nav_msgs/Odometry")
    useROSTopicSubscriber<any>(targetCallback, "/proc_control/current_target", "geometry_msgs/Pose")
    useROSTopicSubscriber<any>(targetVelocityCallback, "/proc_control/current_target_velocity", "geometry_msgs/Twist")

    return (
        <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
            <canvas id="pfdcanvas" width="1050" height="680"></canvas>
        </div>
    );
};

export default ActuatorModule;

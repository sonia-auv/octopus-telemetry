import React, { useState, useCallback, useContext } from 'react';
import { GeneralContext } from "../context/generalContext";
import { Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import Button from './common/button/Button';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { useROSService } from '../hooks/useROSService'
import { useROSTopicPublisher } from '../hooks/useROSTopicPublisher'
import ROSLIB from "roslib";

const MissionManager = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(1),
                width: '80%',
            }
        }),
        );

    const classes = useStyles();

    const [currentMissionName, setCurrentMissionName] = useState("");
    const [missions, setMissionsList] = useState<string[]>([]);

    // Reponse en retour a l appel du service
    const missionListCallback = useCallback(
        (response: ROSLIB.ServiceResponse) => {
            let missionsList: Array<string>
            missionsList = []
            var tempList = JSON.parse(JSON.stringify(response));
            tempList = tempList["missions"];
            tempList = tempList.split(";");
            tempList.sort(function (a: string, b: string) {
              if ( a.toLowerCase() < b.toLowerCase() ) {
                  return -1;
              } else if ( a.toLowerCase() > b.toLowerCase() ) {
                  return 1;
              } else {
                  return 0;
              }});
            tempList.forEach((name: string) => {
              if(name !== ""){
                missionsList.push(name);
              }
            });
            console.log(missionsList);
            setMissionsList(missionsList);
          },
          []
    )

    const context = useContext(GeneralContext)
    const missionNameMsgPublisher = useROSTopicPublisher<any>("/mission_manager/mission_name_msg", "/mission_manager/MissionNameMsg");
    const missionManagerServiceCall = useROSService<any>(missionListCallback, "/mission_executor/list_missions", "ListMissions")

    // Selection d une missions dans le select.
    const behaviorSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrentMissionName(event.target.value as string);
    }

    // Publish du nom de la mission.
    const loadMission = () => {
        var toPublish = new ROSLIB.Message({name: currentMissionName});
        missionNameMsgPublisher(toPublish);
    }

    // Appel du service pour update la liste de missions.
    const updateMissionList = async () => {
        missionManagerServiceCall({}); 
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Mission Manager</h1>            
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Mission</InputLabel>
                        <Select
                        label="Mission"
                        onChange={behaviorSelected}
                        value={currentMissionName}
                        >
                        <MenuItem value=""> </MenuItem>
                        { missions.map(name => (
                            <MenuItem value={name}>{name}</MenuItem>
                        )) }
                    </Select>
                    </FormControl>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Update List</h1>
                    <Button style={{ fontSize: '20px', alignSelf: 'center' }} handler={updateMissionList} label="Update"/>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Load Mission</h1>
                    <Button disabled={missions.length === 0} style={{ fontSize: '20px', alignSelf: 'center' }} handler={loadMission} label="Send"/>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default MissionManager;
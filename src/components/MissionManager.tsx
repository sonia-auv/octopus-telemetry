import React, { useState, useCallback, useContext } from 'react';
import { GeneralContext } from "../context/generalContext";
import InputLabel from './common/Input/InputLabel';
import Button from './common/button/Button';
import Select from './common/select/Select';
import FormControl from './common/Form/FormControl';

import { useROSService} from '../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";

const MissionManager = () => {

    const [currentMissionName, setCurrentMissionName] = useState("");
    const [allMissions, setMissionsList] = useState<[]>([]);

    // Reponse en retour a l appel du service
    const missionListCallback = useCallback(
        (response: ROSLIB.ServiceResponse) => {
            var missionsList: any = []
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
                var item = {value: name}
                missionsList.push(item);
              }
            });
            console.log(missionsList);
            setMissionsList(missionsList);
          },
          []
    )

    const missionNameMsgPublisher = useROSTopicPublisher<any>("/mission_manager/mission_name_msg", "/mission_manager/MissionNameMsg");
    const missionManagerServiceCall = useROSService<any>(missionListCallback, "/mission_executor/list_missions", "ListMissions")

    // Selection d une missions dans le select.
    const behaviorSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrentMissionName(event.target.value as string);
    }

    // Publish du nom de la mission.
    const loadMission = () => {
        var toPublish = MessageFactory({
            name : currentMissionName
        })
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
                    <FormControl>
                        <InputLabel id="select-outlined-label">Mission</InputLabel>
                        <Select
                        labelId="select-outlined-label"
                        id="select-outlined"
                        label="Mission"
                        style={{ backgroundColor: 'white', width: '150%', alignSelf: 'center', textAlign: 'left'}}
                        handlerChange={behaviorSelected}
                        value={currentMissionName ? currentMissionName : "None"}
                        listValue={allMissions}
                        >
                        </Select>
                    </FormControl>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Update List</h1>
                    <Button style={{ fontSize: '20px', alignSelf: 'center' }} handler={updateMissionList} label="Update"/>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Load Mission</h1>
                    <Button disabled={allMissions.length === 0} style={{ fontSize: '20px', alignSelf: 'center' }} handler={loadMission} label="Send"/>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default MissionManager;

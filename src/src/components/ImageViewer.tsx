import React, { useCallback, useContext, useState } from 'react';
import { GeneralContext } from "../context/generalContext";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ROSLIB from "roslib";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import { RosContext } from "../context/rosContext";
import { useROSService } from '../hooks/useROSService'

const ImageViewer = () => {

    const ros = useContext(RosContext);

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(1),
            "& .MuiButton-iconSizeMedium > *:first-child": {
                fontSize: "20px"
            },
            "& .MuiButton-startIcon": {
                marginLeft: "-2px",
                marginRight: "0px"
            }
        },
    }));

    const [topic, setTopic] = useState<ROSLIB.Topic | null>(null);
    const [listTopic, setListTopic] = useState<[]>([]);

    const imageCallback = useCallback(
        (x: any) => {

            var im = "data:image/jpeg;base64," + x.data;
            var displayImage = document.getElementById("imageviewer");
            if (displayImage) {
                displayImage.setAttribute('src', im);
            }
        },
        []
    )

    const handleChange = (x: any) => {
        if (topic) {
            topic.unsubscribe()
        }
        if (x.target.value != "None") 
        {
            const newtopic = new ROSLIB.Topic({ ros: ros, name: x.target.value, messageType: "sensor_msgs/CompressedImage" })
            setTopic(newtopic)
            if (newtopic) 
            {
                newtopic.subscribe(imageCallback);
            }
        }
    }

    const clickStop = () => {
        if (topic) {
            topic.unsubscribe()
        }
    }

    const clickPlay = () => {
        if (topic) {
            topic.subscribe(imageCallback);
        }
    }

    //Filtre sur les types de message que le souhaite 
    const messageFilter = ["sensor_msgs/CompressedImage"]

    const serviceCallback = useCallback(
        (x: any) => {
            var tab: any = []
            x.topics.map((value: any, index: any) => {
                if (messageFilter.includes(x.types[index])) {
                    tab.push(value);
                }
            })
            setListTopic(tab)
        }, []
    )

    const topicServiceCall = useROSService<any>(serviceCallback, "/rosapi/topics/", "rosapi/Topics")

    const clickUpdate = () => {
        var request = new ROSLIB.ServiceRequest({});
        topicServiceCall(request)
    }

    const classes = useStyles();

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#85D2BB' }}>
                    <div style={{ width: '96%', height: '90%', flexDirection: 'row', marginLeft: '2%' }}>
                        <h1 style={{ fontSize: '20px', textAlign: 'center' }}>CAMERA VIEWER</h1>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="select-outlined-label">Topic</InputLabel>
                            <Select
                                labelId="select-outlined-label"
                                id="select-outlined"
                                onChange={handleChange}
                                label="Topic"
                                value={topic?.name ? topic.name : "None"}
                            >
                                <MenuItem value={"None"}>None</MenuItem>
                                {listTopic.map((value, index) => {
                                    return <MenuItem value={value}>{value}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<CachedIcon />}
                            onClick={clickUpdate}
                        ></Button>
                        <br></br>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<StopIcon />}
                            onClick={clickStop}
                        ></Button>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<PlayCircleFilledIcon />}
                            onClick={clickPlay}
                        ></Button>
                        <div style={{ width: "100%", height: "calc(100% - 140px)" }}><img id="imageviewer" width="100%" height="100%"></img></div>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ImageViewer;

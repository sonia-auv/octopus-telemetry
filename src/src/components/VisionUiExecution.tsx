import { useState, useCallback, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from './common/button/Button'
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    contained: {
        backgroundColor: 'lightgrey',
        border: '2px solid rgba(0, 0, 0, 1.0)'
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

const VisionUIExecutionTabModule = () => {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [filterChainList, setfilterChainList] = useState<[]>([]);
    const [filterChainSelected, setFilterChainSelected] = useState('');
    const [mediaSelected, setMediaSelected] = useState('');
    const [mediaList, setMediaList] = useState<[]>([]);
    const [file, setFile] = useState('');
    const [topicName, setTopicName] = useState('');

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const handleChangeFilterChain = (x: any) => {

        setFilterChainSelected(x.target.value)
    }

    const handleChangeMedia = (x: any) => {
        setMediaSelected(x.target.value)
    }

    function fileDialogClicked(event: any) {
        setFile(event.target.files[0].name)
    }

    const inputFile = useRef<HTMLInputElement>(null)

    const handleFileOpen = () => {

        if (inputFile.current) {
            inputFile.current.click();
        }

    }

    const handleTopicNameChange = (e: any) => {
        setTopicName(e.target.value)
    }

    const startMediaCmdServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const executeCmdServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    // Start media service
    const startMediaCmdServiceCall = useROSService<any>(startMediaCmdServiceCallback, "/provider_vision/start_stop_camera", "sonia_common/StartStopMedia")

    // Execute command service
    const executeCmdServiceCall = useROSService<any>(executeCmdServiceCallback, "/proc_image_processing/execute_cmd", "sonia_common/ExecuteCmd")

    const handleCreate = () => {

        if (name !== '') {

            //Topic mode
            var media = topicName

            // Video mode
            if (media === '' && file !== '') {
                media = file

                var request = new ROSLIB.ServiceRequest({ camera_name: media, action: 1 });
                startMediaCmdServiceCall(request)
                media = '/provider_vision' + media.replace('.', '')

            }
            // Normal mode
            if (media === '') {
                media = mediaSelected
            }

            if (media !== '' && filterChainSelected !== '') {
                var request2 = new ROSLIB.ServiceRequest({ node_name: name, filterchain_name: filterChainSelected, media_name: media, cmd: 1 });
                executeCmdServiceCall(request2)
            }
        }
    }

    const getFilterChainlistServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push({ value: v })
            });

            // Sort values
            tab.sort((a: any, b: any) => a.value !== b.value ? a.value < b.value ? -1 : 1 : 0);

            setfilterChainList(tab);

        }, []
    )

    const getFilterChainlistServiceCall = useROSService<any>(getFilterChainlistServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList")

    const handleRefreshFilterChainList = () => {
        var request = new ROSLIB.ServiceRequest({ cmd: 3 });
        getFilterChainlistServiceCall(request)
    }

    const getMedialistServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push({ id: index, value: v })
            });

            // Sort values
            tab.sort((a: any, b: any) => a.value !== b.value ? a.value < b.value ? -1 : 1 : 0);

            setMediaList(tab);

        }, []
    )

    const getMedialistServiceCall = useROSService<any>(getMedialistServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList")

    const handleRefreshMediaList = () => {
        var request = new ROSLIB.ServiceRequest({ cmd: 2 });
        getMedialistServiceCall(request)
    }

    return (
        <div>
            <TextField value={name} onChange={handleNameChange} id="visionUi_name_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', backgroundColor: 'white'}} />
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="selectFilterChain-outlined-label">Filterchain</InputLabel>
                <Select
                    labelId="selectFilterChain-outlined-label"
                    fullWidth={true}
                    id="selectFilterChain-outlined"
                    onChange={handleChangeFilterChain}
                    label="Filter chain"
                    value={filterChainSelected ? filterChainSelected : "None"}
                    style={{backgroundColor: 'white'}}>
                    <MenuItem id={"selectFilterChainNone"} value={"None"}>None</MenuItem>
                    {filterChainList.map((value) => {
                        return <MenuItem id={"selectFilterChain" + value["value"]} value={value["value"]}>{value["value"]}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button
                className={classes.button}
                label={<CachedIcon />}
                handler={handleRefreshFilterChainList}
            ></Button>
            <br></br>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="selectMedia-outlined-label">Media</InputLabel>
                <Select
                    labelId="selectMedia-outlined-label"
                    fullWidth={true}
                    id="selectMedia-outlined"
                    onChange={handleChangeMedia}
                    label="Media"
                    value={mediaSelected ? mediaSelected : "None"}
                    style={{backgroundColor: 'white'}}>
                    <MenuItem id={"selectMediaNone"} value={"None"}>None</MenuItem>
                    {mediaList.map((value) => {
                        return <MenuItem id={"selectMedia" + value["value"]} value={value["value"]}>{value["value"]}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button
                className={classes.button}
                label={<CachedIcon />}
                handler={handleRefreshMediaList}
            />
            <br></br>
            <div style={{ width: '75%', float: 'left' }} >
                <TextField disabled={true} value={file} id="file_id" label="File" variant="outlined"
                           fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px', backgroundColor: 'white' }} />
            </div>
            <input type='file' id='file' ref={inputFile} onChange={fileDialogClicked} style={{ display: 'none' }} />
            <div style={{ float: 'right' }}><Button  style={{ fontSize: '20px', marginTop: '22px' }} handler={handleFileOpen} label="..." />
            <TextField value={topicName} onChange={handleTopicNameChange} id="visionUi_topicname_id" label="Topic Name"
                       variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px', backgroundColor: 'white' }} />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'right' }} handler={handleCreate} label="Create" />
            </div>
        </div>
    );
};

export default VisionUIExecutionTabModule;

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";
import CachedIcon from '@material-ui/icons/Cached';
import { Tooltip } from '@material-ui/core';
import * as CommonVisionUIStyle from './VisionUiCommon';

const VisionUIFilterModule = () => {

    const classes = CommonVisionUIStyle.useStyles();

    const ListFilterStyle = withStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
    })(List);

    const ListSettingsStyle = withStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
    })(List);

    const [executionList, setExecutionList] = useState<[]>([]);
    const [executionSelected, setExecutionSelected] = useState('');
    const [executionMedia, setExecutionMedia] = useState('');
    const executionSelectedRef = useRef('');
    const [executionFilterChain, setExecutionFilterChain] = useState('');
    const [filterSelected, setFilterSelected] = useState(null);
    const [filterList, setFilterList] = useState<[]>([]);
    const [filterListItems, setFilterListItems] = useState<[]>([]);
    const [executionFilterSelected, setExecutionFilterSelected] = useState('');
    const [parameterList, setParameterList] = useState<{ paramName: string, type: string, value: string, min: string, max: string, desc: string }[]>([]);
    const [currentParamFocus, setCurrentParamFocus] = useState(0);
    const [currentSubParamFocus, setCurrentSubParamFocus] = useState(0);
    const [executionFilterAutoSelect, setExecutionFilterAutoSelect] = useState(0);

    const getExecutionFilterChainListServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: string, index: number) => {
                tab.push({ id: index, value: v })
            });

            setFilterListItems(tab)

        }, []
    )

    // Auto-select after clicked up/down on filter
    useEffect(() => {

        var autoselectitem = ""

        filterListItems.map((item, i) => {
            if (i == executionFilterAutoSelect) {
                autoselectitem = item["value"]
            }
        });

        setExecutionFilterSelected(autoselectitem)

    }, [filterListItems]);

    const getExecutionFilterChainListServiceCall = useROSService<any>(getExecutionFilterChainListServiceCallback, "/proc_image_processing/get_filterchain_filter", "sonia_common/GetFilterchainFilter");

    const getFilterChainFromExecutionCallback = useCallback(
        (x: any) => {

            var executionFilterChain = x.list
            setExecutionFilterChain(executionFilterChain)

        }, []
    )

    // After we get execution filter chain we can get the list of filter 
    useEffect(() => {

        // Get all filter for this execution
        var request = new ROSLIB.ServiceRequest({ exec_name: executionSelectedRef.current, filterchain: executionFilterChain });
        getExecutionFilterChainListServiceCall(request)

    }, [executionFilterChain]);

    const getMediaFromExecutionCallback = useCallback(
        (x: any) => {

            var media = x.list
            setExecutionMedia(media)

        }, []
    )

    const getFilterChainFromExecutionServiceCall = useROSService<any>(getFilterChainFromExecutionCallback, "/proc_image_processing/get_media_from_execution", "sonia_common/GetMediaFromExecution");
    const getMediaFromExecutionServiceCall = useROSService<any>(getMediaFromExecutionCallback, "/proc_image_processing/get_media_from_execution", "sonia_common/GetMediaFromExecution");


    // Clear lists if no execution selected
    useEffect(() => {

        if (executionSelected == "None") {
            setFilterListItems([])
            setParameterList([])
        }

    }, [executionSelected, executionList]);

    const handleChangeExecution = (x: any) => {

        setExecutionSelected(x.target.value)
        executionSelectedRef.current = x.target.value

        //Get media from execution
        var request = new ROSLIB.ServiceRequest({ exec_name: x.target.value });
        getMediaFromExecutionServiceCall(request)

        // Get filter chain from execution
        var request2 = new ROSLIB.ServiceRequest({ exec_name: x.target.value });
        getFilterChainFromExecutionServiceCall(request2)

    }

    const fillExecutionListServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push({ id: index, value: v })
            });

            setExecutionList(tab);

        }, []
    )

    const fillExecutionListServiceCall = useROSService<any>(fillExecutionListServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList");

    const handleRefreshExecutionList = (x: any) => {

        var request = new ROSLIB.ServiceRequest({ cmd: 1 });
        fillExecutionListServiceCall(request)
    }

    const deleteExecutionServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const deleteExecutionServiceCall = useROSService<any>(deleteExecutionServiceCallback, "/proc_image_processing/execute_cmd", "sonia_common/ExecuteCmd");

    const handleClickDeleteExecution = (value: any) => {

        setFilterListItems([])
        setParameterList([])

        if (executionSelected !== '' && executionMedia !== '' && executionFilterChain !== '') {

            var request = new ROSLIB.ServiceRequest({ node_name: executionSelected, filterchain_name: executionFilterChain, media_name: executionMedia, cmd: 2 });
            deleteExecutionServiceCall(request)

            setExecutionMedia('')
            setExecutionFilterChain('')
            setExecutionSelected('')

            // Refresh execution list after delete
            setTimeout(() => {
                var request = new ROSLIB.ServiceRequest({ cmd: 1 });
                fillExecutionListServiceCall(request)
            }, 500)


        }

    }

    const getAllFilterChainListServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push({ id: index, value: v })
            });

            setFilterList(tab)

        }, []
    )

    const getAllFilterChainListServiceCall = useROSService<any>(getAllFilterChainListServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList");

    const handleRefreshFilterList = () => {

        var request = new ROSLIB.ServiceRequest({ cmd: 4 });
        getAllFilterChainListServiceCall(request)

    }

    const handleChangeFilter = (x: any) => {
        setFilterSelected(x.target.value)
    }

    const addDeleteFilterServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const addDeleteFilterServiceCall = useROSService<any>(addDeleteFilterServiceCallback, "/proc_image_processing/manage_filterchain_filter", "sonia_common/ManageFilterchain");

    const handleClickAdd = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && filterSelected !== '') {

            var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter: filterSelected, cmd: 1 });
            addDeleteFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain });
                getExecutionFilterChainListServiceCall(request2)
            }, 500)

        }

    }

    const handleClickDelete = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && executionFilterSelected !== '') {

            var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter: executionFilterSelected, cmd: 2 });
            addDeleteFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain });
                getExecutionFilterChainListServiceCall(request2)
            }, 500)

        }

    }

    const saveFilterServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const saveFilterServiceCall = useROSService<any>(saveFilterServiceCallback, "/proc_image_processing/save_filterchain", "sonia_common/SaveFilterchain");

    const handleClickSave = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '') {

            var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, cmd: 1 });
            saveFilterServiceCall(request)
        }

    }

    const handleClickRestore = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '') {

            var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, cmd: 2 });
            saveFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain });
                getExecutionFilterChainListServiceCall(request2)
            }, 500)

        }

    }

    const orderFilterServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const orderFilterServiceCall = useROSService<any>(orderFilterServiceCallback, "/proc_image_processing/set_filterchain_filter_order", "sonia_common/SetFilterchainFilterOrder");


    const handleClickUp = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && executionFilterSelected !== '') {

            var index = -1

            filterListItems.map((item, i) => {
                if (item['value'] === executionFilterSelected) {
                    index = item['id']
                }
            })

            if (index !== -1) {

                setExecutionFilterAutoSelect(index - 1)

                var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter_index: index, cmd: 1 });
                orderFilterServiceCall(request)

                setTimeout(() => {
                    //Update filter list
                    var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain });
                    getExecutionFilterChainListServiceCall(request2)
                }, 500)

            }

        }

    }

    const handleClickDown = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && executionFilterSelected !== '') {

            var index = -1

            filterListItems.map((item, i) => {
                if (item['value'] === executionFilterSelected)
                    index = item['id']
            })

            if (index !== -1) {

                setExecutionFilterAutoSelect(index + 1)

                var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter_index: index, cmd: 2 });
                orderFilterServiceCall(request)

                setTimeout(() => {
                    //Update filter list
                    var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain });
                    getExecutionFilterChainListServiceCall(request2)
                }, 500)

            }
        }
    }

    const filterChainFilterObserverServiceCallback = useCallback(
        (x: any) => {

        }, []
    )

    const filterChainFilterAllParamServiceCallback = useCallback(
        (x: any) => {

            var receivedList = x.list

            var tab: any = []
            receivedList.split(';').forEach((v: string, index: number) => {

                var obj = {
                    "paramName": "",
                    "type": "",
                    "value": "",
                    "min": "",
                    "max": "",
                    "desc": ""
                }

                v.split('|').forEach((subv: string, subindex: number) => {

                    if (subindex === 0)
                        obj.paramName = subv

                    if (subindex === 1)
                        obj.type = subv

                    if (subindex === 2)
                        obj.value = obj.type === "Double" ? parseFloat(subv).toFixed(2) : subv

                    if (subindex === 3)
                        obj.min = obj.type === "Double" ? parseFloat(subv).toFixed(2) : subv

                    if (subindex === 4)
                        obj.max = obj.type === "Double" ? parseFloat(subv).toFixed(2) : subv

                    if (subindex === 5)
                        obj.desc = subv
                });

                tab.push(obj)

            });

            setParameterList(tab)

        }, []
    )

    const filterChainFilterObserverServiceCall = useROSService<any>(filterChainFilterObserverServiceCallback, "/proc_image_processing/set_filterchain_filter_observer", "sonia_common/SetFilterchainFilterObserver");
    const filterChainFilterAllParamServiceCall = useROSService<any>(filterChainFilterAllParamServiceCallback, "/proc_image_processing/get_filterchain_filter_all_param", "sonia_common/GetFilterchainFilterAllParam");

    const handSelectedExecutionFilterChain = (event: any, value: any) => {

        setExecutionFilterSelected(value);

        // When selection changed send information about what filter currently observed and get parameters for this filter
        var request = new ROSLIB.ServiceRequest({ execution: executionSelected, filterchain: executionFilterChain, filter: value });
        filterChainFilterObserverServiceCall(request)

        setTimeout(() => {
            // and get parameters for this filter
            var request2 = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter: value });
            filterChainFilterAllParamServiceCall(request2)
        }, 500)

    };

    function FilterList(props: any) {

        const { index, style } = props;

        return (
            <div>
                {filterListItems.map((item) => (
                    <CommonVisionUIStyle.ListItemStyle button style={style} key={"filterList" + item['id']} selected={executionFilterSelected === item['value']} autoFocus={executionFilterSelected === item['value']}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedExecutionFilterChain(event, item['value'])} />
                    </CommonVisionUIStyle.ListItemStyle>
                ))}
            </div>
        );
    }

    const checkSyntaxInteger = (v: any) => [...v].every(c => '0123456789-'.includes(c));
    const checkSyntaxDouble = (v: any) => [...v].every(c => '0123456789-.'.includes(c));

    const changeParameterServiceCallback = useCallback(
        (x: any) => {

        }, []
    )


    const changeParameterServiceCall = useROSService<any>(changeParameterServiceCallback, "/proc_image_processing/set_filterchain_filter_param", "sonia_common/SetFilterchainFilterParam");

    const handleChangeParamValue = (event: any, index: any, arg: any) => {

        setCurrentParamFocus(index)

        var newValue = event.target.value

        parameterList?.map((item, i) => {

            if (i === index) {

                if (item['type'] === "Boolean") {
                    let temporaryarray = parameterList.slice();
                    if (item['value'] == "0") {
                        temporaryarray[index]["value"] = "1";
                        newValue = "1";
                    }
                    else {
                        temporaryarray[index]["value"] = "0";
                        newValue = "0";
                    }
                    setParameterList(temporaryarray);
                }
                if (item['type'] === "Integer" || item['type'] === "Double") {
                    let temporaryarray = parameterList.slice();
                    if (arg == "value") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["value"] = newValue;
                        setCurrentSubParamFocus(1)
                    }
                    if (arg == "min") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["min"] = newValue;
                        setCurrentSubParamFocus(2)
                    }
                    if (arg == "max") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["max"] = newValue;
                        setCurrentSubParamFocus(3)
                    }
                    setParameterList(temporaryarray);
                }
                if (item['type'] === "String") {
                    let temporaryarray = parameterList.slice();
                    if (arg == "value") {
                        temporaryarray[index]["value"] = newValue;
                    }
                    setParameterList(temporaryarray);
                }

                // Send ros command for notify param changed
                if (((newValue !== '')) && (
                    (((item['type'] === "Integer") || (item['type'] === "Double")) && (Number(newValue) <= Number(item['max'])) && (Number(newValue) >= Number(item['min'])))
                    || ((item['type'] !== "Integer") && (item['type'] !== "Double")))) {

                    if (item['type'] === "Double")
                        newValue = "" + parseFloat(newValue)

                    var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, filter: executionFilterSelected, parameter: item['paramName'], value: newValue });
                    changeParameterServiceCall(request)

                }
            }
        })
    }


    function SettingsList(props: any) {

        const { index, style } = props;

        let content: any = []

        parameterList?.map((item, index) => {

            if (item['type'] === "Boolean") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <CommonVisionUIStyle.ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <FormControlLabel
                                control={<Checkbox name={item['paramName']} color="primary" checked={item['value'] == '1'} onChange={(event: any) => handleChangeParamValue(event, index, "value")} />}
                                label={item['paramName']}
                            />
                        </CommonVisionUIStyle.ListItemStyle>
                    </Tooltip>
                )
            }

            if (item['type'] === "Integer" || item['type'] === "Double") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <CommonVisionUIStyle.ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <TextField type={item['type'] === "Integer" ? 'number' : "float"} autoFocus={currentParamFocus == index && currentSubParamFocus == 1} value={item['value']} onChange={(event: any) => handleChangeParamValue(event, index, "value")} id={"paramvalue_id" + index} label="Value" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['min']} onChange={(event: any) => handleChangeParamValue(event, index, "min")} id={"parammin_id" + index} label="Min" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['max']} onChange={(event: any) => handleChangeParamValue(event, index, "max")} id={"parammax_id" + index} label="Max" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                        </CommonVisionUIStyle.ListItemStyle>
                    </Tooltip>
                )

            }

            if (item['type'] === "String") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <CommonVisionUIStyle.ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <TextField autoFocus={currentParamFocus == index} value={item['value']} onChange={(event: any) => handleChangeParamValue(event, index, "value")} id={"paramvalue_id" + index} label="Value" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "300px" }} />
                        </CommonVisionUIStyle.ListItemStyle>
                    </Tooltip>
                )
            }
        })

        return (<div>{content}</div>);
    }

    return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="execution-outlined-label">Execution</InputLabel>
                <Select
                    labelId="execution-outlined-label"
                    fullWidth={true}
                    id="sexecution-outlined"
                    onChange={handleChangeExecution}
                    label="Execution"
                    value={executionSelected ? executionSelected : "None"}>
                    <MenuItem id={"executionNone"} value={"None"}>None</MenuItem>
                    {executionList.map((value, index) => {
                        return <MenuItem id={"execution" + value['value']} value={value['value']}>{value['value']}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CachedIcon />}
                onClick={handleRefreshExecutionList}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleClickDeleteExecution}
            ></Button>
            <br></br>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="selectFilter-outlined-label">Filter</InputLabel>
                <Select
                    labelId="selectFilter-outlined-label"
                    fullWidth={true}
                    id="selectFilter-outlined"
                    onChange={handleChangeFilter}
                    label="Filter"
                    value={filterSelected ? filterSelected : "None"}>
                    <MenuItem id={"selectFilterNone"} value={"None"}>None</MenuItem>
                    {filterList.map((value, index) => {
                        return <MenuItem id={"selectFilter" + value['value']} value={value['value']}>{value['value']}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CachedIcon />}
                onClick={handleRefreshFilterList}
            ></Button>
            <br></br>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleClickAdd}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ArrowDropUpIcon />}
                onClick={handleClickUp}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ArrowDropDownIcon />}
                onClick={handleClickDown}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleClickDelete}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleClickSave}
            ></Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<RestoreIcon />}
                onClick={handleClickRestore}
            ></Button><br></br>
            <ListFilterStyle><FilterList className={classes.root} /></ListFilterStyle><br></br>
            <ListSettingsStyle><SettingsList className={classes.root} /></ListSettingsStyle>
        </div>
    );
};

export default VisionUIFilterModule;

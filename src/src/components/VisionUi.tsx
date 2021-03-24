import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GeneralContext } from "../context/generalContext";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

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

const ButtonStyle = withStyles({
    contained: {
        backgroundColor: 'lightgrey',
        border: '2px solid rgba(0, 0, 0, 1.0)'
    },

})(Button);

function TabPanel(props: any) {

    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`visionUI-tabpanel-${index}`}
            aria-labelledby={`visionUI-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const VisionUIModule = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    ////////////////////////////////
    // EXECUTION TAB
    ////////////////////////////////

    const [name, setName] = useState('');
    const [filterChainSelected, setFilterChainSelected] = useState('');
    const [filterChainList, setfilterChainList] = useState<[]>([]);
    const [mediaSelected, setMediaSelected] = useState('');
    const [mediaList, setMediaList] = useState<[]>([]);
    const [file, setFile] = useState('');
    const [topicName, setTopicName] = useState('');

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

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

    const handleFileOpen = (value: any) => {

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

    const handleCreate = (value: any) => {

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
                var request = new ROSLIB.ServiceRequest({ node_name: name, filterchain_name: filterChainSelected, media_name: media, cmd: 1 });
                executeCmdServiceCall(request)
            }
        }
    }

    const handleFilterChainNameChange = (e: any) => {
        setFilterChainName(e.target.value)
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

    ////////////////////////////////
    // FILTER CHAIN TAB
    ////////////////////////////////

    const ListFilterChainStyle = withStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 350,
        },
    })(List);

    const [filterChainName, setFilterChainName] = useState('');
    const [filterChainSelectedTab, setFilterChainSelectedTab] = React.useState('');

    const addFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const addFilterChainServiceCall = useROSService<any>(addFilterChainServiceCallback, "/proc_image_processing/manage_filterchain", "sonia_common/ManageFilterchain");

    const handleAddFilterChain = (value: any) => {

        if (filterChainName != '') {

            var request = new ROSLIB.ServiceRequest({ filterchain: filterChainName, cmd: 1 });
            addFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = new ROSLIB.ServiceRequest({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    const handSelectedFilterChain = (event: any, value: any) => {
        setFilterChainSelectedTab(value);
    };

    const copyFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const copyFilterChainServiceCall = useROSService<any>(copyFilterChainServiceCallback, "/proc_image_processing/copy_filterchain", "sonia_common/CopyFilterchain");

    const handleCloneFilterChain = (value: any) => {

        if (filterChainSelectedTab !== '' && filterChainName !== '') {

            var request = new ROSLIB.ServiceRequest({ filterchain_to_copy: filterChainSelectedTab, filterchain_new_name: 'filterchain/' + filterChainName });
            copyFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = new ROSLIB.ServiceRequest({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    const deleteFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const deleteFilterChainServiceCall = useROSService<any>(deleteFilterChainServiceCallback, "/proc_image_processing/manage_filterchain", "sonia_common/ManageFilterchain");

    const handleDeleteFilterChain = (value: any) => {

        if (filterChainSelectedTab !== '') {

            var request = new ROSLIB.ServiceRequest({ filterchain: 'filterchain/' + filterChainSelectedTab, cmd: 2 });
            deleteFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = new ROSLIB.ServiceRequest({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    function FilterChainList(props: any) {
        const { index, style } = props;
        return (
            <div>
                {filterChainList.map((item) => (
                    <ListItemStyle button style={style} key={"filterChain" + item['id']} selected={filterChainSelectedTab === item['value']} autoFocus={filterChainSelectedTab === item['value']}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedFilterChain(event, item['value'])} />
                    </ListItemStyle>
                ))}
            </div>
        );
    }



    ////////////////////////////////
    // FILTERS TAB
    ////////////////////////////////

    const ListItemStyle = withStyles({
        root: {
            "&.Mui-selected": {
                backgroundColor: "cornflowerblue"
            },
            "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
                backgroundColor: "cornflowerblue"
            },
        },
    })(ListItem);

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

    }, [executionSelected,executionList]);

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

    const handleRefreshFilterList = (x: any) => {

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

    const handleClickAdd = (value: any) => {

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

    const handleClickDelete = (value: any) => {

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

    const handleClickSave = (value: any) => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '') {

            var request = new ROSLIB.ServiceRequest({ exec_name: executionSelected, filterchain: executionFilterChain, cmd: 1 });
            saveFilterServiceCall(request)
        }

    }

    const handleClickRestore = (value: any) => {

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


    const handleClickUp = (value: any) => {

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

    const handleClickDown = (value: any) => {

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
                    <ListItemStyle button style={style} key={"filterList" + item['id']} selected={executionFilterSelected === item['value']} autoFocus={executionFilterSelected === item['value']}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedExecutionFilterChain(event, item['value'])} />
                    </ListItemStyle>
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
                        <ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <FormControlLabel
                                control={<Checkbox name={item['paramName']} color="primary" checked={item['value'] == '1'} onChange={(event: any) => handleChangeParamValue(event, index, "value")} />}
                                label={item['paramName']}
                            />
                        </ListItemStyle>
                    </Tooltip>
                )
            }

            if (item['type'] === "Integer" || item['type'] === "Double") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <TextField type={item['type'] === "Integer" ? 'number' : "float"} autoFocus={currentParamFocus == index && currentSubParamFocus == 1} value={item['value']} onChange={(event: any) => handleChangeParamValue(event, index, "value")} id={"paramvalue_id" + index} label="Value" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['min']} onChange={(event: any) => handleChangeParamValue(event, index, "min")} id={"parammin_id" + index} label="Min" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['max']} onChange={(event: any) => handleChangeParamValue(event, index, "max")} id={"parammax_id" + index} label="Max" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                        </ListItemStyle>
                    </Tooltip>
                )

            }

            if (item['type'] === "String") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <ListItemStyle button style={style} key={"paramList" + item['paramName']}>
                            <TextField autoFocus={currentParamFocus == index} value={item['value']} onChange={(event: any) => handleChangeParamValue(event, index, "value")} id={"paramvalue_id" + index} label="Value" variant="outlined" style={{ padding: '10px 10px', float: "left", width: "300px" }} />
                        </ListItemStyle>
                    </Tooltip>
                )
            }
        })

        return (<div>{content}</div>);
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>VISION UI</h1>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs value={value} onChange={handleChange} aria-label="visionUI tabs" variant="scrollable" scrollButtons="auto">
                                <Tab label="Execution" {...a11yProps(0)} />
                                <Tab label="Filter Chain" {...a11yProps(1)} />
                                <Tab label="Filters" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <div>
                                <TextField value={name} onChange={handleNameChange} id="visionUi_name_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel id="selectFilterChain-outlined-label">Filterchain</InputLabel>
                                    <Select
                                        labelId="selectFilterChain-outlined-label"
                                        fullWidth={true}
                                        id="selectFilterChain-outlined"
                                        onChange={handleChangeFilterChain}
                                        label="Filter chain"
                                        value={filterChainSelected ? filterChainSelected : "None"}>
                                        <MenuItem id={"selectFilterChainNone"} value={"None"}>None</MenuItem>
                                        {filterChainList.map((value) => {
                                            return <MenuItem id={"selectFilterChain" + value["value"]} value={value["value"]}>{value["value"]}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CachedIcon />}
                                    onClick={handleRefreshFilterChainList}
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
                                        value={mediaSelected ? mediaSelected : "None"}>
                                        <MenuItem id={"selectMediaNone"} value={"None"}>None</MenuItem>
                                        {mediaList.map((value) => {
                                            return <MenuItem id={"selectMedia" + value["value"]} value={value["value"]}>{value["value"]}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CachedIcon />}
                                    onClick={handleRefreshMediaList}
                                ></Button>
                                <br></br>
                                <div style={{ width: '75%', float: 'left' }} >
                                    <TextField disabled={true} value={file} id="file_id" label="File" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px' }} />
                                </div>
                                <input type='file' id='file' ref={inputFile} onChange={fileDialogClicked} style={{ display: 'none' }} />
                                <div style={{ float: 'right' }}><ButtonStyle variant='contained' style={{ fontSize: '20px', marginTop: '22px' }} onClick={handleFileOpen}>...</ButtonStyle></div>
                                <TextField value={topicName} onChange={handleTopicNameChange} id="visionUi_topicname_id" label="Topic Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px' }} />
                                <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'right' }} onClick={handleCreate}>create</ButtonStyle>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TextField value={filterChainName} onChange={handleFilterChainNameChange} id="visionUi_filterChainName_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleAddFilterChain}>Add</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleCloneFilterChain}>Clone</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleDeleteFilterChain}>Delete</ButtonStyle><br></br>
                            <ListFilterChainStyle><FilterChainList className={classes.root} /></ListFilterChainStyle>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
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
                        </TabPanel>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default VisionUIModule;

import { useState, useCallback, useRef, useEffect } from 'react';

import TextField from './common/textfield/Textfield';
import Select from './common/select/Select';
import FormControl from './common/Form/FormControl';
import InputLabel from './common/Input/InputLabel';
import Button from './common/button/Button'
import ListItemText from './common/List/ListItemText';
import List from './common/List/List';
import ListItem from './common/List/ListItem';
import Checkbox from './common/Checkbox/Checkbox';
import FormControlLabel from './common/Form/FormControlLabel'
import Tooltip  from './common/Tooltip/Tooltip';

import { MAddCircleOutlineIcon as AddCircleOutlineIcon } from './common/Icons/Icon';
import { MArrowDropUpIcon as ArrowDropUpIcon } from './common/Icons/Icon';
import { MArrowDropDownIcon as ArrowDropDownIcon } from './common/Icons/Icon';
import { MDeleteIcon as DeleteIcon } from './common/Icons/Icon';
import { MSaveIcon as SaveIcon } from './common/Icons/Icon';
import { MRestoreIcon as RestoreIcon } from './common/Icons/Icon';
import { MCachedIcon as CachedIcon } from './common/Icons/Icon';

import { useROSService, ServiceRequestFactory } from '../hooks/useROSService'

const VisionUIFilterModule = () => {

    const [executionList, setExecutionList] = useState<[]>([]);
    const [executionSelected, setExecutionSelected] = useState('');
    const [executionMedia, setExecutionMedia] = useState('');
    const executionSelectedRef = useRef('');
    const [executionFilterChain, setExecutionFilterChain] = useState('');
    const [filterSelected, setFilterSelected] = useState(null);
    const [filterList, setFilterList] = useState<[]>([]);
    //const [filterListItems, setFilterListItems] = useState<[]>([]);
    const [filterListItems, setFilterListItems] = useState([{ value: "v1", id: 0 }, { value: "v2", id: 1 }, { value: "v2", id: 2 }, { value: "v2", id: 3 }, { value: "v2", id: 4 }, { value: "v2", id: 5 }, { value: "v2", id: 6 }, { value: "v2", id: 7 }]);
    const [executionFilterSelected, setExecutionFilterSelected] = useState('');
    //const [parameterList, setParameterList] = useState<{ paramName: string, type: string, value: string, min: string, max: string, desc: string }[]>([]);
    const [parameterList, setParameterList] = useState<{ paramName: string, type: string, value: string, min: string, max: string, desc: string }[]>(
        [{ paramName: "string", type: "Boolean", value: "0", min: "0", max: "1", desc: "bols" },
        { paramName: "string", type: "Integer", value: "0", min: "0", max: "1", desc: "bols" },
        { paramName: "string", type: "Double", value: "0", min: "0", max: "1", desc: "bols" },
        { paramName: "string", type: "String", value: "0", min: "0", max: "1", desc: "bols" },
        ]);
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

        filterListItems.forEach((item, i) => {
            if (i === executionFilterAutoSelect) {
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
        var request = ServiceRequestFactory({ exec_name: executionSelectedRef.current, filterchain: executionFilterChain });
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

        if (executionSelected === "None") {
            setFilterListItems([])
            setParameterList([])
        }

    }, [executionSelected, executionList]);

    const handleChangeExecution = (x: any) => {

        setExecutionSelected(x.target.value)
        executionSelectedRef.current = x.target.value

        //Get media from execution
        var request = ServiceRequestFactory({ exec_name: x.target.value });
        getMediaFromExecutionServiceCall(request)

        // Get filter chain from execution
        var request2 = ServiceRequestFactory({ exec_name: x.target.value });
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

        var request = ServiceRequestFactory({ cmd: 1 });
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

            var request = ServiceRequestFactory({ node_name: executionSelected, filterchain_name: executionFilterChain, media_name: executionMedia, cmd: 2 });
            deleteExecutionServiceCall(request)

            setExecutionMedia('')
            setExecutionFilterChain('')
            setExecutionSelected('')

            // Refresh execution list after delete
            setTimeout(() => {
                var request = ServiceRequestFactory({ cmd: 1 });
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

        var request = ServiceRequestFactory({ cmd: 4 });
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

            var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter: filterSelected, cmd: 1 });
            addDeleteFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain });
                getExecutionFilterChainListServiceCall(request2)
            }, 500)

        }

    }

    const handleClickDelete = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && executionFilterSelected !== '') {

            var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter: executionFilterSelected, cmd: 2 });
            addDeleteFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain });
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

            var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, cmd: 1 });
            saveFilterServiceCall(request)
        }

    }

    const handleClickRestore = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '') {

            var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, cmd: 2 });
            saveFilterServiceCall(request)

            setTimeout(() => {
                //Update filter list
                var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain });
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

            filterListItems.forEach((item, i) => {
                if (item['value'] === executionFilterSelected) {
                    index = item['id']
                }
            })

            if (index !== -1) {

                setExecutionFilterAutoSelect(index - 1)

                var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter_index: index, cmd: 1 });
                orderFilterServiceCall(request)

                setTimeout(() => {
                    //Update filter list
                    var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain });
                    getExecutionFilterChainListServiceCall(request2)
                }, 500)

            }

        }

    }

    const handleClickDown = () => {

        setCurrentParamFocus(-1)

        if (executionSelected !== '' && executionFilterChain !== '' && executionFilterSelected !== '') {

            var index = -1

            filterListItems.forEach((item, i) => {
                if (item['value'] === executionFilterSelected)
                    index = item['id']
            })

            if (index !== -1) {

                setExecutionFilterAutoSelect(index + 1)

                var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter_index: index, cmd: 2 });
                orderFilterServiceCall(request)

                setTimeout(() => {
                    //Update filter list
                    var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain });
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
        var request = ServiceRequestFactory({ execution: executionSelected, filterchain: executionFilterChain, filter: value });
        filterChainFilterObserverServiceCall(request)

        setTimeout(() => {
            // and get parameters for this filter
            var request2 = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter: value });
            filterChainFilterAllParamServiceCall(request2)
        }, 500)

    };

    function FilterList(props: any) {

        const { index, style } = props;

        return (
            <div>
                {filterListItems.map((item) => (
                    <ListItem style={style} key={"filterList" + item['id']} selected={executionFilterSelected === item['value']} autoFocus={executionFilterSelected === item['value']}>
                        <ListItemText primary={item['value']} handler={(event: any) => handSelectedExecutionFilterChain(event, item['value'])} />
                    </ListItem>
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

        parameterList?.forEach((item, i) => {

            if (i === index) {

                if (item['type'] === "Boolean") {
                    let temporaryarray = parameterList.slice();
                    if (item['value'] === "0") {
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
                    if (arg === "value") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["value"] = newValue;
                        setCurrentSubParamFocus(1)
                    }
                    if (arg === "min") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["min"] = newValue;
                        setCurrentSubParamFocus(2)
                    }
                    if (arg === "max") {
                        if ((checkSyntaxInteger(newValue) && item['type'] === "Integer") || (checkSyntaxDouble(newValue) && item['type'] === "Double"))
                            temporaryarray[index]["max"] = newValue;
                        setCurrentSubParamFocus(3)
                    }
                    setParameterList(temporaryarray);
                }
                if (item['type'] === "String") {
                    let temporaryarray = parameterList.slice();
                    if (arg === "value") {
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

                    var request = ServiceRequestFactory({ exec_name: executionSelected, filterchain: executionFilterChain, filter: executionFilterSelected, parameter: item['paramName'], value: newValue });
                    changeParameterServiceCall(request)

                }
            }
        })
    }


    function SettingsList(props: any) {

        const { index, style } = props;

        let content: any = []

        parameterList?.forEach((item, index) => {

            if (item['type'] === "Boolean") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <ListItem style={style} key={"paramList" + item['paramName']}>
                            <FormControlLabel
                                control={<Checkbox name={item['paramName']} color="primary" checked={item['value'] === '1'} handler={(event: any) => handleChangeParamValue(event, index, "value")} />}
                                label={item['paramName']}
                            />
                        </ListItem>
                    </Tooltip>
                )
            }

            if (item['type'] === "Integer" || item['type'] === "Double") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <ListItem style={style} key={"paramList" + item['paramName']}>
                            <TextField type={item['type'] === "Integer" ? 'number' : "float"} autoFocus={currentParamFocus === index && currentSubParamFocus === 1} value={item['value']} handlerChange={(event: any) => handleChangeParamValue(event, index, "value")} handlerKeyDown={() => { }} id={"paramvalue_id" + index} label="Value" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['min']} handlerChange={(event: any) => handleChangeParamValue(event, index, "min")} handlerKeyDown={() => { }} id={"parammin_id" + index} label="Min" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                            <TextField disabled={true} value={item['max']} handlerChange={(event: any) => handleChangeParamValue(event, index, "max")} handlerKeyDown={() => { }} id={"parammax_id" + index} label="Max" style={{ padding: '10px 10px', float: "left", width: "120px" }} />
                        </ListItem>
                    </Tooltip>
                )

            }

            if (item['type'] === "String") {

                content.push(
                    <Tooltip title={item['desc']}>
                        <ListItem style={style} key={"paramList" + item['paramName']}>
                            <TextField autoFocus={currentParamFocus === index} value={item['value']} handlerChange={(event: any) => handleChangeParamValue(event, index, "value")} handlerKeyDown={() => { }} id={"paramvalue_id" + index} label="Value" style={{ padding: '10px 10px', float: "left", width: "300px" }} />
                        </ListItem>
                    </Tooltip>
                )
            }
        })

        return (<div>{content}</div>);
    }

    return (
        <div>
            <FormControl>
                <InputLabel id="execution-outlined-label">Execution</InputLabel>
                <Select
                    labelId="execution-outlined-label"
                    fullWidth={true}
                    id="sexecution-outlined"
                    handlerChange={handleChangeExecution}
                    label="Execution"
                    value={executionSelected ? executionSelected : "None"}
                    style={{ backgroundColor: 'white' }}
                    listValue={executionList}
                >
                </Select>
            </FormControl>
            <Button
                label={<CachedIcon />}
                handler={handleRefreshExecutionList}
                isIcon={true}
            ></Button>
            <Button
                label={<DeleteIcon />}
                handler={handleClickDeleteExecution}
                isIcon={true}
            ></Button>
            <br></br>
            <FormControl>
                <InputLabel id="selectFilter-outlined-label">Filter</InputLabel>
                <Select
                    labelId="selectFilter-outlined-label"
                    fullWidth={true}
                    id="selectFilter-outlined"
                    handlerChange={handleChangeFilter}
                    label="Filter"
                    value={filterSelected ? filterSelected : "None"}
                    style={{ backgroundColor: 'white' }}
                    listValue={filterList}
                >
                </Select>
            </FormControl>
            <Button
                label={<CachedIcon />}
                handler={handleRefreshFilterList}
                isIcon={true}
            ></Button>
            <br></br>
            <Button
                label={<AddCircleOutlineIcon />}
                handler={handleClickAdd}
                isIcon={true}
            ></Button>
            <Button
                label={<ArrowDropUpIcon />}
                handler={handleClickUp}
                isIcon={true}
            ></Button>
            <Button
                label={<ArrowDropDownIcon />}
                handler={handleClickDown}
                isIcon={true}
            ></Button>
            <Button
                label={<DeleteIcon />}
                handler={handleClickDelete}
                isIcon={true}
            ></Button>
            <Button
                label={<SaveIcon />}
                handler={handleClickSave}
                isIcon={true}
            ></Button>
            <Button
                label={<RestoreIcon />}
                handler={handleClickRestore}
                isIcon={true}
            />
            <List maxHeight={300}><FilterList /></List><br></br>
            <List maxHeight={300}><SettingsList /></List>
        </div>
    );
};

export default VisionUIFilterModule;

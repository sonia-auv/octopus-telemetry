import React, { useState, useCallback, useRef } from 'react';
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

    const handleCmdKeyDown = (e: any) => {

        if (e.key === 'Enter') {
            console.log(e)
        }
    }

    const handleChangeFilterChain = (x: any) => {
        
        setFilterChainSelected(x.target.value)
    }

    const handleChangeMedia = (x: any) => {
        setMediaSelected(x.target.value)
    }

    function fileDialogClicked(event: any)  {
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

        if (name !== '') 
        {
            //Topic mode
            var media = topicName
  
            // Video mode
            if (media === '' && file !== '')
            {
                media = file
                // TODO: check formatting of the service request
                var request = new ROSLIB.ServiceRequest({ camera_name: media, start:1 });
                startMediaCmdServiceCall(request)
                media = '/provider_vision' + media.replace('.','')

            }
            // Normal mode
            if (media === '') 
            {
                media = mediaSelected
            }

            if (media !== '' && filterChainSelected !== '') {
                var request = new ROSLIB.ServiceRequest({ node_name: name, filterchain_name: filterChainSelected, media_name: media, start: 1 });
                executeCmdServiceCall(request)
                console.log(name, filterChainSelected, media)
            }
        }
    }

    const handleFilterChainNameChange = (e: any) => {
        setFilterChainName(e.target.value)
    }

    const getFilterChainlistServiceCallback = useCallback(
        (x: any) => {

            // TODO: not tested with ros, , we are supposed to receive a string with ; separator inside x
            var receivedList = "simple_body_baby;deep_front;simple_test;simple_bin_handle"

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push( { value: v } )
            });

            // Sort values
            tab.sort((a:any, b:any) => a.value !== b.value  ? a.value  < b.value  ? -1 : 1 : 0);

            setfilterChainList(tab);

        }, []
    )

    const getFilterChainlistServiceCall = useROSService<any>(getFilterChainlistServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList")

    const handleRefreshFilterChainList = () => {
        var request = new ROSLIB.ServiceRequest(3);
        getFilterChainlistServiceCall(request)
    }

    const getMedialistServiceCallback = useCallback(
        (x: any) => {

            // TODO: not tested with ros, we are supposed to receive a string with ; separator inside x
            var receivedList = "/proc_image_processing/sonar_map;/provider_vision/Front_GigE"

            var tab: any = []
            receivedList.split(';').forEach((v: String, index: number) => {
                tab.push( { value: v } )
            });

            // Sort values
            tab.sort((a:any, b:any) => a.value !== b.value  ? a.value  < b.value  ? -1 : 1 : 0);

            setMediaList(tab);

        }, []
    )

    const getMedialistServiceCall = useROSService<any>(getMedialistServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList")

    const handleRefreshMediaList = () => {
        var request = new ROSLIB.ServiceRequest(2);
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
            maxHeight: 300,
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
            // TODO: formatting of ros message to check
            var request = new ROSLIB.ServiceRequest({ filterchain: filterChainName, add: 1 });
            addFilterChainServiceCall(request)

            //Refresh filter chain list
            var request2 = new ROSLIB.ServiceRequest(3);
            getFilterChainlistServiceCall(request2)
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

            // TODO: formatting of ros message to check
            var request = new ROSLIB.ServiceRequest({ filterchain_to_copy: filterChainSelectedTab, filterchain_new_name: 'filterchain/' + filterChainName });
            copyFilterChainServiceCall(request)

            //Refresh filter chain list
            var request2 = new ROSLIB.ServiceRequest(3);
            getFilterChainlistServiceCall(request2)
        }
    }

    const deleteFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const deleteFilterChainServiceCall = useROSService<any>(deleteFilterChainServiceCallback, "/proc_image_processing/manage_filterchain", "sonia_common/ManageFilterchain");

    const handleDeleteFilterChain = (value: any) => {

        if (filterChainSelectedTab !== '') {

            // TODO: formatting of ros message to check
            var request = new ROSLIB.ServiceRequest({ filterchain: 'filterchain/' + filterChainSelectedTab, delete: 2 });
            deleteFilterChainServiceCall(request)

            //Refresh filter chain list
            var request2 = new ROSLIB.ServiceRequest(3);
            getFilterChainlistServiceCall(request2)

        }
    }

    function FilterChainList(props: any) 
    {
        const { index, style } = props;
        return (
            <div>
                {filterChainList.map((item) => (
                    <ListItem button style={style} key={item} selected={filterChainSelectedTab === item['value']}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedFilterChain(event, item['value'])} />
                    </ListItem>
                ))}
            </div>
        );
    }



    ////////////////////////////////
    // FILTERS TAB
    ////////////////////////////////

    const ListFilterStyle = withStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 150,
        },
    })(List);

    const ListSettingsStyle = withStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 150,
        },
    })(List);

    const [filterSelected, setFilterSelected] = useState(null);
    const [filterList, setFilterList] = useState(["filter1", "filter2"]);
    const [filterListItems, setFilterListItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const handleChangeFilter = (x: any) => {
        setFilterSelected(x.target.value)
    }

    const handleClickAdd = (value: any) => {

    }

    const handleClickUp = (value: any) => {

    }

    const handleClickDown = (value: any) => {

    }

    const handleClickDelete = (value: any) => {

    }

    const handleClickSave = (value: any) => {

    }

    const handleClickRestore = (value: any) => {

    }

    function FilterList(props: any) {

        const { index, style } = props;

        return (
            <div>
                {filterListItems.map((item) => (
                    <ListItem button style={style} key={item}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </div>
        );
    }

    function SettingsList(props: any) {

        const { index, style } = props;

        return (
            <div>
                <ListItem button style={style} key="1">
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Enable" />
                </ListItem>

                <ListItem button style={style} key="2">
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Debug contour" />
                </ListItem>

                <ListItem button style={style} key="3">
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Look for elipse" />
                </ListItem>

                <ListItem button style={style} key="4">
                        <TextField label="Min_area" variant="outlined" fullWidth={true}/>
                </ListItem>

                <ListItem button style={style} key="5">
                        <TextField label="Max_area" variant="outlined" fullWidth={true}/>
                </ListItem>
            </div>
        );
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
                                <TextField value={name} onChange={handleNameChange} onKeyDown={handleCmdKeyDown} id="visionUi_name_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel id="selectFilterChain-outlined-label">Filterchain</InputLabel>
                                    <Select
                                        labelId="selectFilterChain-outlined-label"
                                        fullWidth={true}
                                        id="selectFilterChain-outlined"
                                        onChange={handleChangeFilterChain}
                                        label="Filter chain"
                                        value={filterChainSelected ? filterChainSelected : "None"}>
                                        <MenuItem value={"None"}>None</MenuItem>
                                        {filterChainList.map((value) => {
                                            return <MenuItem value={value["value"]}>{value["value"]}</MenuItem>
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
                                        <MenuItem value={"None"}>None</MenuItem>
                                        {mediaList.map((value) => {
                                            return <MenuItem value={value["value"]}>{value["value"]}</MenuItem>
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
                                <input type='file' id='file' ref={inputFile} onChange={fileDialogClicked} style={{display: 'none'}}/>
                                <div style={{ float: 'right' }}><ButtonStyle variant='contained' style={{ fontSize: '20px', marginTop: '22px' }} onClick={handleFileOpen}>...</ButtonStyle></div>
                                <TextField value={topicName} onChange={handleTopicNameChange} onKeyDown={handleCmdKeyDown} id="visionUi_topicname_id" label="Topic Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px' }} />
                                <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'right' }} onClick={handleCreate}>create</ButtonStyle>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TextField value={filterChainName} onChange={handleFilterChainNameChange} onKeyDown={handleCmdKeyDown} id="visionUi_filterChainName_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleAddFilterChain}>Add</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleCloneFilterChain}>Clone</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleDeleteFilterChain}>Delete</ButtonStyle><br></br>
                            <ListFilterChainStyle><FilterChainList className={classes.root}/></ListFilterChainStyle>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="selectFilter-outlined-label">Filter</InputLabel>
                                <Select
                                    labelId="selectFilter-outlined-label"
                                    fullWidth={true}
                                    id="selectFilter-outlined"
                                    onChange={handleChangeFilter}
                                    label="Filter"
                                    value={filterSelected ? filterSelected : "None"}>
                                    <MenuItem value={"None"}>None</MenuItem>
                                    {filterList.map((value, index) => {
                                        return <MenuItem value={value}>{value}</MenuItem>
                                    })}
                                </Select>
                            </FormControl><br></br>
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

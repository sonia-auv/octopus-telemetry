import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GeneralContext } from "../context/generalContext";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ImageViewer from "../components/ImageViewer";
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
    const [filterChainSelected, setFilterChainSelected] = useState(null);
    const [filterChainList, setfilterChainList] = useState(["filter1", "filter2"]);
    const [mediaSelected, setMediaSelected] = useState(null);
    const [mediaList, setMediaList] = useState(["media1", "media2"]);
    const [file, setFile] = useState('No file');
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

    const handleFileOpen = (value: any) => {
        setFile('my file path....')
    }

    const handleTopicNameChange = (e: any) => {
        setTopicName(e.target.value)
    }

    const handleCreate = (value: any) => {

    }

    const handleFilterChainNameChange = (e: any) => {
        setFilterChainName(e.target.value)
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
    const [filterChainListItems, setFilterChainListItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const handleAddFilterChain = (value: any) => {

    }

    const handleCloneFilterChain = (value: any) => {

    }

    const handleDeleteFilterChain = (value: any) => {

    }

    function FilterChainList(props: any) {

        const { index, style } = props;

        return (
            <div>
                {filterChainListItems.map((item) => (
                    <ListItem button style={style} key={item}>
                        <ListItemText primary={item} />
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
                                <Tab label="Result" {...a11yProps(0)} />
                                <Tab label="Execution" {...a11yProps(1)} />
                                <Tab label="Filter Chain" {...a11yProps(2)} />
                                <Tab label="Filters" {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <ImageViewer />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
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
                                        {filterChainList.map((value, index) => {
                                            return <MenuItem value={value}>{value}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl><br></br>
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
                                        {mediaList.map((value, index) => {
                                            return <MenuItem value={value}>{value}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl><br></br>
                                <div style={{ width: '75%', float: 'left' }} >
                                    <TextField disabled={true} value={file} id="file_id" label="File" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px' }} />
                                </div>
                                <div style={{ float: 'right' }}><ButtonStyle variant='contained' style={{ fontSize: '20px', marginTop: '22px' }} onClick={handleFileOpen}>...</ButtonStyle></div>
                                <TextField value={topicName} onChange={handleTopicNameChange} onKeyDown={handleCmdKeyDown} id="visionUi_topicname_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px' }} />
                                <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'right' }} onClick={handleCreate}>create</ButtonStyle>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TextField value={filterChainName} onChange={handleFilterChainNameChange} onKeyDown={handleCmdKeyDown} id="visionUi_filterChainName_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleAddFilterChain}>Add</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleCloneFilterChain}>Clone</ButtonStyle>
                            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleDeleteFilterChain}>Delete</ButtonStyle><br></br>
                            <ListFilterChainStyle><FilterChainList className={classes.root} /></ListFilterChainStyle>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
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

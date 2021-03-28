import { useState } from 'react';
import PropTypes from 'prop-types';
import { GeneralContext } from "../context/generalContext";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as CommonVisionUIStyle from './VisionUiCommon';
import VisionUIExecutionModule from './VisionUiExecution'
import VisionUIFilterChainModule from './VisionUiFilterChain'
import VisionUIFilterModule from './VisionUiFilter'

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

    const [value, setValue] = useState(0);
    const classes = CommonVisionUIStyle.useStyles();

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

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
                            <VisionUIExecutionModule />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <VisionUIFilterChainModule />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <VisionUIFilterModule />
                        </TabPanel>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default VisionUIModule;

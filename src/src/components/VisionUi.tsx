import { useState } from 'react';
import PropTypes from 'prop-types';
import { GeneralContext } from "../context/generalContext";

import AppBar from './common/AppBar/AppBar';
import Tabs from './common/Tabs/Tabs';
import Box from './common/Box/Box';
import Typography from './common/Typography/Typography';

import * as CommonVisionUIStyle from './VisionUiCommon';
import VisionUIExecutionModule from './VisionUiExecution'
import VisionUIFilterChainModule from './VisionUiFilterChain'
import VisionUIFilterModule from './VisionUiFilter'

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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

    const tabs = [
        { value: "Execution", index: 0 },
        { value: "Filter Chain", index: 1 },
        { value: "Filters", index: 2 }]

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>VISION UI</h1>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs value={value} handlerChange={handleChange} arialabel="visionUI tabs" listValue={tabs}></Tabs>
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

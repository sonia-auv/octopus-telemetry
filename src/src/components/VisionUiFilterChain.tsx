import React, { useState, useCallback } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";
import CachedIcon from '@material-ui/icons/Cached';
import * as CommonVisionUIStyle from './VisionUiCommon';

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

const VisionUIExecutionModule = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

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

    const [filterChainList, setfilterChainList] = useState<[]>([]);
    const [filterChainName, setFilterChainName] = useState('');
    const [filterChainSelectedTab, setFilterChainSelectedTab] = React.useState('');

    const addFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const handleRefreshFilterChainList = () => {
        var request = new ROSLIB.ServiceRequest({ cmd: 3 });
        getFilterChainlistServiceCall(request)
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

    const addFilterChainServiceCall = useROSService<any>(addFilterChainServiceCallback, "/proc_image_processing/manage_filterchain", "sonia_common/ManageFilterchain");
    const getFilterChainlistServiceCall = useROSService<any>(getFilterChainlistServiceCallback, "/proc_image_processing/get_information_list", "sonia_common/GetInformationList")

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

    const handleFilterChainNameChange = (e: any) => {
        setFilterChainName(e.target.value)
    }

    function FilterChainList(props: any) {
        const { index, style } = props;
        return (
            <div>
                {filterChainList.map((item) => (
                    <CommonVisionUIStyle.ListItemStyle button style={style} key={"filterChain" + item['id']} selected={filterChainSelectedTab === item['value']} autoFocus={filterChainSelectedTab === item['value']}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedFilterChain(event, item['value'])} />
                    </CommonVisionUIStyle.ListItemStyle>
                ))}
            </div>
        );
    }

    return (
        <div>
            <TextField value={filterChainName} onChange={handleFilterChainNameChange} id="visionUi_filterChainName_id" label="Name" variant="outlined" fullWidth={true} style={{ padding: '10px 10px' }} />
            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleAddFilterChain}>Add</ButtonStyle>
            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleCloneFilterChain}>Clone</ButtonStyle>
            <ButtonStyle variant='contained' style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} onClick={handleDeleteFilterChain}>Delete</ButtonStyle><br></br>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CachedIcon />}
                onClick={handleRefreshFilterChainList}
                style={{ marginTop: '-9px' }}
            ></Button>
            <ListFilterChainStyle><FilterChainList className={classes.root} /></ListFilterChainStyle>
        </div>

    );
};

export default VisionUIExecutionModule;

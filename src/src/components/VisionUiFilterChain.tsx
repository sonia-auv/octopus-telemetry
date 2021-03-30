import React, { useState, useCallback } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './common/button/Button'
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useROSService, ServiceRequestFactory } from '../hooks/useROSService'
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

const VisionUIExecutionModule = () => {

    const classes = useStyles();

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
        var request = ServiceRequestFactory({ cmd: 3 });
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

    const handleAddFilterChain = () => {

        if (filterChainName !== '') {

            var request = ServiceRequestFactory({ filterchain: filterChainName, cmd: 1 });
            addFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = ServiceRequestFactory({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    const handSelectedFilterChain = (event: any, value: any) => {
        setFieldHasFocus(false)
        setFilterChainSelectedTab(value);
    };

    const copyFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const copyFilterChainServiceCall = useROSService<any>(copyFilterChainServiceCallback, "/proc_image_processing/copy_filterchain", "sonia_common/CopyFilterchain");

    const handleCloneFilterChain = () => {

        if (filterChainSelectedTab !== '' && filterChainName !== '') {

            var request = ServiceRequestFactory({ filterchain_to_copy: filterChainSelectedTab, filterchain_new_name: 'filterchain/' + filterChainName });
            copyFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = ServiceRequestFactory({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    const deleteFilterChainServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const deleteFilterChainServiceCall = useROSService<any>(deleteFilterChainServiceCallback, "/proc_image_processing/manage_filterchain", "sonia_common/ManageFilterchain");

    const handleDeleteFilterChain = () => {

        if (filterChainSelectedTab !== '') {

            var request = ServiceRequestFactory({ filterchain: 'filterchain/' + filterChainSelectedTab, cmd: 2 });
            deleteFilterChainServiceCall(request)

            setTimeout(() => {
                //Refresh filter chain list
                var request2 = ServiceRequestFactory({ cmd: 3 });
                getFilterChainlistServiceCall(request2)
            }, 500)
        }
    }

    const [fieldHasFocus, setFieldHasFocus] = useState(true)

    const handleFilterChainNameChange = (e: any) => {
        setFilterChainName(e.target.value)
        setFieldHasFocus(true)

    }

    function FilterChainList(props: any) {
        const { index, style } = props;
        return (
            <div>
                {filterChainList.map((item) => (
                    <CommonVisionUIStyle.ListItemStyle button style={style} key={"filterChain" + item['id']} selected={filterChainSelectedTab === item['value']} autoFocus={filterChainSelectedTab === item['value'] && !fieldHasFocus}>
                        <ListItemText primary={item['value']} onClick={(event: any) => handSelectedFilterChain(event, item['value'])} />
                    </CommonVisionUIStyle.ListItemStyle>
                ))}
            </div>
        );
    }

    return (
        <div>
            <TextField value={filterChainName} autoFocus={fieldHasFocus} onChange={handleFilterChainNameChange} id="visionUi_filterChainName_id" label="Name"
                       variant="outlined" fullWidth={true} style={{ padding: '10px 10px', backgroundColor: 'white' }}/>
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleAddFilterChain} label="Add" />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleCloneFilterChain} label="Clone" />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleDeleteFilterChain} label="Delete" /><br></br>
            <Button
                className={classes.button}
                label={<CachedIcon />}
                handler={handleRefreshFilterChainList}
                style={{ marginTop: '14px' }}
            />
            <ListFilterChainStyle><FilterChainList className={classes.root} /></ListFilterChainStyle>
        </div>

    );
};

export default VisionUIExecutionModule;

import React, { useState, useCallback } from 'react';

import TextField from '../common/textfield/Textfield';
import Button from '../common/button/Button'
import ListItemText from '../common/List/ListItemText';
import ListItem from '../common/List/ListItem';
import List from '../common/List/List';
import { MCachedIcon as CachedIcon } from '../common/Icons/Icon';

import { useROSService, ServiceRequestFactory } from '../../hooks/useROSService'

const VisionUIExecutionModule = () => {

    ////////////////////////////////
    // FILTER CHAIN TAB
    ////////////////////////////////

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
                tab.push({ value: v, id: index })
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
                    <ListItem style={style} key={"filterChain" + item['id']} selected={filterChainSelectedTab === item['value']} autoFocus={filterChainSelectedTab === item['value'] && !fieldHasFocus}>
                        <ListItemText primary={item['value']} handler={(event: any) => handSelectedFilterChain(event, item['value'])} />
                    </ListItem>
                ))}
            </div>
        );
    }

    return (
        <div>
            <TextField value={filterChainName} autoFocus={fieldHasFocus} handlerChange={handleFilterChainNameChange} handlerKeyDown={() => { }} testId="visionUi_filterChainName_id" label="Name"
                fullWidth={true} style={{ padding: '10px 10px', backgroundColor: 'white' }} />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleAddFilterChain} label="Add" />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleCloneFilterChain} label="Clone" />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'left', marginLeft: '10px' }} handler={handleDeleteFilterChain} label="Delete" /><br></br>
            <Button
                label={<CachedIcon />}
                handler={handleRefreshFilterChainList}
                style={{ marginTop: '14px' }}
                isIcon={true}
            />
            <List maxHeight={350}><FilterChainList /></List>
        </div>

    );
};

export default VisionUIExecutionModule;

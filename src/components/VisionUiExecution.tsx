import { useState, useCallback, useRef } from 'react';

import TextField from './common/textfield/Textfield';
import Select from './common/select/Select';
import FormControl from './common/Form/FormControl';
import InputLabel from './common/Input/InputLabel';
import Button from './common/button/Button'
import { MCachedIcon as CachedIcon } from './common/Icons/Icon';

import { useROSService, ServiceRequestFactory } from '../hooks/useROSService'

const VisionUIExecutionTabModule = () => {

    const [name, setName] = useState('');
    const [filterChainList, setfilterChainList] = useState<[]>([]);
    const [filterChainSelected, setFilterChainSelected] = useState('');
    const [mediaSelected, setMediaSelected] = useState('');
    const [mediaList, setMediaList] = useState<[]>([]);
    const [file, setFile] = useState('');
    const [topicName, setTopicName] = useState('');

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

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

    const handleFileOpen = () => {

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

    const handleCreate = () => {

        if (name !== '') {

            //Topic mode
            var media = topicName

            // Video mode
            if (media === '' && file !== '') {
                media = file

                var request = ServiceRequestFactory({ camera_name: media, action: 1 });
                startMediaCmdServiceCall(request)
                media = '/provider_vision' + media.replace('.', '')

            }
            // Normal mode
            if (media === '') {
                media = mediaSelected
            }

            if (media !== '' && filterChainSelected !== '') {
                var request2 = ServiceRequestFactory({ node_name: name, filterchain_name: filterChainSelected, media_name: media, cmd: 1 });
                executeCmdServiceCall(request2)
            }
        }
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
        var request = ServiceRequestFactory({ cmd: 3 });
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
        var request = ServiceRequestFactory({ cmd: 2 });
        getMedialistServiceCall(request)
    }

    return (
        <div>
            <TextField value={name} handlerChange={handleNameChange} handlerKeyDown={() => { }} testId="visionUi_name_id" label="Name" fullWidth={true} style={{ padding: '10px 10px', backgroundColor: 'white' }} />
            <FormControl>
                <InputLabel id="selectFilterChain-outlined-label">Filterchain</InputLabel>
                <Select
                    labelId="selectFilterChain-outlined-label"
                    fullWidth={true}
                    id="selectFilterChain-outlined"
                    handlerChange={handleChangeFilterChain}
                    label="Filter chain"
                    value={filterChainSelected ? filterChainSelected : "None"}
                    style={{ backgroundColor: 'white' }}
                    listValue={filterChainList}
                >
                </Select>
            </FormControl>
            <Button
                label={<CachedIcon />}
                handler={handleRefreshFilterChainList}
                isIcon={true}
            ></Button>
            <br></br>
            <FormControl>
                <InputLabel id="selectMedia-outlined-label">Media</InputLabel>
                <Select
                    labelId="selectMedia-outlined-label"
                    fullWidth={true}
                    id="selectMedia-outlined"
                    handlerChange={handleChangeMedia}
                    label="Media"
                    value={mediaSelected ? mediaSelected : "None"}
                    style={{ backgroundColor: 'white' }}
                    listValue={mediaList}
                >
                </Select>
            </FormControl>
            <Button
                label={<CachedIcon />}
                handler={handleRefreshMediaList}
                isIcon={true}
            />
            <br></br>
            <div style={{ width: '80%', float: 'left' }} >
                <TextField handlerChange={() => { }} handlerKeyDown={() => { }} disabled={true} value={file} testId="file_id" label="File"
                    fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px', backgroundColor: 'white' }} />
            </div>
            <input type='file' id='file' ref={inputFile} onChange={fileDialogClicked} style={{ display: 'none' }} />
            <div style={{ float: 'right' }}><Button style={{ fontSize: '20px', marginTop: '22px' }} handler={handleFileOpen} label="..." /></div>
            <br></br>
            <TextField value={topicName} handlerChange={handleTopicNameChange} handlerKeyDown={() => { }} testId="visionUi_topicname_id" label="Topic Name"
                fullWidth={true} style={{ padding: '10px 10px', marginTop: '10px', backgroundColor: 'white', float: 'left' }} />
            <Button style={{ fontSize: '15px', marginTop: '10px', float: 'right' }} handler={handleCreate} label="Create" />
        </div>
    );
};

export default VisionUIExecutionTabModule;

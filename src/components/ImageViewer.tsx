import { useCallback, useContext, useState, useRef } from 'react';
import { GeneralContext } from "../context/generalContext";

import Select from './common/select/Select';
import FormControl from './common/Form/FormControl';
import InputLabel from './common/Input/InputLabel';
import Button from './common/button/Button'

import { MPlayCircleFilledIcon as PlayCircleFilledIcon } from './common/Icons/Icon';
import { MStopIcon as StopIcon } from './common/Icons/Icon';
import { MCachedIcon as CachedIcon } from './common/Icons/Icon';

import { RosContext } from "../context/rosContext";
import { useROSService, ServiceRequestFactory, Topic, TopicFactory } from '../hooks/useROSService'

import jpeg from 'jpeg-js'

const ImageViewer = () => {

    // Function to convert uncompressed data rgb8 to compressed base 64 jpeg
    function rgb8ImageToBase64Jpeg(msg: any) {
        var raw = atob(msg.data)
        var array = new Uint8Array(new ArrayBuffer(raw.length))
        for (let i = 0; i < raw.length; i++) {
            array[i] = raw.charCodeAt(i)
        }

        var frameData = Buffer.alloc(msg.width * msg.height * 4)
        for (let i = 0; i < msg.width * msg.height; i++) {
            frameData[4 * i + 0] = array[3 * i + 0]
            frameData[4 * i + 1] = array[3 * i + 1]
            frameData[4 * i + 2] = array[3 * i + 2]
            frameData[4 * i + 3] = 0
        }
        var rawImageData = {
            data: frameData,
            width: msg.width,
            height: msg.height
        }
        return jpeg.encode(rawImageData, 50).data.toString('base64')
    }

    const ros = useContext(RosContext);

    const [topic, setTopic] = useState<Topic | null>(null);
    const [listTopic, setListTopic] = useState<[]>([]);
    const topicRef = useRef<Topic | null>(null);
    const [image, setImage] = useState('')

    const imageCallback = useCallback(
        (x: any) => {

            var im: any;
            if (x.encoding === "bgr8" || x.encoding === "rgb8")
                im = "data:image/jpeg;base64," + rgb8ImageToBase64Jpeg(x);
            else if (x.format.includes("jpeg"))
                im = "data:image/jpeg;base64," + x.data;
            else {
                window.alert("Video format (" + x.encoding + ") is not supported, make sure you have the right encoding type or add it to the list");
                if (topicRef.current) {
                    topicRef.current.unsubscribe()
                    setTopic(null)
                }
            }
            setImage(im)
        },
        []
    )

    const handleChange = (x: any) => {
        if (topic) {
            topic.unsubscribe()
        }
        if (x.target.value !== "None") {
            listTopic.forEach((value) => {
                if (value["value"] === x.target.value) {
                    const type = value["type"]
                    const newtopic = TopicFactory({ ros: ros, name: x.target.value, messageType: type })
                    setTopic(newtopic)
                    topicRef.current = newtopic;
                    if (newtopic) {
                        newtopic.subscribe(imageCallback);
                    }
                }
            })
        }
    }

    const clickStop = () => {
        if (topic) {
            topic.unsubscribe()
        }
    }

    const clickPlay = () => {
        if (topic) {
            topic.subscribe(imageCallback);
        }
    }

    const serviceCallback = useCallback(
        (x: any) => {

            //Filtre sur les types de message que le souhaite 
            const messageFilter = ["sensor_msgs/Image","sensor_msgs/CompressedImage"]

            var tab: any = []
            x.topics.forEach((value: any, index: any) => {
                if (messageFilter.includes(x.types[index])) {
                    const obj = { value: value, type: x.types[index] }
                    tab.push(obj);
                }
            })
            setListTopic(tab)
        }, []
    )

    const topicServiceCall = useROSService<any>(serviceCallback, "/rosapi/topics/", "rosapi/Topics")

    const clickUpdate = () => {
        var request = ServiceRequestFactory({});
        topicServiceCall(request)
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%' }}>
                    <div style={{ width: '96%', height: '90%', flexDirection: 'row', marginLeft: '2%' }}>
                        <h1 style={{ fontSize: '20px', textAlign: 'center' }}>CAMERA VIEWER</h1>
                        <FormControl>
                            <InputLabel id="select-outlined-label">Topic</InputLabel>
                            <Select
                                labelId="select-outlined-label"
                                id="select-outlined"
                                handlerChange={handleChange}
                                label="Topic"
                                value={topic?.name ? topic.name : "None"}
                                style={{ backgroundColor: 'white' }}
                                listValue={listTopic}
                            >
                            </Select>
                        </FormControl>
                        <Button
                            label={<CachedIcon />}
                            handler={clickUpdate}
                            isIcon={true}
                        ></Button>
                        <br></br>
                        <Button
                            label={<StopIcon />}
                            handler={clickStop}
                            isIcon={true}
                        ></Button>
                        <Button
                            label={<PlayCircleFilledIcon />}
                            handler={clickPlay}
                            isIcon={true}
                        ></Button>
                        <div style={{ width: "100%", height: "calc(100% - 140px)" }}>
                            {image !== '' ?
                                <img src={image} width="100%" height="100%" alt="imageviewer"></img> : <img width="100%" height="100%" alt="imageviewer"></img>
                            }
                        </div>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ImageViewer;

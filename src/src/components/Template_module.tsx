import React, { useCallback,useContext } from 'react';
import { GeneralContext } from "../context/generalContext";
import { useROSService } from '../hooks/useROSService'
import {MessageFactory, useROSTopicPublisher} from "../hooks/useROSTopicPublisher";
import {useROSTopicSubscriber} from "../hooks/useROSTopicSubscriber";
import Button from './common/button/Button'
import Switch from "./common/switch/Switch";
import AppBar from "./common/AppBar/AppBar";
import Box from "./common/Box/Box";
import IconButton from "./common/button/IconButton";
import InputLabel from "./common/Input/InputLabel";
import List from "./common/List/List";
import ListItem from "./common/List/ListItem";
import ListItemText from "./common/List/ListItemText";
import Select from "./common/select/Select";

const Template_module = () => {

    // Service Callback
    const TemplateServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const context = useContext(GeneralContext)
    const ServiceCallTemplate = useROSService<any>(TemplateServiceCallback, "/insert service name", "insert service type")

    const TopicPublisherTemplate = useROSTopicPublisher<any>("/insert topic name", "insert message type")


    // Publishing an empty data example
    var toPublish = MessageFactory({
        data: {}
    })
    TopicPublisherTemplate(toPublish)

    const subscriberCallback = useCallback((data: any) => {
        // Do something here

    }, []);
    useROSTopicSubscriber<any>(
        subscriberCallback,
        'insert service name',
        'insert message type'
    );

    const handleButtonClick = () => {
        // Handle the button click here
    }
    const handleSwitch = () => {
        // handle Switch here
    }

    //TODO Example pour les commons

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Module template</h1>
                    <AppBar />
                    <Box />
                    <IconButton />
                    <InputLabel />
                    <List>
                        <ListItem></ListItem>
                        <ListItemText></ListItemText>
                    </List>
                    <Select handlerChange={() => console.log()}>
                    </Select>

                    <Button
                        handler={handleButtonClick}
                        label="Button template"
                        isIcon={false}
                    />
                    <Switch
                        onLabel="On"
                        offLabel="off"
                        value={true}
                        vertical={false}
                        round={true}
                        handler={handleSwitch}
                    />

                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Template_module;
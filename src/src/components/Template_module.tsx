import React, { useCallback,useContext } from 'react';
import { GeneralContext } from "../context/generalContext";
import { useROSService } from '../hooks/useROSService'
import {MessageFactory, useROSTopicPublisher} from "../hooks/useROSTopicPublisher";
import {useROSTopicSubscriber} from "../hooks/useROSTopicSubscriber";

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

    //TODO Example pour les commons

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Module template</h1>

                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Template_module;
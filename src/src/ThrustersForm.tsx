import {useForm} from "react-hook-form";
import React from "react";
import ROSLIB from "roslib";
import { useROSTopicPublisher } from './hooks/useROSTopicPublisher'

export const ThrustersForm = () => {

    type thrustersLevel = {
        t1: string;
        t2: string;
        t3: string;
        t4: string
    };
    const { register, handleSubmit } = useForm<thrustersLevel>();
    const thrusterEffortPublisher = useROSTopicPublisher<any>("/testPublish2", "std_msgs/Int16")
    const onSubmit = (data: thrustersLevel) => {
        console.log("data", data);
        var test = parseInt(data.t1)
        var toPublish = new ROSLIB.Message({
            data: test
        })
        thrusterEffortPublisher(toPublish)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                T1 :
                <input type="text" name="t1" ref={register}/>
            </label>
            <label>
                T2 :
                <input type="text" name="t2" ref={register}/>
            </label>
            <label>
                T3 :
                <input type="text" name="t3"ref={register} />
            </label>
            <label>
                T4 :
                <input type="text" name="t4" ref={register}/>
            </label>
            <input type="submit" value="Envoyer" />
        </form>

    )
}
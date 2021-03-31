import './common/switch/switch.css';

const LabelAndValueModule = (props: any) => {
    return (
        <div style={{padding: '10px'}}>
           <p>{props.label} : {props.value} {props.unit}</p>
        </div>
    );
};

export default LabelAndValueModule;
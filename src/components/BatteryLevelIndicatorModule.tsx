import BatterieSlider from "./common/slider/BatterieSlider";
import LabelAndValueModule from "./LabelAndValueModule";

export const BatterieLevelIndicator = (props: any) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '20px',
            margin: 'auto'
        }}>
            <div>
                <LabelAndValueModule
                    label={props.label}
                    value={props.value}
                    unit={props.unit}

                />
            </div>
            <div style={{ margin: 'auto' }}>
                <BatterieSlider
                    orientation="horizontal"
                    value={props.value}
                    min={0}
                    max={17}
                    disabled={true}
                />
            </div>
        </div>

    )

}

export default BatterieLevelIndicator
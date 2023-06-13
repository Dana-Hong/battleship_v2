import { Axis } from "../types"
import Button from "./Button"
type AxisSelectorProps = {
    currentAxis: Axis;
    onAxisSelect: (axis: Axis) => void;
}
const AxisSelector = ({ currentAxis, onAxisSelect }: AxisSelectorProps) => {
    return (
        <div>
            <Button
                axis="Y"
                currentAxis={currentAxis}
                onAxisSelect={onAxisSelect}
            >
                Switch to Y Axis
            </Button>
            <Button
                axis="X"
                currentAxis={currentAxis}
                onAxisSelect={onAxisSelect}
            >
                Switch to X Axis
            </Button>
        </div>
    )
}

export default AxisSelector;
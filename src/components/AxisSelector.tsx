import { Axis } from "../types"
import Button from "./Button"
type AxisSelectorProps = {
    onAxisSelect: (axis: Axis) => void;
}
const AxisSelector = ({ onAxisSelect }: AxisSelectorProps) => {
    return (
        <div>
            <Button
                axis="Y"
                onAxisSelect={onAxisSelect}
            >
                Switch to Y Axis
            </Button>
            <Button
                axis="X"
                onAxisSelect={onAxisSelect}
            >
                Switch to X Axis
            </Button>
        </div>
    )
}

export default AxisSelector;
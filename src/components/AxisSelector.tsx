import { Axis } from "../types"
import Button from "./Button"
type AxisSelectorProps = {
    currentAxis: Axis;
    onAxisSelect: (axis: Axis) => void;
}
const AxisSelector = ({ currentAxis, onAxisSelect }: AxisSelectorProps) => {
    const axisSelectButtonStyles = (axis: Axis) => {
        if (currentAxis === axis) return 'bg-sky-600';
    }

    return (
        <div>
            <Button
                className={axisSelectButtonStyles('Y')}
            >
                <button 
                    onClick={() => {
                        onAxisSelect("Y");
                    }}
                >
                    Y Axis
                </button>
            </Button>
            <Button
                className={axisSelectButtonStyles('X')}
            >
                <button
                    onClick={() => {
                        onAxisSelect("X");
                    }}
                >
                    X Axis
                </button>
            </Button>
        </div>
    )
}

export default AxisSelector;
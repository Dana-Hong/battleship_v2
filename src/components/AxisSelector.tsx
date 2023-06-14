import { Axis } from "../types";
import Button from "./Button";
type AxisSelectorProps = {
  currentAxis: Axis;
  onClick: (axis: Axis) => void;
};
const AxisSelector = ({ currentAxis, onClick }: AxisSelectorProps) => {
  const axisSelectButtonStyles = (axis: Axis) => {
    if (currentAxis === axis) return "bg-sky-600";
  };

  return (
    <div>
      <Button className={axisSelectButtonStyles("Y")}>
        <button
          onClick={() => {
            onClick("Y");
          }}
        >
          Y Axis
        </button>
      </Button>
      <Button className={axisSelectButtonStyles("X")}>
        <button
          onClick={() => {
            onClick("X");
          }}
        >
          X Axis
        </button>
      </Button>
    </div>
  );
};

export default AxisSelector;

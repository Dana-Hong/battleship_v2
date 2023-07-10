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
    <div className="w-full">
      <p className="py-4 text-lg font-semibold text-center">Select Axis</p>
      <div className="flex flex-col gap-3">
        <Button className={`${axisSelectButtonStyles("X")}`}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("X");
            }}
          >
            X Axis
          </button>
        </Button>
        <Button className={`${axisSelectButtonStyles("Y")}`}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("Y");
            }}
          >
            Y Axis
          </button>
        </Button>
      </div>
    </div>
  );
};

export default AxisSelector;

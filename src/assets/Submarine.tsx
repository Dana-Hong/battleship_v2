import { Axis } from "../types";

const Submarine = ({ className, axis }: { className?: string; axis: Axis }) => {
  return (
    <svg
      viewBox="0 0 475 175"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      className={`${className} absolute min-[375px]:h-8 min-[375px]:w-24 sm:h-10 sm:w-[120px] lg:h-12 lg:w-36 ${
        axis === "X"
          ? "top-0 left-0"
          : "rotate-90 translate-y-8 sm:translate-y-10 lg:translate-y-12"
      }`}
    >
      <path
        d="M376 148.922C300.286 170.36 201.388 175 155.81 175 76.64 175 0 130.83 0 83.6 0 36.37 78.806 3 157.973 3c45.41 0 143.03.98 218.027 19.256L386 0h60v45.274c18.023 8.674 29 28.18 29 38.326 0 10.098-10.973 30.057-29 39.473V170h-60l-10-21.078z"
        fill="#1B4971"
        fillOpacity={0.905}
      />
      <path
        d="M457 84.98C457 28.237 237.167 23 164 23S18 49.834 18 84.98C18 120.13 88.833 153 162 153s295-11.273 295-68.02z"
        fill="gray"
        fillOpacity={0.905}
        strokeWidth={5}
        stroke="#737373"
        strokeOpacity={0.905}
      />
      <path
        d="M167.906 69.47c-27.82 0-38.906 6.843-38.906 15.264C129 93.156 140.087 100 167.906 100 195.724 100 223 93.156 223 84.734c0-8.42-27.276-15.265-55.094-15.265z"
        fill="#CCC"
        strokeWidth={3}
        stroke="#E6E6E6"
      />
    </svg>
  );
};

export default Submarine;

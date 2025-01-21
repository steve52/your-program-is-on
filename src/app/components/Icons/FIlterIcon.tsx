type FilterIconProps = {
  fillColor?: string;
};

const FilterIcon: React.FC<FilterIconProps> = ({ fillColor = "#666666" }) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0C2.01 2.59 7 9 7 9V16H11V9C11 9 15.98 2.59 18 0H0Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default FilterIcon;

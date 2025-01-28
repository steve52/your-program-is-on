type SortIconProps = {
  fillColor?: string;
  fillOpacity?: number;

  className?: string;
};

const SortIcon: React.FC<SortIconProps> = ({
  className,
  fillColor = "black",
  fillOpacity = 0.6,
}) => {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0V2H18V0H0ZM0 12H6V10H0V12ZM12 7H0V5H12V7Z"
        fill={fillColor}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default SortIcon;

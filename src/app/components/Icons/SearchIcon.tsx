type SearchIconProps = {
  fillOpacity?: number;
  className?: string;
};

const SearchIcon: React.FC<SearchIconProps> = ({
  className,
  fillOpacity = 0.6,
}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9678 11.2549H12.7578L17.7478 16.2549L16.2578 17.7449L11.2578 12.7549V11.9649L10.9878 11.6849C9.84781 12.6649 8.36781 13.2549 6.75781 13.2549C3.16781 13.2549 0.257812 10.3449 0.257812 6.75488C0.257812 3.16488 3.16781 0.254883 6.75781 0.254883C10.3478 0.254883 13.2578 3.16488 13.2578 6.75488C13.2578 8.36488 12.6678 9.84488 11.6878 10.9849L11.9678 11.2549ZM2.25781 6.75488C2.25781 9.24488 4.26781 11.2549 6.75781 11.2549C9.24781 11.2549 11.2578 9.24488 11.2578 6.75488C11.2578 4.26488 9.24781 2.25488 6.75781 2.25488C4.26781 2.25488 2.25781 4.26488 2.25781 6.75488Z"
        fill="currentColor"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default SearchIcon;

const InsightsIcon = ({ isActive }: { isActive?: boolean }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="2 18 8 10 13 14 18 7 23 11"
      stroke={isActive ? "#232323" : "#B1B1B1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="8"
      cy="10"
      r="1.5"
      fill={isActive ? "#232323" : "#B1B1B1"}
    />
    <circle
      cx="13"
      cy="14"
      r="1.5"
      fill={isActive ? "#232323" : "#B1B1B1"}
    />
    <circle
      cx="18"
      cy="7"
      r="1.5"
      fill={isActive ? "#232323" : "#B1B1B1"}
    />
    <circle
      cx="23"
      cy="11"
      r="1.5"
      fill={isActive ? "#232323" : "#B1B1B1"}
    />
  </svg>
);

export default InsightsIcon;

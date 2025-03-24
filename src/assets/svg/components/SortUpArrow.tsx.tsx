const SortUpArrow = ({ color = '#000000' }) => {
    return (
        <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_42_30)">
                <path d="M4 6L8 1L12 6H4Z" />
            </g>
            <defs>
                <clipPath id="clip0_42_30">
                    <rect width="16" height="8" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SortUpArrow;

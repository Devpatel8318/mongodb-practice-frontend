const SortDownArrow = ({ color = '#000000' }) => {
    return (
        <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_41_22)">
                <path d="M4 2L8 7L12 2H4Z" />
            </g>
            <defs>
                <clipPath id="clip0_41_22">
                    <rect
                        width="16"
                        height="8"
                        fill="white"
                        transform="matrix(1 0 0 -1 0 8)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SortDownArrow;

import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`bg-white border border-gray-200 rounded-xl shadow-xs ${className} `}
        >
            {children}
        </div>
    );
};

export default Card;

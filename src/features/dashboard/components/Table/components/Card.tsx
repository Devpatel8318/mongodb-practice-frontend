import React from 'react'

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div
			className={`rounded-xl border border-gray-200 bg-white ${className} `}
		>
			{children}
		</div>
	)
}

export default Card

import React from 'react';

interface TextInputProps {
    // Core props
    label: string;
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;

    // Enhanced accessibility
    id?: string;

    // Additional states
    disabled?: boolean;
    readOnly?: boolean;

    // Styling & variants
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    // Core props
    label,
    type = 'text',
    name,
    value,
    placeholder,
    onChange,
    error,

    // Enhanced accessibility
    id = name,

    // Additional states
    disabled = false,
    readOnly = false,

    // Styling & variants
    className = '',
    inputClassName = '',
    labelClassName = '',
    errorClassName = '',
}) => {
    return (
        <div className={className}>
            <label className={`block mb-2 text-sm ${labelClassName}`}>
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`
                        px-4 py-2.5 text-sm block w-full border rounded-lg 
                        ${
                            error
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                        } 
                        ${
                            disabled
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : ''
                        }
                        ${inputClassName}
                    `}
                />
            </div>

            {error && (
                <p className={`mt-1 text-xs text-red-600 ${errorClassName}`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;

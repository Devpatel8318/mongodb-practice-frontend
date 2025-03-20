import React from 'react';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
    footerText?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, footerText }) => {
    return (
        <div className="bg-gray-100 flex items-center py-16 h-screen">
            <div className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {title}
                        </h1>
                        {footerText && (
                            <p className="mt-2 text-sm text-gray-600">
                                {footerText}
                            </p>
                        )}
                    </div>
                    <div className="mt-5">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;

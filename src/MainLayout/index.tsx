import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="w-screen min-h-screen p-3 bg-violet-500 flex">
            <div className="bg-gray-100 grow rounded-md">{children}</div>
        </div>
    );
};

export default MainLayout;

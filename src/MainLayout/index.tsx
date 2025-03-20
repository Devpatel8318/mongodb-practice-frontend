import { React, Link } from 'src/deps';

import Icons from 'src/assets/svg';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <header className="sticky top-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 ">
                <nav className="max-w-[85rem] mx-auto w-full px-4 sm:px-6 lg:px-8 flex basis-full items-center justify-between">
                    <div className="me-5">
                        {/* Logo */}
                        <Link
                            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
                            to="#"
                            aria-label="Preline"
                        >
                            MongoAcademy
                        </Link>
                        {/* End Logo */}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* might add other nav items */}
                        {/* Avatar */}
                        <div className="relative inline-flex">
                            <button
                                type="button"
                                className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Icons.Images24.ProfileIcon />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="p-3 bg-gray-100 h-full grow flex">
                {/* add bg color if required for below div */}
                <div className="grow rounded-md">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;

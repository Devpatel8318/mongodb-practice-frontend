import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-3xl flex flex-col mx-auto">
                <header className="mb-auto flex justify-center z-50 py-4 absolute top-0">
                    <nav className="px-4 sm:px-6 lg:px-8">
                        <Link
                            className="flex-none text-xl font-semibold sm:text-3xl"
                            to="/"
                        >
                            Mongo Academy
                        </Link>
                    </nav>
                </header>

                <main id="content">
                    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
                            404
                        </h1>
                        <p className="mt-3 text-gray-600 ">
                            Oops, something went wrong.
                        </p>
                        <p className="text-gray-600 ">
                            Sorry, we couldn't find your page.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotFound;

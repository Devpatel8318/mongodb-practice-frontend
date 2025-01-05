import React, { useEffect, useState } from 'react';
import { signInActionDispatcher } from './auth.action';
import { useAppSelector } from 'src/Store';
import { useNavigate } from 'react-router-dom';
import showToast from 'src/utils/showToast';
import { emailValidator } from 'src/utils/emailValidator';
import { passwordValidator } from 'src/utils/passwordValidator';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const navigate = useNavigate();
    const { isUserLoggedIn, error, loading, showAlertMessage } = useAppSelector(
        (store) => store.auth
    );

    useEffect(() => {
        if (loading) return;

        if (error && showAlertMessage) {
            showToast('error', error.message);
        } else if (isUserLoggedIn) {
            showToast('success', 'Login successful');
            navigate('/', { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const validateSubmit = (): boolean => {
        const emailError = emailValidator(formData.email);
        const passwordError = passwordValidator(formData.password);

        setErrors({ email: emailError, password: passwordError });

        return !emailError && !passwordError;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateSubmit()) {
            signInActionDispatcher(formData);
        }
    };

    return (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
                            Log in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="name@company.com"
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={handleChange}
                                />
                                <div className="text-red-500 pl-1">
                                    {errors.email}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={handleChange}
                                />
                                <div className="text-red-500 pl-1">
                                    {errors.password}
                                </div>
                            </div>
                            {/* <div className="flex items-center justify-end">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Forgot password?
                                </a>
                            </div> */}
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Log in
                            </button>
                            {/* <button
                                type="button"
                                className="text-sm font-light text-gray-400"
                            >
                                Don't have an account yet?{' '}
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Sign up
                                </a>
                            </button> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

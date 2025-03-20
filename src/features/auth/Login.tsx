import React, { useEffect, useState } from 'react';
import { signInActionDispatcher } from './auth.action';
import { useAppSelector } from 'src/Store';
import { useNavigate } from 'react-router-dom';
import showToast from 'src/utils/showToast';
import { emailValidator } from 'src/utils/emailValidator';
import { passwordValidator } from 'src/utils/passwordValidator';
import { Link } from 'react-router-dom';
import OAuthButton from './components/OAuthButton';
import TextInput from './components/TextInput';
import Button from './components/Button';
import AuthCard from './components/AuthCard';

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
        <>
            <AuthCard
                title="Sign in"
                footerText={
                    <p>
                        Don't have an account yet?{' '}
                        <Link
                            to="/signup"
                            className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                        >
                            Sign up here
                        </Link>
                    </p>
                }
            >
                <OAuthButton />

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                    Or
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-7 flex-col">
                        <div>
                            <TextInput
                                label="Email address"
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="name@company.com"
                                onChange={handleChange}
                                error={errors.email}
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="••••••••"
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <Link
                                className="inline-flex items-center gap-x-1 text-xs text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                                to="/forget"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            label="Sign in"
                            disabled={loading}
                        />
                    </div>
                </form>
            </AuthCard>
        </>
    );
};

export default Login;

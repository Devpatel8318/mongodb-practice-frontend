import { React, useEffect, useState, Link, useNavigate } from 'src/deps';

import { useAppSelector } from 'src/Store';
import showToast from 'src/utils/showToast';
import { emailValidator } from 'src/utils/emailValidator';
import Button from './components/Button';
import TextInput from './components/TextInput';
import AuthCard from './components/AuthCard';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();
    const { isUserLoggedIn, error, loading, showAlertMessage } = useAppSelector(
        (store) => store.auth
    );

    useEffect(() => {
        if (loading) return;

        if (error && showAlertMessage) {
            showToast('error', error.message);
        } else if (isUserLoggedIn) {
            showToast('success', 'Successfully Registered');
            navigate('/', { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const validateSubmit = (): boolean => {
        const emailError = emailValidator(email);

        setEmailError(emailError);

        return !emailError;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateSubmit()) {
            // signInActionDispatcher(email);
        }
    };

    return (
        <>
            <AuthCard
                title="Forgot password?"
                footerText={
                    <p>
                        Remember your password?{' '}
                        <Link
                            to="/signup"
                            className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                        >
                            Sign in here
                        </Link>
                    </p>
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2 flex-col">
                        <div className="mb-4">
                            <TextInput
                                label="Email address"
                                type="email"
                                name="email"
                                value={email}
                                placeholder="name@company.com"
                                onChange={handleEmailChange}
                                error={emailError}
                            />
                        </div>
                        <Button
                            type="submit"
                            label="Reset Password"
                            disabled={loading}
                        />
                    </div>
                </form>
            </AuthCard>
        </>
    );
};

export default ForgetPassword;

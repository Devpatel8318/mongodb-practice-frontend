import { useEffect, useState, Toaster } from 'src/deps';

import Routers from 'src/router';
import { loginUserDispatcher } from './Store/reducers/auth.reducer';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    // * this state is required because without this in initial render, private route will get
    // * default false of isUserLoggedIn as false, due to which it will unnecessary call user/me.
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        if (isLoggedIn) {
            loginUserDispatcher();
        }
        setInitialized(true);
    }, []);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div>
                <Toaster
                    toastOptions={{
                        duration: 5000,
                        success: { duration: 1000 },
                        error: { duration: 2000 },
                    }}
                />
                <Routers />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;

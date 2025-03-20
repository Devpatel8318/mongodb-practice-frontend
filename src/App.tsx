import { useEffect, useState, Toaster } from 'src/deps';

import Routers from 'src/router';
import { appDispatcher } from './Store';
import { loginUser } from './Store/reducers/auth.reducer';

function App() {
    // * this state is required because without this in initial render, private route will get
    // * default false of isUserLoggedIn as false, due to which it will unnecessary call user/me.
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        if (isLoggedIn) {
            appDispatcher(loginUser());
        }
        setInitialized(true);
    }, []);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    return (
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
    );
}

export default App;

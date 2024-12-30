import Cookies from 'js-cookie';

const getToken = (): string | undefined => {
    const cookieName =
        process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME || 'accessToken';
    return Cookies.get(cookieName);
};

export default getToken;

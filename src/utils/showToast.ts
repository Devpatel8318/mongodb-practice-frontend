import toast from 'react-hot-toast';

type toastType = 'success' | 'error' | 'loading' | 'dismiss' | 'remove';

const showToast = (toastType: toastType, message: string, toastId?: string) => {
    let id = null;

    switch (toastType) {
        case 'success':
            id = toast.success(message);
            break;

        case 'error':
            id = toast.error(message);
            break;

        case 'loading':
            id = toast.loading(message);
            break;

        case 'dismiss':
            id = toast.dismiss(message);
            break;

        case 'remove':
            id = toast.remove(message);
            break;

        default:
            break;
    }

    return id;
};

export default showToast;

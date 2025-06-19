import toast from "react-hot-toast";

export const useToast = () => {
  const showSuccess = (message: string, options?: { duration?: number }) => {
    return toast.success(message, {
      duration: options?.duration || 4000,
      style: {
        background: '#0d1117',
        color: '#f0f6fc',
        border: '1px solid #238636',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
      },
      iconTheme: {
        primary: '#238636',
        secondary: '#f0f6fc',
      },
    });
  };

  const showError = (message: string, options?: { duration?: number }) => {
    return toast.error(message, {
      duration: options?.duration || 5000,
      style: {
        background: '#0d1117',
        color: '#f0f6fc',
        border: '1px solid #da3633',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
      },
      iconTheme: {
        primary: '#da3633',
        secondary: '#f0f6fc',
      },
    });
  };

  const showInfo = (message: string, options?: { duration?: number }) => {
    return toast(message, {
      duration: options?.duration || 4000,
      icon: 'ℹ️',
      style: {
        background: '#0d1117',
        color: '#f0f6fc',
        border: '1px solid #1f6feb',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#0d1117',
        color: '#f0f6fc',
        border: '1px solid #30363d',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  };

  const showPromise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, messages, {
      style: {
        background: '#0d1117',
        color: '#f0f6fc',
        border: '1px solid #30363d',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
      },
      success: {
        iconTheme: {
          primary: '#238636',
          secondary: '#f0f6fc',
        },
      },
      error: {
        iconTheme: {
          primary: '#da3633',
          secondary: '#f0f6fc',
        },
      },
    });
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    loading: showLoading,
    promise: showPromise,
    dismiss: toast.dismiss,
  };
};
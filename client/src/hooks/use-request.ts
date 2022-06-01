import { useState } from "react";
import axios from 'axios';

interface Props<Body, CallbackParams> {
    apiRoute: string;
    method: 'get' | 'post';
    from?: string;
    body?: Body;
    onSuccess?: (params: CallbackParams) => void;
    onError?: (params: {message: string, status?: number}) => void;
}

interface Status {
    current?: string;
    loading?: boolean;
    error?: boolean;
    message?: string;
}

interface FetchError {
    message: string;
}

export default function useRequest() {
    const [status, setStauts] = useState<Status>({});

    const sendRequest = async <Body, CallbackParams>({ apiRoute, from, method, body, onSuccess, onError } : Props<Body, CallbackParams>) => {
        try {
            setStauts({ loading: true, current: from });
            const url = 'http://localhost:3001' + apiRoute;
            const response = await axios[method](url, body);

            if (onSuccess) onSuccess(response.data);
            setStauts({});
            return response;
        } catch(error) {
            let message = '';
            if (axios.isAxiosError(error)) {
                const err = error.response;
                const { message } = err?.data as FetchError;
                if (onError) onError({ message, status: err?.status });
            } else {
                message = 'Something went wrong';
                if (onError) onError({ message });
            }
            setStauts({ error: true, current: from,  message });
        }
    }

    return { status, sendRequest };
}
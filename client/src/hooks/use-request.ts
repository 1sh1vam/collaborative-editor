import { useState } from "react";
import axios from 'axios';

interface Props<Body, CallbackParams> {
    apiRoute: string;
    method: 'get' | 'post';
    from?: string;
    body?: Body;
    onSuccess?: (params: CallbackParams) => void;
}

interface FetchError {
    message: string;
}

interface Status {
    current?: string;
    loading?: boolean;
    error?: boolean;
    message?: string;
}

export default function useRequest() {
    const [status, setStauts] = useState<Status>({});

    const sendRequest = async <Body, CallbackParams>({ apiRoute, from, method, body, onSuccess } : Props<Body, CallbackParams>) => {
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
                const err = error.response?.data as FetchError;
                message = err.message;
            } else {
                message = 'Something went wrong';
            }
            setStauts({ error: true, current: from,  message });
        }
    }

    return { status, sendRequest };
}
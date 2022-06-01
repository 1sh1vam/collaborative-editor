import { useState } from "react";
import axios from 'axios';

interface Props<Body, CallbackParams> {
    apiRoute: string;
    method: 'get' | 'post';
    from?: string;
    body?: Body;
    onSuccess?: (params: CallbackParams) => void;
    onError?: (params: Status) => void;
}

interface Status {
    current?: string;
    loading?: boolean;
    error?: boolean;
    message?: string;
    status?: number;
}

interface FetchError {
    msg: string;
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
            let errObj = { error: true } as Status;
            if (axios.isAxiosError(error)) {
                const err = error.response;
                const errData = err?.data as FetchError;
                console.error('err data', errData, err)
                errObj = { ...errObj, message: errData?.msg, status: err?.status }
            } else {
                errObj.message = 'Something went wrong';
            }
            if (onError) onError(errObj);
            setStauts({ error: true, current: from,  message: errObj.message });
        }
    }

    return { status, sendRequest };
}
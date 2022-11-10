import { useCallback } from 'react';
import jQuery from 'jquery';
import PlainObject = JQuery.PlainObject;

type request = {
    method?: string | null;
    data?: object | null;
    url: string;
    // headers?: Record<string, string | number | boolean>;
    headers?: PlainObject<string | null | undefined>;
};

type callback = (data?: any) => void;

const useHttp = () => {
    return useCallback(
        (requestOptions: request, successCallback?: callback, errorCallback?: callback, completeCallback?: callback) =>
            jQuery
                .ajax(requestOptions.url, {
                    method: requestOptions.method ? requestOptions.method.toUpperCase() : 'GET',
                    // url: requestOptions.url,
                    data: requestOptions.data ? requestOptions.data : {},
                    headers: requestOptions.headers ? requestOptions.headers : {},
                })
                .then((response: any) => {
                    return Promise.resolve().then(() => successCallback && successCallback(response));
                })
                .catch(error => {
                    return Promise.reject().then(() => errorCallback && errorCallback(error));
                })
                .done(() => {
                    completeCallback && completeCallback();
                }),
        [],
    );
};

export default useHttp;

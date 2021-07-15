const apiBaseUrl = "http://localhost:5000";

export default {
    post: async (url, data = {}) => {
        return await fetch(`${apiBaseUrl}/${url}`, {
            method: 'POST',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }),
        });
    },

    get: async (url) => {
        return await fetch(`${apiBaseUrl}/${url}`, {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }),
        });
    },
    
    delete: async (url) => {
        return await fetch(`${apiBaseUrl}/${url}`, {
            method: 'DELETE',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }),
        });
    }
};

import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MSAL_TENANT_ID}`,
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest: PopupRequest = {
    scopes: ["User.Read", import.meta.env.VITE_API_SCOPE]
};

export const protectedResources = {
    apiEndpoint: {
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        scopes: [import.meta.env.VITE_API_SCOPE],
    },
}; 
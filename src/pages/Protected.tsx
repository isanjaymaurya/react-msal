import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { protectedResources } from "../config/authConfig";
import axios from 'axios';
import { useMsal } from "@azure/msal-react";

export const Protected = () => {
    const { account, logout, loading } = useAuth();
    const { instance } = useMsal();
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProtectedData = async () => {
            if (!account) {
                console.log("No account available");
                return;
            }

            try {
                console.log("Attempting to acquire token...");
                // Acquire token silently
                const tokenResponse = await instance.acquireTokenSilent({
                    scopes: protectedResources.apiEndpoint.scopes,
                    account: account
                });

                console.log("Token acquired, making API call...");
                const response = await axios.get(
                    `${protectedResources.apiEndpoint.endpoint}/protected`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log("API response received:", response.data);
                setData(response.data);
                setError(null);
            } catch (error: any) {
                console.error("Error details:", error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    setError(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                    setError("No response received from the server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up request:", error.message);
                    setError(`Error: ${error.message}`);
                }
            }
        };

        if (account && !loading) {
            getProtectedData();
        }
    }, [account, instance, loading]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h2>Protected Page</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            {error ? (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
            ) : null}
            {data ? (
                <div>
                    <h3>Protected Data:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading protected data...</p>
            )}
        </div>
    );
}; 
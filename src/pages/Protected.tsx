import { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { protectedResources } from "../config/authConfig";
import axios from 'axios';

export const Protected = () => {
    const { instance, accounts } = useMsal();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getProtectedData = async () => {
            if (accounts[0]) {
                try {
                    const tokenResponse = await instance.acquireTokenSilent({
                        scopes: protectedResources.apiEndpoint.scopes,
                        account: accounts[0]
                    });

                    const response = await axios.get(
                        `${protectedResources.apiEndpoint.endpoint}/protected`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenResponse.accessToken}`
                            }
                        }
                    );

                    setData(response.data);
                } catch (error) {
                    console.error("API call failed:", error);
                }
            }
        };

        getProtectedData();
    }, [instance, accounts]);

    return (
        <div>
            <h2>Protected Page</h2>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading protected data...</p>
            )}
        </div>
    );
}; 
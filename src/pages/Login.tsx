import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const { login, loading } = useAuth();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="login-container">
            <h2>Welcome to the App</h2>
            <button onClick={handleLogin}>
                Sign in with Microsoft
            </button>
        </div>
    );
}; 
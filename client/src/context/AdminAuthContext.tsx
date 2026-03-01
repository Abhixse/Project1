import React, { createContext, useContext, useEffect, useState } from "react";

interface Admin {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "editor";
}

interface AuthContextType {
    admin: Admin | null;
    token: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setToken(storedToken);
            fetchAdminInfo(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchAdminInfo = async (authToken: string) => {
        try {
            const response = await fetch("/api/admin/me", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAdmin(data);
            } else {
                localStorage.removeItem("adminToken");
                setToken(null);
            }
        } catch (error) {
            console.error("Failed to fetch admin info:", error);
            localStorage.removeItem("adminToken");
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                let errorMessage = "Login failed";
                try {
                    const error = await response.json();
                    errorMessage = error.error || error.message || errorMessage;

                    // Special handling for database unavailable
                    if (error.hint) {
                        errorMessage = `${errorMessage}\n\n💡 ${error.hint}`;
                    }
                } catch (jsonError) {
                    // If JSON parsing fails, use generic message
                    errorMessage = `Login failed (${response.status})`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setToken(data.token);
            setAdmin(data.admin);
            localStorage.setItem("adminToken", data.token);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem("adminToken");
    };

    const value: AuthContextType = {
        admin,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!admin && !!token,
    };

    return (
        <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within AdminAuthProvider");
    }
    return context;
};

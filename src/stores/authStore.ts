import { create } from "zustand";

interface AuthStata {
    isAuthentiacted: boolean;
    error: string;
    userId: string;
    validateUser: (token: string) => Promise<void>;
}

const useAuthStore = create<AuthStata>((set) => ({
    isAuthentiacted: false,
    error: "",
    userId: "",
    validateUser: async (token: string) => {
        try {
            const data = await fetch('https://aytes-backend.onrender.com/auth', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (!data.ok) {
                const getData = await data.json()
                throw new Error(getData.error || "An error occured")
            }

            const getData = await data.json()

            set({ error: "", isAuthentiacted: true, userId: getData.decoded })
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isAuthentiacted: false });
            } else {
                set({ error: 'An unknown error occurred.', isAuthentiacted: false });
            }
        }
    }
}))

export default useAuthStore;
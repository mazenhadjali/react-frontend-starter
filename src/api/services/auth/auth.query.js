// hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { auth } from "./auth.services";


export function useLogin() {
    return useMutation({
        mutationFn: (creds) => auth.login(creds),
        onSuccess: () => {
            toast.success("Welcome back!");
        },
        meta: { errorMessage: "Login failed", mutationId: "login" },
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: () => auth.logout(),
        meta: { errorMessage: "Logout failed", mutationId: "logout" },
    });
}

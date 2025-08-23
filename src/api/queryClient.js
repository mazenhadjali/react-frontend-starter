import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

// Small helper to get a readable error message
const getErrorMessage = (err) =>
    (err && (err.message || err?.response?.data?.message)) || "An unexpected error occurred";

/**
 * Configure and create the React Query client
 * Includes global configuration for queries and mutations
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Retry failed requests once
            refetchOnWindowFocus: false, // Disable automatic refetch on window focus
            staleTime: 30000, // Consider data fresh for 30 seconds
        },
    },

    /**
     * Global query cache configuration
     * Handles success and error states for all queries
     */
    queryCache: new QueryCache({
        onSuccess: (_data, query) => {
            const meta = query?.meta || {};
            if (meta.successMessage) {
                toast.success(meta.successMessage);
            }
        },
        onError: (error, query) => {
            const meta = query?.meta || {};
            const base = meta.errorMessage || getErrorMessage(error);
            toast.error(base);

            // Log error for debugging
            console.error("Query Error:", {
                queryKey: query.queryKey,
                error,
                meta: query.meta,
            });
        },
    }),

    /**
     * Global mutation cache configuration
     * Handles success and error states for all mutations
     */
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            const meta = mutation?.meta || {};

            if (meta.successMessage) {
                toast.success(meta.successMessage);
            }

            if (meta.invalidateQueries) {
                const queriesToInvalidate = Array.isArray(meta.invalidateQueries)
                    ? meta.invalidateQueries
                    : [meta.invalidateQueries];

                queriesToInvalidate.forEach((queryKey) => {
                    queryClient.invalidateQueries({ queryKey });
                });
            }
        },
        onError: (error, _variables, _context, mutation) => {
            const meta = mutation?.meta || {};
            const base = meta.errorMessage || "Operation failed";
            toast.error(`${base}: ${getErrorMessage(error)}`);

            // Log error for debugging
            console.error("Mutation Error:", {
                mutation: meta.mutationId,
                error,
            });
        },
    }),
});

/**
 * Query key factory
 * Provides consistent query keys across the application
 */
export const queryKeys = {
    products: {
        all: ["products"],
        byId: (id) => ["products", id],
        byCategory: (category) => ["products", "category", category],
    },
    orders: {
        all: ["orders"],
        byId: (id) => ["orders", id],
        byUser: (userId) => ["orders", "user", userId],
    },
    users: {
        all: ["users"],
        byId: (id) => ["users", id],
    },
};

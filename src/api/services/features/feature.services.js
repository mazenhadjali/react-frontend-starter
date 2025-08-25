import axiosClient from "@/api/axiosClient";
import { FeatureEndpoints } from "@/api/endpoints";

/**
 * Feature management service
 * Handles all feature-related API calls
 */
export const featureService = {
    /**
     * Get all available features
     * @returns {Promise<string[]>} Array of feature names
     */
    async getAllFeatures() {
        const { data } = await axiosClient.get(FeatureEndpoints.getAll());
        return data;
    },
};

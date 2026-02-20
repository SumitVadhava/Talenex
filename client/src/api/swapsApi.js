import api from "./axios";
import { mapBackendToFrontend } from "../utils/mapSwaps";

export const fetchSwaps = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    const response = await api.get('/swap-request', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map(request => mapBackendToFrontend(request));
};

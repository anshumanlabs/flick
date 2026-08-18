const API_BASE_URL = "https://movies-api.accel.li/api/v2";

async function apiClient<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

export default apiClient;
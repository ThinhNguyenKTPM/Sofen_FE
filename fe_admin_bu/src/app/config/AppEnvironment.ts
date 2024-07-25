const MODE = import.meta.env.VITE_MODE;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const config = {
    MODE: MODE,
    API_ENDPOINT: API_ENDPOINT,
    GOOGLE_MAP_API_KEY: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
}
export default config;
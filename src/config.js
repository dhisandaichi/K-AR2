// Configuration for API endpoints
const API_CONFIG = {
    development: {
        baseURL: 'http://localhost:5000',
    },
    production: {
        // Ganti dengan URL backend Anda setelah deploy
        // Contoh: 'https://your-backend.herokuapp.com'
        // atau gunakan backend serverless seperti Vercel, Railway, dll
        baseURL: 'http://localhost:5000', // Sementara untuk testing
    }
};

const getApiURL = () => {
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    return isDevelopment ? API_CONFIG.development.baseURL : API_CONFIG.production.baseURL;
};

export default getApiURL;

const URI = import.meta.env.VITE_API_URL || 'http://localhost:3005/api/';

// Genera headers en un solo lugar
const buildHeaders = (token, isJSON = true) => {
    const headers = {};
    if (isJSON) headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
};

// Manejo centralizado de fetch
const request = async (method, endpoint, payload = null, token = null) => {
    // Para DELETE, generalmente no enviamos Content-Type a menos que haya body
    const isJSON = method !== 'GET' && method !== 'DELETE';

    const config = {
        method,
        headers: buildHeaders(token, isJSON),
    };

    if (payload) {
        config.body = JSON.stringify(payload);
        // Si hay payload en un DELETE, sí necesitamos content-type
        if (method === 'DELETE') config.headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(URI + endpoint, config);

        // 1. Leemos el texto pase lo que pase (para poder ver el error si falla)
        const text = await response.text();
        let data;

        try {
            data = text ? JSON.parse(text) : {};
        } catch (err) {
            data = {};
        }

        // 2. CRÍTICO: Si la respuesta no es OK (200-299), lanzamos error
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || "Ocurrió un error en la petición",
                // Incluimos la info de debug que pusimos en el backend
                debug_info: data.debug_info || null
            };
        }

        return data;

    } catch (error) {
        // Re-lanzamos el error para que lo maneje el componente
        throw error;
    }
};

const get = (endpoint, token = null) => request('GET', endpoint, null, token);
const post = (endpoint, payload, token = null) => request('POST', endpoint, payload, token);
const put = (endpoint, payload, token = null) => request('PUT', endpoint, payload, token);
const remove = (endpoint, token = null) => request('DELETE', endpoint, null, token);

export default { get, post, put, remove };
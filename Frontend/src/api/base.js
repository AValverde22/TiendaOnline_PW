const URI = 'http://localhost:3005/api/';

const get = async (endpoint, token = null) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const objPayload = {
        method: 'GET',
        headers: headers
    };

    return await fetch(URI + endpoint, objPayload)
        .then(response => response.json())
        .then(data => data);
};

// CORRECCIÓN: Ahora acepta 'token' como 3er argumento
const post = async (endpoint, payload, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    
    // Si llega el token, lo metemos en la cabecera
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const objPayload = {
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(payload)
    };

    return await fetch(URI + endpoint, objPayload)
        .then(response => {
            if (response.status === 401) throw { status: 401, message: "No autorizado" };
            return response.json();
        })
        .then(data => data);
};

// CORRECCIÓN: Ahora acepta 'token' como 3er argumento
const put = async (endpoint, payload, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const objPayload = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
    };

    return await fetch(URI + endpoint, objPayload)
        .then(response => {
            if (response.status === 401) throw { status: 401, message: "No autorizado" };
            return response.json();
        })
        .then(data => data);
};

// CORRECCIÓN: Ahora acepta 'token' como 2do argumento
const remove = async (endpoint, token = null) => { 
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const objPayload = {
        method: 'DELETE',
        headers: headers
    };

    return await fetch(URI + endpoint, objPayload)
        .then(response => {
            if (response.status === 401) throw { status: 401, message: "No autorizado" };
            return response.json();
        })
        .then(data => data);
};

const base = { get, post, put, remove };

export default base;
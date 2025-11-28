const URI = 'http://localhost:3005/api/';

const get = async (endpoint, token) => {
    const objPayload = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    }

    return await fetch(URI + endpoint, objPayload)
        .then(response => response.json())
        .then(data => { return data; })
};

const post = async (endpoint, payload) => {
    const objPayload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) // ✅ Correcto: payload viene en los argumentos
    }

    return await fetch(URI + endpoint, objPayload)
        .then(response => response.json())
        .then(data => { return data; })
};

const put = async (endpoint, payload) => {
    const objPayload = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) // ✅ Correcto: payload viene en los argumentos
    }

    return await fetch(URI + endpoint, objPayload)
        .then(response => response.json())
        .then(data => { return data; })
};

// === AQUÍ ESTABA EL ERROR ===
const remove = async (endpoint) => { // 1. Nota que aquí NO recibes payload
    const objPayload = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // 2. BORRÉ LA LÍNEA DEL BODY. 
        // DELETE no necesita cuerpo, el ID ya viaja pegado en 'endpoint'
    }

    return await fetch(URI + endpoint, objPayload)
        .then(response => response.json())
        .then(data => { return data; })
};

const base = { get, post, put, remove };

export default base;
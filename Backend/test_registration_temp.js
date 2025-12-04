
const testRegistration = async () => {
    const data = {
        username: 'testuser_' + Date.now(),
        password: 'password123',
        correo: 'test_' + Date.now() + '@example.com',
        nombre: 'Test',
        apellido: 'User',
        direccion: '123 Test St',
        telefono: '1234567890',
        distrito: 'Test District'
    };

    try {
        const response = await fetch('http://localhost:3005/api/usuarios/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(`STATUS: ${response.status}`);
        console.log('BODY:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
};

testRegistration();

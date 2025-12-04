import usuarioService from './services/usuario.js';
import sequelize from './config/database.js';
import './models/asociaciones.js';

async function testRegistration() {
    try {
        console.log('Testing user registration...');
        const newUser = {
            nombre: 'Test',
            apellido: 'User',
            username: 'testuser_' + Date.now(),
            correo: `test_${Date.now()}@example.com`,
            password: 'password123',
            direccion: '123 Test St',
            telefono: '555-0123',
            distrito: 'Test District'
        };

        const result = await usuarioService.registrar(newUser);

        if (result.success) {
            console.log('✅ User registered successfully:', result.usuario.username);
        } else {
            console.error('❌ Registration failed:', result.message);
        }
    } catch (error) {
        console.error('❌ Error during registration test:', error);
    } finally {
        await sequelize.close();
    }
}

testRegistration();


import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

// Remove sslmode from query params to avoid conflict or just to test
const connectionString = process.env.DATABASE_URL.split('?')[0];

const client = new Client({
    connectionString: connectionString,
    ssl: true // Try simple true
});

async function test() {
    try {
        console.log('Connecting to:', connectionString);
        await client.connect();
        console.log('Connected successfully');
        const res = await client.query('SELECT NOW()');
        console.log(res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Connection error', err);
    }
}

test();

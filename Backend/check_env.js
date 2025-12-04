
import 'dotenv/config';

console.log("Checking DATABASE_URL...");
if (process.env.DATABASE_URL) {
    console.log("URL Found!");
    // Ocultamos la contraseña para seguridad
    const masked = process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@');
    console.log("Value:", masked);

    if (process.env.DATABASE_URL.includes("neon.tech")) {
        console.log("✅ Configured for NEON Database.");
    } else {
        console.log("⚠️ Configured for LOCAL or other Database.");
    }
} else {
    console.log("❌ DATABASE_URL is missing or empty.");
}

import app from './app.js';
import { connectDatabase } from './config/db.js';
import { SERVER_PORT } from './config/serverConfig.js';

// Funzione IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        await connectDatabase();
        console.log('Database connected');

        app.listen(SERVER_PORT, () => {
            console.log(`Server is running on port ${SERVER_PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1); // ferma tutto il processo
    }
})();

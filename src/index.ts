import dotenv from 'dotenv';
dotenv.config();
import { launchBot } from './bot';
import { initDb } from './db';
import server from './server';

initDb().then(() => {
    server.listen(process.env.PORT || 8080, () => {
        launchBot();
        console.log('Bot iniciado');
    })
}).catch((e) => console.log('No pudo conectarse a la db'))

import dotenv from 'dotenv';
dotenv.config();
import { launchBot } from './bot';
import { initDb } from './db';

initDb().then(() => {
    launchBot();
    console.log('Bot iniciado');
}).catch((e) => console.log('No pudo conectarse a la db'))

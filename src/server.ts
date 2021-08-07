import express, { Express } from 'express';
import { bot } from './bot';

const server: Express = express();

server.use(bot.webhookCallback('/wh'))

export default server;
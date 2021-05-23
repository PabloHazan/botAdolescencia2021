import { Telegraf } from "telegraf";
import dotenv from 'dotenv';

dotenv.config();

const bot: Telegraf = new Telegraf(process.env.BOT_TOKEN!);

let counter = 0;

bot.command('start', (context) => {
    context.reply(`Alo alo! Como estas ${context.message.from.first_name}?`);
});

bot.hears('Che', (context) => {
    context.reply(`Perdiste ${counter}`);
    setTimeout(() => {
        context.reply(`Perdiste de nuevo :D`);
    }, 5000)
    counter ++;
});

bot.on('text', (context,) => {
    context.reply('Viva Peron!!! ')// + JSON.stringify(context.message, null, 2))
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


bot.telegram.setWebhook('https://bot-adolescencia-2021.herokuapp.com/wh');
(bot as any).startWebhook('/secret-path', null, process.env.PORT);

bot.launch();

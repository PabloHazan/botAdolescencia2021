import { Telegraf } from "telegraf";

export const bot: Telegraf = new Telegraf(process.env.BOT_TOKEN!);

export const launchBot = () => {
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
    bot.telegram.setWebhook('https://bot-adolescencia-2021.herokuapp.com/wh');
    (bot as any).startWebhook('/secret-path', null, process.env.PORT);
    bot.launch();
}


import { bot } from './bot';

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
    context.reply('Viva Peron!!!')// + JSON.stringify(context.message, null, 2))
})

import { Telegraf, session } from 'telegraf'
import { findNumberInList } from './scenes/findNumberInList';
import { addPlussMultipleValues } from './scenes/plusMultipleValues';
import { addPlussTowValues } from './scenes/plusTwoValues';

export const app = (bot: Telegraf) => {
    bot.use(session());
    addPlussMultipleValues(bot);
    addPlussTowValues(bot);
    findNumberInList(bot);
    
    bot.command('start', (context) => {
        context.reply(`Alo alo! Como estas ${context.message.from.first_name}?`);
        context.answerCbQuery
    });
    
    bot.hears(['Che', 'che'], (context) => {
        context.reply(`Perdiste`);
        setTimeout(() => context.reply(`Perdiste de nuevo :D`), 5000);
    });
    
    bot.on('text', (context,) => {
        context.reply('Viva Peron!!!');
    })
}


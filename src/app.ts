import { plusTwoValues, plusTwoValuesId } from './scenes/plusTwoValues';
import { Telegraf, Scenes, session } from 'telegraf'

export const app = (bot: Telegraf) => {
    bot.use(session())
    bot.use(plusTwoValues as any)
    bot.hears('Suma', Scenes.Stage.enter<any>(plusTwoValuesId));
    
    
    let counter = 0;
    
    bot.command('start', (context) => {
        context.reply(`Alo alo! Como estas ${context.message.from.first_name}?`);
        context.answerCbQuery
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
}


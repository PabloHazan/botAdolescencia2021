import { Telegraf } from 'telegraf'
import { createScene } from '../framework/telegraf.scenes';
import { getSessionState, initSessionState, readNumber } from '../framework/telegraf.utils';

interface IPlusMultipleValuesState {
    plus: number;
    number: number;
    counter: number;
    amount: number;
}

export const addPlussMultipleValues = (bot: Telegraf) => createScene(
    bot,
    'PLUS_MULTIPLE_VALUES',
    ['Suma varios', 'suma varios', 'Suma muchos', 'suma muchos'],
    async context => {
        initSessionState<IPlusMultipleValuesState>(context, {
            plus: 0,
            number: 0,
            counter: 0,
            amount: 0,
        });
        context.reply("¿Cuántos números queres sumar?");
        return context.wizard.next();
    },
    async context => {
        try {
            getSessionState<IPlusMultipleValuesState>(context).amount = readNumber(context);
            if(getSessionState<IPlusMultipleValuesState>(context).amount < 2) return context.reply('Mmm... necesito que por lo menos sea un 2');
        } catch (error) {
            return context.reply('Eso no es un número... ¿Y si mejor probas de nuevo?');
        }
        context.reply(`¡Genial! Empeza a mandarme los ${getSessionState<IPlusMultipleValuesState>(context).amount} números`);
        return context.wizard.next();
    },
    async context => {
        try {
            getSessionState<IPlusMultipleValuesState>(context).number = readNumber(context);
            getSessionState<IPlusMultipleValuesState>(context).plus = getSessionState<IPlusMultipleValuesState>(context).plus + getSessionState<IPlusMultipleValuesState>(context).number;
            getSessionState<IPlusMultipleValuesState>(context).counter ++;
            if (getSessionState<IPlusMultipleValuesState>(context).counter < getSessionState<IPlusMultipleValuesState>(context).amount) return context.reply('¡Otro!');
            context.reply(`Bueno che, la suma total es ${getSessionState<IPlusMultipleValuesState>(context).plus}`);
            return context.scene.leave();
        } catch (error) {
            return context.reply('Eso no es un número...');
        }
    },
)
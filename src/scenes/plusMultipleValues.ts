import { Telegraf } from 'telegraf'
import { createSmartScene } from '../framework/telegraf.scenes';

interface IPlusMultipleValuesState {
    plus: number;
    number: number;
    counter: number;
    amount: number;
}

export const addPlussMultipleValues = (bot: Telegraf) => createSmartScene<IPlusMultipleValuesState>(
    {
        bot,
        sceneId: 'PLUS_MULTIPLE_VALUES',
        words: ['Suma varios', 'suma varios', 'Suma muchos', 'suma muchos']
    },
    ({sendMessage}) => {
        sendMessage('¿Cuántos números queres sumar?');
        return {
            state: {
                plus: 0,
                number: 0,
                counter: 0,
                amount: 0,
            },
            after: 'next',
        }
    },
    ({state, sendMessage, getNumberFromMessage }) => {
        try {
            state.amount = getNumberFromMessage();
            if(state.amount < 2) {
                sendMessage('Mmm... necesito que por lo menos sea un 2');
                return { state };
            }
        } catch (error) {
            sendMessage('Eso no es un número... ¿Y si mejor probas de nuevo?');
            return { state }
        }
        sendMessage(`¡Genial! Empeza a mandarme los ${state.amount} números`);
        return { state, after: 'next' };
    },
    ({ state, sendMessage ,getNumberFromMessage }) => {
        try {
            state.number = getNumberFromMessage();
            state.plus += state.number;
            state.counter ++;
            if (state.counter < state.amount) {
                sendMessage('¡Otro!');
                return { state }
            };
            sendMessage(`Bueno che, la suma total es ${state.plus}`);
            return { state, after: 'leave' };
        } catch (error) {
            sendMessage('Eso no es un número...');
            return { state };
        }
    }
);

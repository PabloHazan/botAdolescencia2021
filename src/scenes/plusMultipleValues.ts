import { Telegraf } from 'telegraf'
import { createSmartScene } from '../framework/telegraf.scenes';

interface IPlusMultipleValuesState {
    plus: number;
    number: number;
    counter: number;
    amount: number;
}

export const addPlussMultipleValues = (bot: Telegraf) => createSmartScene<IPlusMultipleValuesState>(
    bot,
    ['Suma varios', 'suma varios', 'Suma muchos', 'suma muchos'],
    ({sendMessage, setState}) => {
        setState({
            plus: 0,
            number: 0,
            counter: 0,
            amount: 0,
        })
        sendMessage('¿Cuántos números queres sumar?');
        return;
    },
    ({state, sendMessage, getNumberFromMessage }) => {
        try {
            state.amount = getNumberFromMessage();
            if(state.amount < 2) {
                sendMessage('Mmm... necesito que por lo menos sea un 2');
                return 'repeat';
            }
        } catch (error) {
            sendMessage('Eso no es un número... ¿Y si mejor probas de nuevo?');
            return 'repeat';
        }
        sendMessage(`¡Genial! Empeza a mandarme los ${state.amount} números`);
        return;
    },
    ({ state, sendMessage ,getNumberFromMessage }) => {
        try {
            state.number = getNumberFromMessage();
            state.plus += state.number;
            state.counter ++;
            if (state.counter < state.amount) {
                sendMessage('¡Otro!');
                return 'repeat';
            };
            sendMessage(`Bueno che, la suma total es ${state.plus}`);
            return;
        } catch (error) {
            sendMessage('Eso no es un número...');
            return 'repeat';
        }
    },
);

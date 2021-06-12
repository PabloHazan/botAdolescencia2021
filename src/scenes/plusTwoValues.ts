import { Telegraf } from 'telegraf'
import { createSmartScene } from '../framework/telegraf.scenes';

interface IPlusTwoValuesState {
    firstNumber: number;
    secondNumber: number;
}

export const addPlussTowValues = (bot: Telegraf) => createSmartScene<IPlusTwoValuesState>(
    bot,
    ['Suma', 'suma'],
    ({sendMessage, setState}) => {
        sendMessage('Ingresa el primer número');
        setState({
            firstNumber: 0,
            secondNumber: 0,
        });
        return;
    },
    ({ state, sendMessage, getNumberFromMessage }) => {
        state.firstNumber = getNumberFromMessage();
        sendMessage('Ingresa el segundo número');
        return;
    },
    ({ state, sendMessage, getNumberFromMessage }) => {
        state.secondNumber = getNumberFromMessage();
        sendMessage(state.firstNumber + state.secondNumber);
        return;
    }
);
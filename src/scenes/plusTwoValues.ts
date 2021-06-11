import { Telegraf } from 'telegraf'
import { createSmartScene } from '../framework/telegraf.scenes';

interface IPlusTwoValuesState {
    firstNumber: number;
    secondNumber: number;
}

export const addPlussTowValues = (bot: Telegraf) => createSmartScene<IPlusTwoValuesState>(
    {
        bot,
        sceneId: 'PLUS_TWO_VALUES',
        words: ['Suma', 'suma'],
    },
    ({sendMessage}) => {
        sendMessage('Ingresa el primer número');
        return {
            state: {
                firstNumber: 0,
                secondNumber: 0,
            },
            after: 'next',
        };
    },
    ({ state, sendMessage, getNumberFromMessage }) => {
        state.firstNumber = getNumberFromMessage();
        sendMessage('Ingresa el segundo número');
        return { state, after: 'next' };
    },
    ({ state, sendMessage, getNumberFromMessage }) => {
        state.secondNumber = getNumberFromMessage();
        sendMessage(state.firstNumber + state.secondNumber);
        return { state, after: 'leave' };
    }
);
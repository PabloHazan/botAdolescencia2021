import { Telegraf } from "telegraf";
import { createSmartScene } from "../framework/telegraf.scenes";

interface IFindNumberInListState {
    index: number;
    number: number;
    list: Array<number>;
    search: number;
    amount: number;
}

export const findNumberInList = (bot: Telegraf) => createSmartScene<IFindNumberInListState>(
    bot,
    [/^[bB]usca[r]? [nN][uú]mero[s]?$/],
    ({sendMessage, setState}) => {
        setState({
            index: 0,
            number: 0,
            list: [],
            search: 0,
            amount: 0,
        });
        sendMessage('¿Cuántos números tiene que tener la lista?');
    },
    ({getNumberFromMessage, sendMessage, state}) => {
        try {
            state.amount = getNumberFromMessage();
            if(state.amount > 0) {
                sendMessage(`¡De una! vamos a ingresar ${state.amount}
¿Qué número agregamos?`);
                return;
            } else {
                sendMessage('A ver si nos entendemos... tiene que ser un número mayor a 0')
                return 'repeat';
            }
        } catch (error) {
            sendMessage('¿Y si cuando te pido un número te copas y no pones cualquier cosa? Dale... vos podes')
            return 'repeat';
        }
    },
    ({getNumberFromMessage, sendMessage, state}) => {
        try {
            state.number = getNumberFromMessage();
            state.list.push(state.number);
            if(state.list.length < state.amount) {
                sendMessage('¡Pues vale tío! Venga el próximo');
                return 'repeat';
            } else {
                sendMessage('Enhorabuena chabal, cargaste toda la lista, ahora si, que númerito buscamos');
                return;
            }
        } catch (error) {
            sendMessage('Ay que ser cabezón eh. Quiero un número. UN NÚMERO');
            return 'repeat';
        }
    },
    ({getNumberFromMessage, sendMessage, state}) => {
        try {
            state.search = getNumberFromMessage();
            do {
                if (state.list[state.index] === state.search) {
                    sendMessage(`¡Si! Encontre el número ${state.search} en la lista, esta en la posición ${state.index} (acordate que las computadoras somos raras y empezamos a contar desde el 0)`);
                    return;
                } else {
                    state.index ++;
                }
            } while (state.index !== state.list.length);
            sendMessage(`Lamento informarte que el número ${state.search} no esta en la lista`);
            return;
        } catch (error) {
            sendMessage('Buah... que decirte. ¿Y si mejor probas buscando un número en ves de poner cualquier gilada?');
            return 'repeat';
        }
    },
);

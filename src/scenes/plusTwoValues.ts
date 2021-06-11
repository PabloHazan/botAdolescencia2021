import { Telegraf } from 'telegraf'
import { createScene } from '../framework/telegraf.scenes';

// export const plusTwoValuesId = 'PLUS_TWO_VALUES'

// const plusTwoValuesWizard = new Scenes.WizardScene<Scenes.WizardContext>(
//     plusTwoValuesId,
//     async context => {
//         context.reply("Ingresa el primer número");
//         return context.wizard.next();
//     },
//     async context => {
//         (context.wizard.state as any).firstNumber = parseFloat((context.message as any).text);
//         context.reply("Ingresa el segundo número");
//         return context.wizard.next();
//     },
//     async context => {
//         (context.wizard.state as any).secondNumber = parseFloat((context.message as any).text);
//         const {firstNumber, secondNumber} = context.wizard.state as any
//         context.reply(firstNumber + secondNumber);
//         return context.scene.leave();
//     }
// );

// const stage = new Scenes.Stage([plusTwoValuesWizard], { });
// stage.command(['Basta', 'basta'], (ctx) => {
//     ctx.reply("Se cancela la suma");
//     return ctx.scene.leave();
// });

// export const plusTwoValues = stage.middleware();

export const addPlussTowValues = (bot: Telegraf) => createScene(
    bot,
    'PLUS_TWO_VALUES',
    ['Suma', 'suma'],
    async context => {
        context.reply("Ingresa el primer número");
        return context.wizard.next();
    },
    async context => {
        (context.wizard.state as any).firstNumber = parseFloat((context.message as any).text);
        context.reply("Ingresa el segundo número");
        return context.wizard.next();
    },
    async context => {
        (context.wizard.state as any).secondNumber = parseFloat((context.message as any).text);
        const {firstNumber, secondNumber} = context.wizard.state as any
        context.reply(firstNumber + secondNumber);
        return context.scene.leave();
    }
);

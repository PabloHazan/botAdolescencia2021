import { Scenes } from 'telegraf'

export const plusTwoValuesId = 'PLUS_TWO_VALUES'

const plusTowValuesWizard = new Scenes.WizardScene<Scenes.WizardContext>(
    plusTwoValuesId,
    async context => {
        context.reply("Ingresa el primer número");
        return context.wizard.next();
    },
    async context => {
        console.log(JSON.stringify(context.message, null, 2));
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

const stage = new Scenes.Stage([plusTowValuesWizard], { });
stage.command('cancel', (ctx) => {
    ctx.reply("Operation canceled");
    return ctx.scene.leave();
});

export const plusTwoValues = stage.middleware();


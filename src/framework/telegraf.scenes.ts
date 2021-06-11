import { Middleware, Scenes, Telegraf } from "telegraf";
import { WizardContext, WizardSessionData } from "telegraf/typings/scenes";
import { getSessionState, getTextMessage, readNumber, setSessionState } from "./telegraf.utils";

const createScene = (bot: Telegraf, sceneId: string, words: Array<string>, ...steps: Array<Middleware<Scenes.WizardContext>>) => {
    const scene: Scenes.WizardScene<Scenes.WizardContext> = new Scenes.WizardScene<Scenes.WizardContext>(sceneId, ...steps);
    const stage = new Scenes.Stage([scene], { });
    stage.command(['Basta', 'basta'], (ctx) => {
        ctx.reply('¡Dale! Dejamos acá');
        return ctx.scene.leave();
    });
    bot.use(stage.middleware() as any);
    bot.hears(words, Scenes.Stage.enter<any>(sceneId));
}

type AfterStepType = 'next' | 'leave' | 'repeat';

interface OptionalStepDefinitionReturns {
    after?: AfterStepType,
}

interface StepDefinitionReturns<StateType> extends OptionalStepDefinitionReturns {
    state: StateType;
    
}

const optionalStepDefinitionReturns: OptionalStepDefinitionReturns = { 
    after: 'repeat',
}

interface StepDefinitionParams<StateType> {
    sendMessage: (message: string | number) => void;
    getTextFromMessage: () => string;
    getNumberFromMessage: () => number;
    state: StateType,
    setState: (newState: StateType) => void
}

export type StepDefinition<StateType> = (params: StepDefinitionParams<StateType>) => Promise<StepDefinitionReturns<StateType>> | StepDefinitionReturns<StateType>;

const getStepDefinitionParamsFromContext = <StateType>(context: Scenes.WizardContext<Scenes.WizardSessionData>): StepDefinitionParams<StateType> =>  ({
    sendMessage: (message: string | number) => context.reply(String(message)),
    getTextFromMessage: () => getTextMessage(context),
    getNumberFromMessage: () => readNumber(context),
    state: getSessionState<StateType>(context),
    setState: (newState: StateType) => setSessionState<StateType>(context, newState),
})

const createStep: <StateType>(definition: StepDefinition<StateType>) => Middleware<Scenes.WizardContext> = 
    <StateType>(definition: StepDefinition<StateType>):  Middleware<Scenes.WizardContext> => {
        return async (context:  WizardContext<WizardSessionData>) => {
            const params: StepDefinitionParams<StateType> = getStepDefinitionParamsFromContext<StateType>(context);
            const { state, after } = { ...optionalStepDefinitionReturns, ...await definition(params) };
            setSessionState<StateType>(context, state);
            switch (after) {
                case 'repeat': return;
                case 'next': return context.wizard.next();
                case 'leave': context.scene.leave();
            }
        }
    }


interface SmartSceneConfig {
    bot: Telegraf;
    sceneId: string;
    words: Array<string>;
}

export const createSmartScene = <StateType = undefined>(
    {
        bot,
        sceneId,
        words,
    }: SmartSceneConfig,
    ...steps: Array<StepDefinition<StateType>>
) => {
    const sceneSteps = steps.map(createStep);
    return createScene(bot, sceneId, words, ...sceneSteps)
}
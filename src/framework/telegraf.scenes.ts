import { Middleware, Scenes, Telegraf } from "telegraf";

export const createScene = (bot: Telegraf, sceneId: string, words: Array<string>, ...steps: Array<Middleware<Scenes.WizardContext>>) => {
    const scene: Scenes.WizardScene<Scenes.WizardContext> = new Scenes.WizardScene<Scenes.WizardContext>(sceneId, ...steps);
    const stage = new Scenes.Stage([scene], { });
    stage.command(['Basta', 'basta'], (ctx) => {
        ctx.reply("Oka! Cortamos");
        return ctx.scene.leave();
    });
    bot.use(stage.middleware() as any);
    bot.hears(words, Scenes.Stage.enter<any>(sceneId));
}
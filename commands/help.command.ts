import Bot from '../bot.component';
export default class HelpCommand {
    constructor(msg: any) {
        let bot = new Bot();
        bot.delete(msg, 2000);
        bot.reply(msg, 5, 20000);
    }
}
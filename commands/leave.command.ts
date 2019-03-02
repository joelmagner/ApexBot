import Bot from '../bot.component';
export default class LeaveCommand {
    constructor(msg: any, guild: any) {
        msg.delete();
        guild.queue = [];
        let bot = new Bot();
        if (guild.voiceChannel) {
            bot.reply(msg, 6, 5000);
            guild.voiceChannel.leave();
        } else {
            bot.reply(msg, -1, 5000);
        }
    }
}

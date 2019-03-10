import Bot from '../bot.component';
export default class LeaveCommand {
    constructor(msg: any, guild: any) {
        guild.queue = [];
        guild.queueNames = [];
        let bot = new Bot();
        if (guild.voiceChannel) {
            bot.reply(msg, 6, 5000);
            guild.voiceChannel.leave();
            guild.voiceChannel = null;
            guild.skipList = [];
            guild.skipRequest = 0;
            guild.isPlaying = false;
        } else {
            bot.reply(msg, -1, 5000);
        }
    }
}
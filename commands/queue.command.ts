import Bot from "../bot.component";

export default class QueueCommand {
    constructor(guild: any, msg: any) {
        var songInfo = "\n:notes: Music queue\n";
        const bot = new Bot();
        for (var i = 0; i < guild.queueNames.length; i++) {
            var temp = `\`${(i + 1)}\`` + ": " + `\`${guild.queueNames[i]}\`` + (i === 0 ? " \`🔊 (Now Playing)\`" : "") + "\n";
            if ((songInfo + temp).length <= 2000 - 3) {
                songInfo += temp;
            } else {
                bot.message(msg, songInfo + " \n<><><>", 5000);
            }
        }
        guild.queueNames.length > 0 ? bot.replyWith(msg, songInfo, 5000) : bot.replyWith(msg, ":warning: There are no songs in the queue", 5000);
    }
}
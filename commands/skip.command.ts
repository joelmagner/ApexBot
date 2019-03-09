import Bot from '../bot.component';
export default class SkipCommand {

    constructor(msg: any, guild: any) {
        let bot = new Bot();
        bot.delete(msg);
        const skip = msg.author.id;
        if(!guild.isPlaying){
            bot.replyWith(msg, "Bot isn't playing anything... nothing to skip", 5000);
            return;
        }
        if (guild.skipList.indexOf(skip === -1)) {
            guild.skipList.push(skip);
            guild.skipRequest++;
            var calc = Math.ceil(((guild.voiceChannel.members.size - 1) / 2)); // -1 för att kompensera för botten
            if (guild.skipRequest >= calc == undefined ? 1 : calc) {
                this.skipSong(guild);
                bot.replyWith(msg,"`skipping song...`", 5000);
            } else {
                let calc = Math.ceil((guild.voiceChannel.members.size - 1) / 2) - guild.skipRequest;
                bot.replyWith(msg,"you placed your vote. You need **" + calc + "** more people to [`skip`] this song",5000);
            }
        } else {
            bot.reply(msg, 2).then((del: any) => del.delete(5000));
        }
    }

    skipSong(guild: any) {
        guild.dispatcher.end();
    }
}
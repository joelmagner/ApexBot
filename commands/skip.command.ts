import Bot from '../bot.component';
import PlayCommand from './play.command';
export default class SkipCommand {

    constructor(msg: any, guild: any) {
        let bot = new Bot();
        bot.delete(msg);
        const skip = msg.author.id;
        if (guild.skipList.indexOf(skip === -1)) {
            guild.skipList.push(skip);
            guild.skipRequest++;
            var calc = Math.ceil(((guild.voiceChannel.members.size - 1) / 2)); // -1 för att kompensera för botten
            if (guild.skipRequest >= calc == undefined ? 1 : calc) {
                this.skipSong(msg, guild);
                msg.reply(" Skipping song").then((del: any) => del.delete(5000));
            } else {
                let calc = Math.ceil((guild.voiceChannel.members.size - 1) / 2) - guild.skipRequest;
                msg.reply("Du behöver lide fler fölk för o [skippa] låten **" + calc + "**").then((del: any) => del.delete(5000));
            }
        } else {
            bot.reply(msg, 2).then((del: any) => del.delete(5000));
        }
    }

    skipSong(msg: any ,guild: any) {
        guild.dispatcher.end();
        if (guild.queue.length > 0) {
            const music = new PlayCommand();
            music.playMusic(guild.queue[0], msg, guild);
        } 
    }
}
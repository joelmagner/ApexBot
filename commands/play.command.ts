
import Bot from '../bot.component';
import MusicHelper from '../helpers/music.helper';
import MoveMessage from '../helpers/move.helper';
import Settings from '../models/settings.model';
import { getInfo } from "ytdl-getinfo";
export default class PlayCommand {
    private ytdl: any = require("ytdl-core");
    private getInfo: any = getInfo;

    musicConfig(member: any, guild: any, args: any, client: any, msg: any, settings: Settings) {
        const bot = new Bot();
        const helper = new MusicHelper();
        if (msg.member.voiceChannel || guild.voiceChannel != null) {
            guild.voiceChannel = member.voiceChannel;
            if (guild.queue.length > 0 || guild.isPlaying) {
                this.notPlaying(guild, helper, args, msg, settings, client, bot);
            } else {
                guild.isPlaying = true;
                this.isPlaying(helper, args, guild, msg, settings, client, bot);
            }
        } else {
            bot.reply(msg, 4, 5000);
        }
    }

    isPlaying(helper: MusicHelper, args: any, guild: any, msg: any, settings: Settings, client: any, bot: Bot) {
        helper.getID(args, (url: string) => {
            this.playMusic(url, msg, guild);
            helper.addToQueue(url, guild);
            this.getInfo(url).then((info: any) => {
                const title = info.items[0].title;
                guild.queueNames.push(title);
                new MoveMessage(client, msg, "🎵 **" + title + "**", guild);
            }).catch((error: any) => console.log("Error isPlaying-> getInfo(): ", error));
        }, settings);
    }

    notPlaying(guild: any, helper: MusicHelper, args: any, msg: any, settings: Settings, client: any, bot: Bot) {
        helper.getID(args, (url: string) => {
            helper.addToQueue(url, guild);
            this.getInfo(url).then((info: any) => {
                const title = info.items[0].title;
                guild.queueNames.push(title);
                new MoveMessage(client, msg, "lägger till **" + title + "** i kön", guild);
            }).catch((error: any) => console.log("Error notPlaying-> getInfo(): ", error));
        }, settings);
    }

    playMusic(url: any, message: any, guild: any) {
        const settings = new Settings();
        guild.voiceChannel = message.member.voiceChannel;
        guild.voiceChannel.join().then((connect: any) => {
            let audioStream = this.ytdl(settings.yt_generic + url, {
                filter: "audioonly",
                volume: 0.03
            });
            guild.skipRequest = 0;
            guild.skipList = []; //allow users to skip new song
            guild.dispatcher = connect.playStream(audioStream);
            guild.dispatcher.setVolume(0.03); // set volume
            guild.dispatcher.on("end", () => {
                guild.skipRequest = 0;
                guild.skipList = [];
                guild.queue.shift();
                guild.queueNames.shift();
                if (guild.queue.length === 0) {
                    guild.queue = [];
                    guild.queueNames = [];
                    guild.isPlaying = false;
                } else {
                    setTimeout(() => {
                        this.playMusic(guild.queue[0], message, guild);
                    }, 600);
                }
            });
        }).catch((error: any) => console.log(`Err playMusic() => url: ${url}\nerror: ${error}`));
    }
}
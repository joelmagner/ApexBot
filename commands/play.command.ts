
import Bot from '../bot.component';
import MusicHelper from '../helpers/music.helper';
import MoveMessage from '../helpers/move.helper';
import Settings from '../models/settings.model';

export default class PlayCommand {
    private fetchVideoInfo: any = require("youtube-info");
    private ytdl: any = require("ytdl-core");

    musicConfig(member: any, guild: any, args: any, client: any, msg: any, settings: Settings) {
        const bot = new Bot();
        const helper = new MusicHelper();
        if (msg.member.voiceChannel || guild.voiceChannel != null) {
            guild.voiceChannel = member.voiceChannel;
            if (guild.queue.length > 0 || guild.isPlaying) {
                this.notPlaying(guild, helper, args, msg,settings, client, bot);
            } else {
                guild.isPlaying = true;
                this.isPlaying(helper, args, guild, msg,settings, client, bot);
            }
        } else {
            bot.delete(msg);
            bot.reply(msg, 4, 5000);
        }
    }

    isPlaying(helper:MusicHelper, args: any, guild:any, msg:any, settings:Settings, client:any, bot:Bot){
        helper.getID(args, (url: string) => {
            guild.queue.push(url);
            this.playMusic(url, msg, guild);
            helper.addToQueue(url, guild);
            this.fetchVideoInfo(url).then((videoInfo: any) => {
                guild.queueNames.push(videoInfo.title);
                new MoveMessage(client, msg, "🎵 **" + videoInfo.title + "**");
            }).catch((error: any) => { console.log("Error: rad 36", error) });
        }, settings);
        bot.delete(msg);
    }

    notPlaying(guild:any, helper:MusicHelper, args: any, msg:any, settings:Settings, client: any, bot:Bot){
            helper.getID(args, (url: string) => {
                helper.addToQueue(url, guild);
                this.fetchVideoInfo(url).then((videoInfo: any) => {
                    guild.queueNames.push(videoInfo.title);
                    new MoveMessage(client, msg, " lägger till **" + videoInfo.title + "** i kön");
                }).catch((error: any) => { console.log("Error: rad 47", error) });
            }, settings);
            bot.delete(msg);
    }

    playMusic(url: any, message: any, guild: any) {
        const settings = new Settings();
        guild.voiceChannel = message.member.voiceChannel;
        guild.voiceChannel.join().then((connect: any) => {
            let audioStream = this.ytdl(settings.yt_generic + url, {
                filter: "audioonly",
                volume: 0.02
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
                        guild.queue.shift();
                        this.playMusic(guild.queue[0], message, guild);
                    }, 900);
                }
            });
        });
    }
}
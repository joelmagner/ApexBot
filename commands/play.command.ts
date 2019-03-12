
import Bot from '../bot.component';
import MusicHelper from '../helpers/music.helper';
import MoveMessage from '../helpers/move.helper';
import Settings from '../models/settings.model';
import * as ytdl from "ytdl-core";
import { getInfo } from "ytdl-getinfo";
export default class PlayCommand {
    private ytdl: any = ytdl;
    private getInfo: any = getInfo;

    n(n: number) {
        return n.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    }

    musicConfig(member: any, guild: any, args: any, msg: any, settings: Settings) {
        const bot = new Bot();
        const helper = new MusicHelper();
        if (msg.member.voiceChannel || guild.voiceChannel != null) {
            guild.voiceChannel = member.voiceChannel;
            if (guild.queue.length > 0 || guild.isPlaying) {
                this.queueSong(guild, helper, args, msg, settings);
            } else {
                guild.isPlaying = true;
                this.playSong(helper, args, guild, msg, settings);
            }
        } else {
            bot.reply(msg, 4, 5000);
        }
    }

    playSong(helper: MusicHelper, args: any, guild: any, msg: any, settings: Settings) {
        helper.getID(args, (url: string) => {
            this.musicPlayer(url, msg, guild);
            helper.addToQueue(url, guild);
            this.getInfo(url).then((info: any) => {
                const title = info.items[0].title;
                const duration = info.items[0].duration;
                const minutes = Math.floor(duration / 60);
                const seconds = duration - minutes * 60;
                guild.queueNames.push(title);
                new MoveMessage(msg, ":lion_face: "+`\`[${this.n(minutes)}`+":"+`${this.n(seconds)}]\``+" :fast_forward: **" + `\`${title}\`` + "**", guild);
            }).catch((error: any) => console.log("Error isPlaying-> getInfo(): ", error));
        }, settings);
    }

    queueSong(guild: any, helper: MusicHelper, args: any, msg: any, settings: Settings) {
        helper.getID(args, (url: string) => {
            helper.addToQueue(url, guild);
            this.getInfo(url).then((info: any) => {
                const title = info.items[0].title;
                const duration = info.items[0].duration;
                const minutes = Math.floor(duration / 60);
                const seconds = duration - minutes * 60;
                guild.queueNames.push(title);
                new MoveMessage(msg, ":lion_face: Added "+`\`[${this.n(minutes)}`+":"+`${this.n(seconds)}]\``+" :fast_forward: **" + `\`${title}\`` + "** to the queue", guild);
            }).catch((error: any) => console.log("Error notPlaying-> getInfo(): ", error));
        }, settings);
    }

    musicPlayer(url: any, message: any, guild: any) {
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
                        this.musicPlayer(guild.queue[0], message, guild);
                    }, 600);
                }
            });
        }).catch((error: any) => console.log(`Err musicPlayer() => url: ${url}\nerror: ${error}`));
    }
}

import * as fs from "fs";
import HelpCommand from "./commands/help.command";
import PlayCommand from "./commands/play.command";
import SkipCommand from "./commands/skip.command";
import LeaveCommand from "./commands/leave.command";
import ClearCommand from "./commands/clear.command";
import CleanupCommand from "./commands/cleanup.command";
import QuoteCommand from "./commands/quote.command";
import QueueCommand from "./commands/queue.command";
import Settings from './models/settings.model';
import * as discord from "discord.js";

// https://discordapp.com/oauth2/authorize?client_id=550368724851490816&scope=bot&permissions=8
export default class ApexBot {

    private client: any = new discord.Client();
    private guilds: any = {};
    private guild!: any | discord.Guild;
    constructor() { this.startBot(); }

    private initSettings(filename: string, encoding: string): Settings { return JSON.parse(fs.readFileSync(filename, encoding)); }

    private login(): Settings {
        var settings = this.initSettings("./settings.json", "UTF-8");
        this.client.login(settings.discord_token);
        return settings;
    }

    private async startBot() {
        const settings = this.login();
        this.client.on("message", async (msg: discord.Message) => {
            const member: discord.GuildMember = await msg.member;
            const mess: string = await msg.content.toLowerCase();
            const args = await msg.content.split(' ').slice(1).join(" ");
            const arg = await msg.content.slice(settings.prefix.length).split(" ").slice(1); // useful to get value from eg. §clear <amount>


            if (!this.guilds[msg.guild.id]) {
                this.guild = this.guilds[msg.guild.id] = {
                    queue: [],
                    queueNames: [],
                    isPlaying: false,
                    dispatcher: null,
                    voiceChannel: null,
                    skipRequest: 0,
                    skipList: []
                    // TODO: add customization to: botchannel && prefix / guild && custom role.
                }
            }

            let input = mess.split(' ')[0];
            let prefix = settings.prefix;
            switch (input) {
                case prefix + "play":
                case prefix + "spela":
                    const music = new PlayCommand();
                    music.musicConfig(member, this.guild, args, this.client, msg, settings);
                    break;
                case prefix + "skip":
                case prefix + "skippa":
                    new SkipCommand(msg, this.guild);
                    break;
                case prefix + "leave":
                case prefix + "stick":
                    new LeaveCommand(msg, this.guild);
                    break;
                case prefix + "clear":
                    new ClearCommand(msg, arg);
                    break;
                case prefix + "clearbot":
                    new CleanupCommand(msg, arg);
                    break;
                case prefix + "quote":
                case prefix + "citat":
                    new QuoteCommand(this.client, msg);
                    break;
                case prefix + "help":
                case prefix + "info":
                case prefix + "hjälp":
                    new HelpCommand(msg);
                    break;
                case prefix + "queue":
                    new QueueCommand(this.guild, msg);
                    break;
                default:
                    console.log("Invalid input!", input);
                    break;
            }
        });

        this.client.on("ready", () => {
            console.log("Bot Running...");
        });
    }
}
new ApexBot();

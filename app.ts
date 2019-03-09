
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
import Metadata from "./helpers/metadata.helper";
import Bot from "./bot.component";
import Prefix from "./commands/prefix.command";
import Permission from "./helpers/permission.helper";
import RoleCommand from "./commands/role.command";
import BotChannel from "./commands/botchannel.command";

// https://discordapp.com/oauth2/authorize?client_id=550368724851490816&scope=bot&permissions=8
export default class ApexBot {

    private client: any = new discord.Client();
    private guilds: any = {};
    private guild!: any | discord.Guild;
    private metadata: Metadata = new Metadata();
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

            if (!this.guilds[msg.guild.id]) {
                this.guild = this.guilds[msg.guild.id] = {
                    queue: [],
                    queueNames: [],
                    isPlaying: false,
                    dispatcher: null,
                    voiceChannel: null,
                    skipRequest: 0,
                    skipList: [],
                    // TODO: add customization to: botchannel && prefix / guild && custom role.
                    botChannel: settings.bot_channel || null,
                    botRole: settings.bot_role || null,
                    adminRole: settings.bot_role || null,
                    prefix: settings.prefix || null
                }
            }
            const member: discord.GuildMember = await msg.member;
            const mess: string = await msg.content.toLowerCase();
            const args = await msg.content.split(' ').slice(1).join(" ");
            const arg = await msg.content.slice(this.metadata.getPrefix(this.guild).length || 1).split(" ").slice(1); // useful to get value from eg. §clear <amount>


            let input = mess.split(' ')[0];
            let prefix = this.metadata.getPrefix(this.guild);
            switch (input) {
                case prefix + "play":
                    new Bot().delete(msg, 5000);
                    new PlayCommand().musicConfig(member, this.guild, args, this.client, msg, settings);
                    break;
                case prefix + "skip":
                    new SkipCommand(msg, this.guild);
                    break;
                case prefix + "leave":
                    new LeaveCommand(msg, this.guild);
                    break;
                case prefix + "clear":
                    new ClearCommand(msg, arg, this.guild);
                    break;
                case prefix + "clearbot":
                    new CleanupCommand(msg, arg, this.guild);
                    break;
                case prefix + "quote":
                case prefix + "citat":
                    new Bot().delete(msg, 5000);
                    new QuoteCommand(this.client, msg, this.guild);
                    break;
                case prefix + "help":
                case prefix + "info":
                    new Bot().delete(msg, 5000);
                    new HelpCommand(msg, this.guild);
                    break;
                case prefix + "queue":
                    new Bot().delete(msg, 5000);
                    new QueueCommand(this.guild, msg);
                    break;
                case prefix + "setprefix":
                    if(new Permission().hasElevatedPermission(msg, args, this.guild)){
                        new Prefix().set(this.guild, msg, args);
                    }
                    break;
                case prefix + "setbotrole":
                    if(new Permission().hasElevatedPermission(msg, args, this.guild)){
                        new RoleCommand().setBotRole(this.guild, msg, args);
                    }
                    break;
                case prefix + "setadminrole": 
                    if(new Permission().hasAdminRole(msg, arg, this.guild)){
                        new RoleCommand().setAdminRole(this.guild, msg, args);
                    }
                    new Permission().denied(msg, this.guild, new RoleCommand().getBotRole(this.guild));
                    break;
                case prefix + "setbotchannel":
                    if(new Permission().hasElevatedPermission(msg, args, this.guild)){
                        new Bot().message(msg,`\`WARNING\`: You have changed the botchannel to: \`${args}\``);
                        new BotChannel().set(this.guild, args);
                    }
                    new Permission().denied(msg, this.guild, new RoleCommand().getBotRole(this.guild));
                    break;    
                default:
                    break;
            }
        });

        this.client.on("ready", () => {
            console.log("Bot Running...");
        });
    }
}
new ApexBot();

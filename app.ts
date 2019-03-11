
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
import SettingsCommand from "./commands/settings.command";
import Menu from "./helpers/menu.helper";
import Guild from "./helpers/guild.helper";

// https://discordapp.com/oauth2/authorize?client_id=550368724851490816&scope=bot&permissions=8
export default class MufasaBot {

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
                this.guild = new Guild(this.guilds, msg, settings);
            }
            const member: discord.GuildMember = await msg.member;
            const mess: string = await msg.content.toLowerCase();
            const args = await msg.content.split(' ').slice(1).join(" ");
            const arg = await msg.content.slice(this.metadata.getPrefix(this.guild).length || 1).split(" ").slice(1); // useful to get value from eg. §clear <amount>
            new Menu(this.guild, mess, msg, args, arg, member, settings, this.metadata);

        });

        this.client.on("ready", () => {
            console.log("Bot Running...");
        });
    }
}
new MufasaBot();

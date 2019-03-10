import Metadata from "./metadata.helper";
import BotChannel from '../commands/botchannel.command';
import Permission from './permission.helper';
import Bot from "../bot.component";
import PlayCommand from "../commands/play.command";
import SkipCommand from "../commands/skip.command";
import LeaveCommand from "../commands/leave.command";
import ClearCommand from "../commands/clear.command";
import CleanupCommand from "../commands/cleanup.command";
import QuoteCommand from "../commands/quote.command";
import HelpCommand from "../commands/help.command";
import SettingsCommand from "../commands/settings.command";
import QueueCommand from "../commands/queue.command";
import Prefix from "../commands/prefix.command";
import RoleCommand from "../commands/role.command";
import Settings from '../models/settings.model';
import * as discord from "discord.js";

export default class Menu {
    constructor(guild: any, mess: string, msg: discord.Message, args: string, arg: any, member: any, settings: Settings, metadata:Metadata, ){

        let input = mess.split(' ')[0];
        let prefix = metadata.getPrefix(guild);
        if(input.startsWith(guild.oldPrefix)){new Bot().replyWith(msg, `\`NOTE\`: The prefix has been changed to: \`${prefix}\``,10000);}
        switch (input) {
            case prefix + "play":
                new Bot().delete(msg, 5000);
                new PlayCommand().musicConfig(member, guild, args, msg, settings);
                break;
            case prefix + "skip":
                new Bot().delete(msg, 5000);
                new SkipCommand(msg, guild);
                break;
            case prefix + "leave":
                new Bot().delete(msg, 5000);
                new LeaveCommand(msg, guild);
                break;
            case prefix + "clear":
                new Bot().delete(msg, 5000);
                new ClearCommand(msg, arg, guild);
                break;
            case prefix + "clearbot":
                new Bot().delete(msg, 5000);
                new CleanupCommand(msg, arg, guild);
                break;
            case prefix + "quote":
            case prefix + "citat":
                new Bot().delete(msg, 5000);
                new QuoteCommand(msg, guild);
                break;
            case prefix + "help":
            case prefix + "info":
                new Bot().delete(msg, 5000);
                new HelpCommand(msg, guild);
                break;
            case prefix + "settings":
                new Bot().delete(msg, 5000);
                new SettingsCommand(msg, guild);
                break;
            case prefix + "queue":
                new Bot().delete(msg, 5000);
                new QueueCommand(guild, msg);
                break;
            case prefix + "setprefix":
                if(new Permission().hasElevatedPermission(msg, args, guild)){
                    new Prefix().set(guild, msg, args);
                }
                break;
            case prefix + "setbotrole":
                if(new Permission().hasElevatedPermission(msg, args, guild)){
                    new RoleCommand().setBotRole(guild, msg, args);
                }
                break;
            case prefix + "setadminrole": 
                if(new Permission().hasAdminRole(msg, arg, guild)){
                    new RoleCommand().setAdminRole(guild, msg, args);
                }
                break;
            case prefix + "setbotchannel":
                if(new Permission().hasElevatedPermission(msg, args, guild)){
                    new BotChannel().set(guild, msg, args);
                }
                break;    
            default:
                break;
        }
    }
}
import * as fs from "fs";
import Settings from "../models/settings.model";
import Prefix from "../commands/prefix.command";
import BotRole from "../commands/botrole.command";
import BotChannel from "../commands/botchannel.command";
export default class Metadata {

    //todo: create str to lower compare func between guild.obj and standard value.
    public getAppVersion(): string {
        return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).version;
    }
    public getAuthor(): string {
        return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).author;
    }
    public getBotChannel(guild: any): string {
        return new BotChannel().get(guild);
    }
    public setBotChannel(guild: any, name: string) {
        return new BotChannel().set(guild, name);
    }
    public getRoleName(guild: any): string {
        return new BotRole().get(guild);
    }
    public setRoleName(guild: any, role: string) {
        return new BotRole().set(guild, role);
    }
    public getPrefix(guild: any): string {
        return new Prefix().get(guild);
    }
    public setPrefix(guild: any, prefix: string) {
        return new Prefix().set(guild, prefix);
    }
}
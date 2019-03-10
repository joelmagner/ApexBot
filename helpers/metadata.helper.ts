import * as fs from "fs";
import Prefix from "../commands/prefix.command";
import RoleCommand from "../commands/role.command";
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
    public setBotChannel(guild: any, msg: any, name: string) {
        return new BotChannel().set(guild, msg, name);
    }
    public getBotRole(guild: any): string {
        return new RoleCommand().getBotRole(guild);
    }
    public setBotRole(guild: any, msg: any, role: string) {
        return new RoleCommand().setBotRole(guild, msg, role);
    }
    public getAdminRole(guild: any): string {
        return new RoleCommand().getAdminRole(guild);
    }
    public setAdminRole(guild: any, msg: any, name: string) {
        return new RoleCommand().setAdminRole(guild, msg, name);
    }
    public getPrefix(guild: any): string {
        return new Prefix().get(guild);
    }
    public setPrefix(guild: any, msg: any, prefix: string) {
        return new Prefix().set(guild, msg, prefix);
    }
}
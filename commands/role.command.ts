import * as discord from "discord.js";
import Bot from "../bot.component";

export default class RoleCommand {

    getBotRole(guild: any): string {
        return guild.botRole;
    }
    getAdminRole(guild: any): string {
        return guild.adminRole;
    }
    setBotRole(guild: any, msg: discord.Message, name: string) {
        if(this.validRole(guild, msg, name)){
            if (guild.adminRole === null) { // setting adminRole = botRole until its manually set.
                guild.adminRole = name;
            }
            new Bot().replyWith(msg, `\`WARNING\`: You have changed the admin role to: \`${name}\``);
            return guild.botRole = name;
        } else {
            new Bot().replyWith(msg, `\`FAILED\`: This is not an exisiting role. You must create the \`${name}\` role first.`, 5000);
        }
    }
    setAdminRole(guild: any, msg: any, name: any) {
        if(this.validRole(guild, msg, name)){
            new Bot().replyWith(msg, `\`WARNING\`: You have changed the bot role to: \`${name}\``);
            return guild.adminRole = name;
        } else {
            new Bot().replyWith(msg, `\`FAILED\`: This is not an exisiting role. You must create the \`${name}\` role first.`, 5000);
        }
    }

    validRole(guild:discord.Guild, msg: discord.Message, roleName: string){
        guild.roles.forEach(role => {
            if(role.name.toLowerCase() == roleName.toLowerCase()){
                return true;
            }
        });
        return false;
    }
}
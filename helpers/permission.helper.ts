import Metadata from "./metadata.helper";
import Bot from "../bot.component";
import *  as discord from "discord.js";

export default class Permission {

    //check permissions
    hasBotRole(msg: any, arg: any, guild: any):boolean {
        const metadata = new Metadata();
        if(this.validRequest(msg, arg)){
            let hasRole: boolean = false;
            msg.member.roles.forEach((role: any) => {
                hasRole = role.name.toLowerCase() == metadata.getBotRole(guild).toLowerCase() ? true : false;
            });
            return hasRole;
        } else {
            new Bot().replyWith(msg, `\`FAILED\`: You do not have the role: \`${metadata.getBotRole(guild)}\``);
            return false;
        }
    }
    hasAdminRole(msg: discord.Message, arg: any, guild: discord.Guild){
        const metadata = new Metadata();
        if(this.validRequest(msg, arg)){
            let adminRole: boolean = false;
            msg.member.roles.forEach((role: any) => {
                adminRole = role.name.toLowerCase() == metadata.getAdminRole(guild).toLowerCase() ? true : false;
            });
            return adminRole;
        } else {
            new Bot().replyWith(msg, `\`FAILED\`: You do not have the role: \`${metadata.getAdminRole(guild)}\``);
            return false;
        }
    }
    hasElevatedPermission(msg: discord.Message, arg: string, guild: discord.Guild){
        if(!this.validRequest(msg,arg)){
            return false;
        }
        const metadata = new Metadata();
        const botRole = metadata.getBotRole(guild);
        const adminRole = metadata.getAdminRole(guild);
        let permission: boolean = false;
        msg.member.roles.forEach((role) => {
            if(role.name.toLowerCase() == (botRole || adminRole)){
                permission = true;
            }
        });
        new Bot().replyWith(msg, `You do not have sufficient permissions to use this command`, 5000);
        return permission;
    }

    denied(msg: any, guild: any, roleName: string){
        const bot = new Bot();
        bot.message(msg, `You need the \`${roleName}\` role to use this command.`,5000);
    }

    // validation
    validRequest(msg: any, arg: any): boolean{
        if (!arg[0]) {
            const bot = new Bot();
            bot.message(msg, '\n `Incorrect usage!` Please specify a value', 5000);
            return false;
        }
        return true;
    }
}
import Bot from "../bot.component";

export default class Prefix {

    get(guild: any){
        return guild.prefix;
    }
    set(guild: any, msg: any, prefix: string){
        if(this.validPrefix(prefix)){
            new Bot().message(msg,`\`WARNING\`: You have changed the prefix to: \`${prefix}\``);
            return guild.prefix = prefix;
        } else {
            new Bot().message(msg,`\`FAILED\`: You have tried to assign an invalid prefix: \`${prefix}\``);
        }
    }

    validPrefix(prefix: string){
        if(prefix.length == 1){
            return true;
        } else{
            return false;
        }
    }
}
import * as discord from "discord.js";
import Bot from "../bot.component";
export default class BotChannel {

    get(guild: any): string {
        return guild.botChannel;
    }

    set(guild: any, msg: discord.Message, name: string) {
        if(this.validChannel(msg, name)){
            new Bot().replyWith(msg, `\`WARNING\`: You have changed the botchannel to: \`${name}\``, 5000);
            return guild.botChannel = name;
        } else {
            new Bot().replyWith(msg, `\`FAILED\`: This is not an exisiting channel. You must create the channel \`${name}\` first.`, 5000);
        }
    }

    validChannel(msg: discord.Message, channelName: string){
        let findChannel = false;
        msg.guild.channels.forEach(channel => {
            if(channel.type == "text" && channel.name.toLowerCase() == channelName.toLowerCase()){
                findChannel = true;
            }
        });
        return findChannel;
    }
}
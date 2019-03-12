import Bot from "../bot.component";
import Metadata from './metadata.helper';
import * as discord from 'discord.js';
export default class MoveMessage {
    constructor(msg: any, cmsg: string | string[], guild: discord.Guild) {
        let metadata = new Metadata();
        if (msg.channel.name.toLowerCase() != new Metadata().getBotChannel(guild).toLowerCase()) {
            let bot = new Bot();
            bot.reply(msg, 1, 5000);
        }
        let botChannel: string = "";
        msg.guild.channels.forEach((channel:any) => {
            if (channel.type == "text" && channel.name.toLowerCase() == new Metadata().getBotChannel(guild).toLowerCase()) {
                botChannel = channel.id;
            }
        });
        let mention: any;
        msg.member.roles.forEach((role: any) => {
            role.name.toLowerCase() == metadata.getBotRole(guild).toLowerCase() ? mention = msg.author.username : mention = msg.author;
        });

        let match = msg.guild.channels.get(botChannel);
        const embedMsg = new discord.RichEmbed()
            .setDescription(`${mention} ${cmsg}`)
            .setColor(60927);
        if (match) { match.send(embedMsg); }
    }

}
import Bot from "../bot.component";
import Metadata from './metadata.helper';
import BotChannel from "../commands/botchannel.command";

export default class MoveMessage{
    constructor(client: any, msg: any, cmsg: string, guild: any){
        let metadata = new Metadata();

        if (msg.channel.name.toLowerCase() != new Metadata().getBotChannel(guild).toLowerCase()) {
            let bot = new Bot();
            bot.reply(msg, 1, 5000);
        }
            client.guilds.forEach((server: any) => {
                let botChannel: any;
                server.channels.forEach((channel: any) => {
                    if (channel.type == "text" && channel.name.toLowerCase() == new Metadata().getBotChannel(guild)) {
                        botChannel = channel.id;
                    }
                });
                let mention: any;
                msg.member.roles.forEach((role: any) => {
                    role.name == metadata.getRoleName(guild) ? mention = msg.author.username : mention = msg.author;
                });
                let match = client.channels.get(botChannel);
                if (match) { match.send(`${mention} ${cmsg}`); }
            });

    }

}
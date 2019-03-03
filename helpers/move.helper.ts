import Bot from "../bot.component";
import Metadata from './metadata.helper';

export default class MoveMessage{
    constructor(client: any, msg: any, cmsg: string){
        const metadata = new Metadata();
        if (msg.channel.name !== metadata.getBotChannel()) {
            let bot = new Bot();
            bot.delete(msg);
            bot.reply(msg, 1, 5000);
        }
            client.guilds.forEach((guild: any) => {
                let botChannel: any;
                guild.channels.forEach((channel: any) => {

                    if (channel.type == "text" && channel.name.toLowerCase() == metadata.getBotChannel()) {
                        botChannel = channel;
                    }
                });
                let mention: any;
                msg.member.roles.forEach((role: any) => {
                    role.name == metadata.getRoleName() ? mention = msg.author.username : mention = msg.author;
                });
                let match = client.channels.get(botChannel.id);
                if (match) { match.send(`${mention} ${cmsg}`); }
            });

    }

}
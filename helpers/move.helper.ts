import Bot from "../bot.component";

export default class MoveMessage{
    constructor(client: any, msg: any, cmsg: string){
        if (msg.channel.name !== "botspam") {
            let bot = new Bot();
            bot.delete(msg);
            bot.reply(msg, 1, 5000);
        }
            client.guilds.forEach((guild: any) => {
                let botChannel: any;
                guild.channels.forEach((channel: any) => {
                    if (channel.type == "text" && channel.name.toLowerCase() == "botspam") {
                        botChannel = channel;
                    }
                });
                let mention: any;
                msg.member.roles.forEach((role: any) => {
                    role.name == "BOT" ? mention = msg.author.username : mention = msg.author;
                });
                let match = client.channels.get(botChannel.id);
                if (match) { match.send(`${mention} ${cmsg}`); }
            });

    }

}
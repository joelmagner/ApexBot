import Bot from "../bot.component";
import * as discord from "discord.js";

export default class QueueCommand {
    constructor(guild: any, msg: discord.Message) {
        let client: any;
        msg.guild.members.forEach(bot => {
            if(bot.user.bot && bot.user.username == "Mufasa"){
                client = bot;
            }
        });
        const bot = new Bot();
        const queueLength = guild.queueNames.length;
        let queueMessage = new discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor(16295993)
            .setTitle("Music Queue")
            .setDescription("")
            .setTimestamp()
            .setFooter("Mufasa BOT", client.user.avatarURL);
        let songInfoBody = queueLength > 0 ? "" : "`No songs are queued.`"; 
        let songInfoHeader = queueLength > 0 ? "" : ":warning:"

        for (let i = 0; i < queueLength; i++) {
            songInfoHeader = "• Song #"+ (i+1) + (i === 0 ? " \`🔊 (Now Playing)\`\n": "\n");
            songInfoBody = guild.queueNames[i];          
            queueMessage.addField(songInfoHeader, songInfoBody, false);
        }

        queueLength > 0 ? "" : queueMessage.addField(songInfoHeader, songInfoBody, false);
        bot.replyWith(msg, queueMessage, 15000);
    }
}
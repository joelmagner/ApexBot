import Bot from '../bot.component';
import Metadata from '../helpers/metadata.helper';
import * as discord from 'discord.js';
export default class HelpCommand {
    constructor(msg: discord.Message, guild: any) {
        const meta = new Metadata();
        const p = meta.getPrefix(guild);
        const bot = new Bot();
        let client: any;
        msg.guild.members.forEach((bot:any) => {
            if(bot.user.bot && bot.user.username == "Mufasa"){
                client = bot;
            }
        });

        let helpMessage = new discord.RichEmbed()
        .setAuthor("Mufasa", client.user.avatarURL)
        .setColor(16295993)
        .setDescription(`[Mufasa **v${meta.getAppVersion()}**](https://www.github.com/joelmagner/mufasabot) created by ${meta.getAuthor()}`)
        .setTimestamp()
        .setFooter("Mufasa BOT", client.user.avatarURL)
        .addField(`**Commands**`,
        `:notes: ${p}play • play song **alias: ${p}p**`
        +`\n:negative_squared_cross_mark: ${p}skip • skip song`
        +`\n:books: ${p}quote • writes quote`
        +`\n🏃‍ ${p}leave • BOT leaves voicechannel`
        +`\n:put_litter_in_its_place: ${p}clear • \`*\`clears messages **usage: ${p}clear <amount>**`
        +`\n:put_litter_in_its_place: ${p}clearbot • \`*\`clears bot-messages **usage: ${p}clearbot <amount>**`
        +`\n:bust_in_silhouette: ${p}setprefix • \`**\` **usage: ${p}setprefix <prefix>**`
        +`\n:bust_in_silhouette: ${p}setbotchannel • \`**\` **usage: ${p}setbotchannel <name>**`
        +`\n:bust_in_silhouette: ${p}setbotrole • \`**\` **usage: ${p}setbotrole <name>**`
        +`\n:bust_in_silhouette: ${p}setadminrole • \`**\` **usage: ${p}setadminrole <name>**`, false)
        .addField(`**General Information**`,`:lion_face:`, false)
        .addField(`Organising`,`Create a text-channel called \`${meta.getBotChannel(guild)}\`. All messages will be stored there.`, false)
        .addField(`Permissions`,`Commands with \`*\` require \`botrole\`.\nCommands with \`**\` require \`adminrole\`.`, false)
        .addBlankField(false)
        .addField(`**Current Server Settings**`,`See your active settings: \`${p}settings\``, false)

        bot.message(msg, helpMessage, 60000);
    }
}
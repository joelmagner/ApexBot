import Metadata from '../helpers/metadata.helper';
import Bot from '../bot.component';
import * as discord from "discord.js";
export default class SettingsCommand {
    constructor(msg: any, guild: any) {
        const meta = new Metadata();
        const p = meta.getPrefix(guild);
        const bot = new Bot();
        const embedMsg = new discord.RichEmbed()
            .setTitle("**Channel Settings**")
            .setColor(16295993)
            .addField("Botchannel", meta.getBotChannel(guild), false)
            .addField("Botrole", meta.getBotRole(guild), false)
            .addField("Adminrole", meta.getAdminRole(guild), false)
            .addField("Prefix", p, false)
            .addBlankField(false)
            .addField("**Customize**", `You can customize all of the above.\nFor more info try \`${p}help\` or \`${p}info.\``, false);
        bot.message(msg, embedMsg, 60000);
    }
}
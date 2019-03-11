import Bot from '../bot.component';
import Metadata from '../helpers/metadata.helper';
export default class HelpCommand {
    constructor(msg: any, guild: any) {
        const divider: string = "\n===================================";
        const meta = new Metadata();
        const p = meta.getPrefix(guild);
        const bot = new Bot();
        const message = "```markdown"+
        `\n🤖Mufasa Bot [v${meta.getAppVersion()}] by ${meta.getAuthor()} 🤖`+
        divider+
        `\nCommands \t\t|\t\tPrefix: ${p}`+
        divider+
        `\n[📻 ${p}play](${p}play never gonna give you up / ${p}play youtube-link)`+
        `\n[❌ ${p}skip](skip song)`+
        `\n[📖 ${p}quote](lär dig skånska)`+
        `\n[📇️ ${p}queue](${p}queue)`+
        `\n[🏃‍ ${p}leave](BOT leaves voicechannel)`+
        `\n[🗑️ ${p}clear](${p}clear <amount>)`+
        `\n[🗑️ ${p}clearbot](${p}clearbot <amount> botmessages)`+
        `\n[👤️ ${p}setprefix](${p}setprefix <prefix>)`+
        `\n[👤 ${p}setbotrole](${p}setbotrole <name> of permission-role)`+
        `\n[👤 ${p}setbotchannel](${p}setbotchannel <name> of botchannel)`+

        divider+
        "\nChannel Settings"+
        divider+
        "\n[BotChannel]: #"+ meta.getBotChannel(guild)+
        "\n[BotRole]: "+ meta.getBotRole(guild)+
        "\n[Prefix]: "+ p +
        ""+divider+
        `\nGeneral: Create a text-channel called [#${meta.getBotChannel(guild)}]. The bot will add all messages there!`+
        divider+
        "\n[NEWS]:"+
        `\n[${meta.getAppVersion()}]: Detailed information when using play and queue commands.`+
        `\n[v1.0.5]: Permission-system. You can now configure a Bot role and an Admin role.`+
        `\nYou can now only choose role and channel names that already exist.`+
        `\n[v1.0.4]: Customizable prefix, botrole and botspam-channel`+
        `\n[v1.0.3]: (NEW) bot can leave channel, (FIX) bug with skipping`+
        "\n\n[This Message will erase itself in 60 seconds]"+
        "\n```";
        bot.message(msg, message, 60000);
    }
}